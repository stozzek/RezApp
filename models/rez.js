var mongoose = require("mongoose");
// var passportLocalMongoose = require("passport-local-mongoose");

var ReservedDates = new mongoose.Schema({
            start: Number,
            end: Number,
            date: String,
            pacjent:{
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"User"
                    },
                username: String
                    }
    })
// rt: String,
//     end: String,
//     date: String,
//     author:{
//       id: {
//          type: mongoose.Schema.Types.ObjectId,
//          ref:"User"
//       },
//       username: String
//   },

// dodaje dużo przydatnych i ważnych metod do UserSchema 
// + zajmuje się hashowaniem hasła, 'salt' 'em , przechowywaniem danych w bazie danych
// ReservedDates.plugin(passportLocalMongoose);
module.exports = mongoose.model("Dates", ReservedDates);