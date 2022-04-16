//les fonctions (middleware) qui permettrons de router

const User = require('../models/user');
// algorithem de chiffrement (hashage)
const bcrypt = require('bcrypt');
// générateur de token chiffré
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    //chiffrement avec 10 tours d'algo
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) //async promise
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password) //renvoie un boolean
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' }); //401 unauthorized
                    }
                    res.status(200).json({
                        userId: user._id,   //on stocke _id de la bdd
                        token: jwt.sign(    //on créé le jeton avec _id
                            { userId: user._id },  //on inclus l'_id pour rendre un thing unique
                            'RANDOM_TOKEN_SECRET',  //on met un mot de passe compliqué
                            { expiresIn: '24h' }   //on ajoute un délai d'expiration
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};