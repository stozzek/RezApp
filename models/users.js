var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    passport: String,
    isAdmin: {type: Boolean, default: false},
    imie: String,
    nazwisko: String,
    alergie: String,
    email: String,
    telefon: Number
});

// dodaje dużo przydatnych i ważnych metod do UserSchema 
// + zajmuje się hashowaniem hasła, 'salt' 'em , przechowywaniem danych w bazie danych
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);