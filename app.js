const express = require('express');
const mongoose = require('mongoose');
//import du model de la bdd
const Thing = require('./models/thing');
const app = express();

//connexion à la bdd atlas mongoDB
mongoose.connect('mongodb+srv://buchiprof:Canelle1@cluster0.dk6x3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//un middelware pour intercepter un objet json posté
//Content-Type : application/json  et met à disposition leur body
app.use(express.json());


//un middleware qui permet d'accéder à l'api (contre l'erreur CORS)
//on définit des entete autorisant l'accès quelque soit la route
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//un middelware pour traiter les post (use est en get par défaut)
//il doit être placé avant les use ci-dessous pour être traité en premier
app.post('/api/stuff', (req, res, next) => {
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
});

//route pour afficher l'objet en vente seul
//route dynamique : on récupère le paramètre id pour l'intégrer à la route
app.get('/api/stuff/:id', (req, res, next) =>{
  Thing.findOne({ _id:req.params.id})
  .then(thing => res.status(200).json(thing))
  .catch(error => res.status(404).json({error}));
});

//une route pour modifier un objet dont l'id est dans la requête
app.put('/api/stuff/:id', (req, res, next) =>{
  //maj du thing avec 1er param : son id, 2eme param :spread de l'objet modifié qu'il faudra utiliser
  Thing.updateOne({ _id:req.params.id}, {...req.body,_id:req.params.id})
  .then(() => res.status(200).json({message:'objet modifié !'}))
  .catch(error => res.status(400).json({error}));
});


//une route pour supprimer un objet dont l'id est dans la requête
app.delete('/api/stuff/:id', (req, res, next) =>{
  //maj du thing avec 1er param : son id, 2eme param :spread de l'objet modifié qu'il faudra utiliser
  Thing.deleteOne({ _id:req.params.id})
  .then(() => res.status(200).json({message:'objet supprimé !'}))
  .catch(error => res.status(400).json({error}));
});


//definition du middleware appelé pour la route vers stuff
//renvoie en json tout ce qui est dans la base mongoose (lecture bdd) et un status 200
app.get('/api/stuff', (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});

module.exports = app;