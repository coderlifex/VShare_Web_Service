var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    cookieParser = require("cookie-parser"),
    LocalStrategy = require("passport-local"),
    flash        = require("connect-flash"),
    Movie  = require("./models/movie"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    session = require("express-session"),
//    seedDB      = require("./seeds"),
    methodOverride = require("method-override");
    
mongoose.connect("mongodb://localhost/movie_v1");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));

// seedDB(); //seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "This is VShare web service!",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   next();
});

//routes configration
var commentRoutes    = require("./routes/comments"),
    moviesRoutes = require("./routes/movies"),
    indexRoutes      = require("./routes/index")
    
app.use("/", indexRoutes);
app.use("/movies", moviesRoutes);
app.use("/movies/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The VShare Server Has Started!");
});