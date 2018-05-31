var express = require("express");
var router  = express.Router();
var Movie = require("../models/movie");
var middleware = require("../middleware");
var request = require("request");

//INDEX - show all movies
router.get("/", function(req, res){
    // Get all movies from DB
    Movie.find({}, function(err, allMovies){
       if(err){
           console.log(err);
       } else {
           request('https://maps.googleapis.com/maps/api/geocode/json?address=sardine%20lake%20ca&key=AIzaSyBtHyZ049G_pjzIXDKsJJB5zMohfN67llM', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body); // Show the HTML for the Modulus homepage.
                res.render("movies/index",{movies:allMovies});

            }
});
       }
    });
});

//CREATE - add new movie to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to movie array
    var name = req.body.name;
    var year = req.body.year;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newMovie = {name: name, year: year, image: image, description: desc, author:author}
    
    Movie.create(newMovie, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to movie page
            console.log(newlyCreated);
            res.redirect("/movies");
        }
    });
});

//NEW - show form to create new movie
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("movies/new"); 
});

// SHOW - shows more info about one movie
router.get("/:id", function(req, res){
    //find the movie with provided ID
    Movie.findById(req.params.id).populate("comments").exec(function(err, foundMovie){
        if(err){
            console.log(err);
        } else {
            console.log(foundMovie)
            //render show template with that movie
            res.render("movies/show", {movie: foundMovie});
        }
    });
});

router.get("/:id/edit", middleware.checkUserMovie, function(req, res){
    console.log("IN EDIT!");
    //find the movie with provided ID
    Movie.findById(req.params.id, function(err, foundMovie){
        if(err){
            console.log(err);
        } else {
            //render show template with that movie
            res.render("movies/edit", {movie: foundMovie});
        }
    });
});

router.put("/:id", function(req, res){
    var newData = {name: req.body.name, year: req.body.year, image: req.body.image, description: req.body.description};
    Movie.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, movie){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/movies/" + movie._id);
        }
    });
});


module.exports = router;