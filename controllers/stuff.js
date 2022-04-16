//définitions de tous les middleware appelés dans les routes vers stuff
/*Un fichier de contrôleur exporte des méthodes 
qui sont ensuite attribuées aux routes pour améliorer 
la maintenabilité de votre application.*/
const Thing = require('../models/thing');

//un middelware pour traiter les post (use est en get par défaut)
exports.createThing = (req, res, next) => {
    //on effece l'_id car sera généré par atlas
    delete req.body._id;
    //on construit l'objet avec un spread...de la requête
    //on remplace title : req.body.title, etc par ...
    //new créé automatiquement un mot clé "_id" immuable
    const thing = new Thing({
        ...req.body
    });
    //on enregistre dans la BDD avec une promesse : then/catch
    thing.save()
        //il faut une réponse pour que then fonctionne alors envoie code et message
        .then(() => res.status(201).json({ message: 'Obket enregistré !' }))
        //en cas d'erreur on l'envoie : {error}est un raccourci js de {error:error}
        .catch(error => res.status(400).json({ error }));
};

//route pour afficher l'objet en vente seul
//route dynamique : on récupère le paramètre id pour l'intégrer à la route
exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
};


//un middleware pour modifier un objet dont l'id est dans la requête
exports.modifyThing = (req, res, next) => {
    //maj du thing avec 1er param : son id, 2eme param :spread de l'objet modifié qu'il faudra utiliser
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

//une route pour supprimer un objet dont l'id est dans la requête

exports.deleteThing = (req, res, next) => {
    //on extrait de l'objet à effacer le user id (pour vérifier qui vaut effacer)
    Thing.findOne({ _id: req.params.id })
        .then(
            thing => {
                //on vérifie s'il y a quelque chose à effacer
                if (!thing) {
                    res.status(404).json({
                        error: new Error('Cet objet n\'existe pas !')
                    });
                }
                //si id de l'objet different de celui autentifié
                if (thing.userId !== req.auth.userId) {
                    res.status(400).json({
                        error: new Error('Requête non autorisée !')
                    });
                }
                //maj du thing avec 1er param : son id, 2eme param :spread de l'objet modifié qu'il faudra utiliser
                Thing.deleteOne({ _id: req.params.id })
                    .then(() => {
                        res.status(200).json({ message: 'objet supprimé !' });
                    })
                    .catch(error => {
                        res.status(400).json({ error });
                    });
            }
        )
};


//definition du middleware appelé pour la route vers stuff
//renvoie en json tout ce qui est dans la base mongoose (lecture bdd) et un status 200
exports.getAllThings = (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
};