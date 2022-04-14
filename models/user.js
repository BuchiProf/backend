const mongoose = require('mongoose');
//mongoose-unique-validator  améliore les messages d'erreur lors de l'enregistrement de données uniques.
const uniqueValisator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {type:String, required: true, unique:true},
    password: {type:String, required:true}
});

userSchema.plugin(uniqueValisator);

module.exports = mongoose.model('User', userSchema);