
var express = require("express");
var app = express(); 

var flash = require("connect-flash");
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override")
var passportLocalMongoose = require("passport-local-mongoose");
var nodemailer = require('nodemailer');
// var expressSession = require("express-session");
app.set("view engine", "ejs"); // dzięki view engine, nie muszę za każdym razem wymieniać rozszerzenia .ejs

// dodawanie modeli 

var User = require("./models/users");
var Rez = require("./models/rez");

// console.log(Rez)

app.use(flash());




// jakies bzdety potrzebne w node 
app.use(bodyParser.urlencoded({extended: true}));           //  zeby dane przesylane w formularzu( req.body) nie byly puste 

app.use(express.static(__dirname + "/public"));            // Dodaje css do node'a 

// Łączę się i tworzę jeżeli nie ma , z bazą danych o nazwie 'projekt'
mongoose.connect("mongodb://localhost/projekt");

// For put requests
app.use(methodOverride("_method"))

// MONGOOSE 
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));






// ************** AUTENTYKACJA *****************************
//Session data is not saved in the cookie itself, just the session ID. Session data is stored server-side.
app.use(require("express-session")({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));

// potrzebne 2 linie kodu , aby metody i w ogóle passport działał
app.use(passport.initialize());
app.use(passport.session());

//
passport.use(new LocalStrategy(User.authenticate())); //tworzę nową LocalStrategy, używając metody User.authenticate(), która pochodzi z Users.js[passportlocalmongoose]
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());






// ************* ŚCIEŻKI DO PODSTRON ************************
// zmienna lokalna

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

// zmienna lokalna
app.use(function(req, res, next){
    User.find({}, function(err,user){
    res.locals.useruser = user;        
})
next();
});

// tworzę route(ścieżkę) do podstrony "home.ejs"

app.get("/",function(req,res){
    res.render("home");
})


// app.get("/users/:id", function(req, res) {
//     User.findById(req.params.id, function(err, foundUser){
//         if(err){
//             req.flash("error", "somethink went wrong");
//             res.redirect("/main")
//         }
//         res.rednder("users/show", {user: foundUser})
//     })
// })
app.get("/main", function(req,res){
    res.render("main");
})

app.get("/profileUn", function(req, res) {
   User.findOne({"username": req.query.search}, function(err,user){
                        console.log(user)
                       res.render("profileUn", {user:user})
                    })
})

app.get("/prof", function(req, res) {
    // console.log(req.body)
    // console.log(req.params)
    console.log(req.query)
    let data = req.query.date + ' ' + req.query.day + ' ' + req.query.month

     Rez.find({'date': data}).populate("pacjent.id").exec(function(err,date){
        console.log(date)
        res.render("prof", {date:date, data:data})
        
    })
})


app.post("/prof", function(req, res) {
    Rez.find({'date': req.body.Datea}, function(err,date){
        res.render("prof", {date:date, data:data})
    })
})

app.get("/profile",isLoggedIn, function(req, res) {
    
    console.log(req.user.isAdmin)
     if(req.user.isAdmin){
         console.log(req.query.search)
        Rez.findOne({"pacjent.username": req.query.search}).populate("pacjent.id").exec(function(err,userrez){
            if(err){
                console.log(err)
            }
            else {
                res.render("profile", {userrez:userrez})
            }
        })
     }
     else {
    
    Rez.find({"pacjent.username": req.user.username},function(err, rez) {
        res.render("profile", {rez:rez})
    })
}
     
     
   


})

app.get("/proz",isLoggedIn, function(req,res){
    Rez.find({"pacjent.username": req.user.username},function(err, rez) {
         res.render("proz", {rez:rez});
    }) 
   
})

app.post("/proz", function(req, res) {
     Rez.remove({"pacjent.username": req.user.username, "start":req.body.zapisStart, "end":req.body.zapisEnd},function(err, rez) {
     console.log(rez)  
   })
})
  

app.get("/profileREZ", function(req, res) {
    Rez.find({"pacjent.username": req.query.search}, function(err, rez) {
        console.log(rez)
         res.render("profile",{rez: rez});
    })
  
})


app.put("/profile", function(req, res) {
    console.log(req.body)
    User.findByIdAndUpdate(req.body.id, req.body,  function(err, updatedUser){
        if(err){
            console.log(err)
        } else {
            console.log("updated")
            console.log(updatedUser)
        }
    })
         if(req.user.isAdmin){
        Rez.findOne({"pacjent.username": req.query.search}).populate("pacjent.id").exec(function(err,userrez){
            if(err){ console.log(err)}else {console.log(userrez)
                res.render("profile", {userrez:userrez})
            }
        })
         
     }else {
    res.render("profile")
}
//     if(req.user.isAdmin){
//      User.find({"username": req.query.search}, function(err, users){
//       if(err){
//           console.log(err);
//       } else {
//           console.log(users)
//         // req.flash("error", "Musisz sie zalogowac");
//         // , message: req.flash("error")
//         res.render("profile",{users: users});
//         console.log("saved")
//       }
//     });
// } else {
//     res.render("profile")
// }
})




app.get("/reserve", isLoggedIn, function(req,res){
    Rez.find({}).populate("pacjent.id").exec(function(err, rez){
       if(err){
           console.log(err);
       } else {
        //   res.render("campgrounds/index",{campgrounds:allCampgrounds});
        //   console.log(req.isAuthenticated());
         console.log(rez)
        res.render("reserve",{rez: rez});
        
       }
    });
    
})

app.post("/reserve", function(req,res) {

var object1 = req.body
    // console.log(object1)
//  console.log(Object.values(object1));
 var obj = Object.keys(object1).map((k) => object1[k]);
//  console.log(obj[0])
//  console.log(Rez)
 // obj[0] = start
 // obj[1] = end
 // obj[2] = active date
 
 // find all athletes who play tennis, selecting the 'name' and 'age' fields
Rez.find({ 'start': obj[0], 'end': obj[1], "date": obj[2]  }, 'start end date', function (err, rez) {
  if (err) {
      console.log(err)
  } else {
//   console.log(rez[0])
      if(rez[0]){
        //   console.log(rez[0].start)
      } else {
          
          console.log("nie ma tego node'a, więc dodaje do bazy")
      // DODAWANIE DO BAZY DANYCH // 
        Rez.create({ 
            start: obj[0],
            end: obj[1],
            date: obj[2] 
        }, function (err, ob) {
                if (err){ 
            console.log(err)
                    
                }else {
                    if(req.user.isAdmin){ console.log("jestes adminem. Po prostu usuwasz terminy")} 
                    else{
                    console.log("przypisuje")
                    // console.log("toto ob:", ob)
                    // console.log(req.user)
                    // console.log(User)
                    // PRZYPISUJE REZERWACJĘ DO PACJENTA
                    ob.pacjent.id = req.user._id;
                    ob.pacjent.username = req.user.username 
                    ob.save()
                    
                }}
});
          
            }     
        }

})
});

app.get("/pro",isLoggedIn, function(req, res) {
    Rez.find({"pacjent.id": req.query.id}).populate("pacjent.id").exec(function(err,rez){
        if(err){
            console.log(err)
        } else {
        console.log(rez)
        res.render("pro", {rez: rez})
                            
        }
        })
    
})



app.post("/pro", function(req,res){
    console.log(req.body.email)
    
   Rez.remove({"pacjent.username": req.body.Username, "start":req.body.zapisStart, "end":req.body.zapisEnd},function(err, rez) {
      
   })
  // WYSYŁANIE MAILI PO USUNIĘCIU REZERWACJI Z POZIOMU ADMINISTRATORA/LEKARZA 
//   var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'stozzek@gmail.com',
//     pass: ''
//   }
// });

// var mailOptions = {
//   from: 'stozzek@gmail.com',
//   to: 'req.body.email',
//   subject: 'Usunięta rezerwacja',
//   text: 'Twoja rezerwacja została usunięta, proszę zarezerwować inny termin'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });
})



app.post("/reserveDelete", function(req, res) {
    console.log(req.body)
    var object1 = req.body
    // console.log(object1)
//  console.log(Object.values(object1));
 var obj = Object.keys(object1).map((k) => object1[k]);

Rez.remove({'start': obj[0],'date': obj[2]}, function(err) {
    if (!err) {
            console.log("Wszystko poszlo zgodnie z planem")
    }
    else {
           console.log(err)
    }
});
   
    
});

app.get("/singleDate", function(req,res){
    res.render("singleDate");
})

app.get("/adminonly", isLoggedIn, function(req,res){
    if(req.user.isAdmin){
    res.render("adminonly");
    // eval(require("locus")); // do sprawdzenia kodu }|| zatrzymuje kod w miejscu użycia i otwiera konsole.
    } else {
    res.redirect("/main");
    console.log("you dont have permission to go there");
    }
    });

// ------- ścieżki autoryzacyjne------
app.get("/login", function(req,res){{
    res.render("login", {message: req.flash("error")});
}});

app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/main",
        failureRedirect: "/login"
    }), function(req, res){
});

app.get("/register", function(req,res){    // pokaz forme rejestracjyjna
    res.render("register");
})

app.post("/register", function(req,res){
    //przez passportlocalmongoose podajemy hasło jako 2 aargument <ponizej>, a funkcje passport worza salt i hash i przechowuja to w bazie 
    User.register(new User({username: req.body.username, imie: req.body.imie, nazwisko: req.body.nazwisko, email: req.body.email, telefon: req.body.telefon}), req.body.password, function(err, user){ 
        if(err){
            console.log(err);
            return res.render("register")
        } else {
            passport.authenticate("local")(req,res, function(){   // tworzy sesje, od razu loguje użytkownika
                 res.redirect("/main")
            })
        }
    })
})

app.get("/logout", function(req,res){
    req.logout();   // passport zapewnia nam tą funkcję. Logout = passport niszczy dane użytkownika w sesji, Nie śledzi już poczynań użytkownika od requestu do requestu
    res.redirect("/")
})

// ----------------- pojedyncza data ---------


//middlewares, funkcje wykonywane pomiędzy "middle" routeami

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Musisz sie zalogowac");
    res.redirect("/login");
}



// Włączam serwer {tutaj: lokalny(aws)}
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server just started it's duty.......");
})