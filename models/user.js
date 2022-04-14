const mongoose = require('mongoose');
const uniqueValisator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {type:String, required: true, unique:true},
    password: {type:String, required:true}
});

userSchema.plugin(uniqueValisator);

module.exports = mongoose.model('User', userSchema);