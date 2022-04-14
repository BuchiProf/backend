const express = require('express');
const mongoose = require('mongoose');
//import du module des routes du fichier stuff.js
const stuffRoutes = require('./routes/stuff');

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

//dès qu'on a une requete sur api/stuff on va voir les routes stuffRoutes
app.use('/api/stuff', stuffRoutes);



module.exports = app;