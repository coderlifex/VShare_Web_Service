var Comment = require("../models/comment");
var Movie = require("../models/movie");
module.exports = {
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error", "Please sign in first!");
        res.redirect("/login");
    },
    checkUserMovie: function(req, res, next){
        if(req.isAuthenticated()){
            Movie.findById(req.params.id, function(err, movie){
               if(movie.author.id.equals(req.user._id)){
                   next();
               } else {
                   res.redirect("/movies/" + req.params.id);
               }
            });
        } else {
            req.flash("error", "Please sign in first!");
            res.redirect("/login");
        }
    },
    checkUserComment: function(req, res, next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.commentId, function(err, comment){
               if(comment.author.id.equals(req.user._id)){
                   next();
               } else {
                   res.redirect("/movies/" + req.params.id);
               }
            });
        } else {
            req.flash("error", "Please sign in first!");
            res.redirect("login");
        }
    }
}