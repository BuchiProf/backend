const mongoose = require('mongoose');

//on définit le schéma de la bdd sans  _id qui est généré automatiquemnt
const thingShema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true },
});

//export du schéma pour l'utiliser dans app
module.exports = mongoose.model('Thing', thingShema);