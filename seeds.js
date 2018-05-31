var mongoose = require("mongoose");
var Movie = require("./models/movie");
var Comment   = require("./models/comment");
var User = require("./models/user");
var passport = require("passport");

var data = [
    {
        name: "Titanic", 
        year: "1997",
        image: "https://image.tmdb.org/t/p/w1280/kHXEpyfl6zqn8a6YuozZUujufXf.jpg",
        description: "84 years later, a 101-year-old woman named Rose DeWitt Bukater tells the story to her granddaughter Lizzy Calvert, Brock Lovett, Lewis Bodine, Bobby Buell and Anatoly Mikailavich on the Keldysh about her life set in April 10th 1912, on a ship called Titanic when young Rose boards the departing ship with the upper-class passengers and her mother, Ruth DeWitt Bukater, and her fiancé, Caledon Hockley. Meanwhile, a drifter and artist named Jack Dawson and his best friend Fabrizio De Rossi win third-class tickets to the ship in a game. And she explains the whole story from departure until the death of Titanic on its first and last voyage April 15th, 1912 at 2:20 in the morning."
    },
    {
        name: "Westword", 
        year: "2017",
        image: "https://image.tmdb.org/t/p/w1280/6aj09UTMQNyfSfk0ZX8rYOEsXL2.jpg",
        description: "A dark odyssey about the dawn of artificial consciousness and the evolution of sin. Set at the intersection of the near future and the reimagined past, it explores a world in which every human appetite, no matter how noble or depraved, can be indulged."
    },
    {
        name: "Avengers: Infinity War", 
        year: "2018",
        image: "https://image.tmdb.org/t/p/w1280/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
        description: "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain."
    },
    {
        name: "The Boss Baby", 
        year: "2017",
        image: "https://image.tmdb.org/t/p/w1280/unPB1iyEeTBcKiLg8W083rlViFH.jpg",
        description: "A story about how a new baby's arrival impacts a family, told from the point of view of a delightfully unreliable narrator, a wildly imaginative 7 year old named Tim."
    },
    {
        name: "Game of Thrones", 
        year: "2011",
        image: "https://image.tmdb.org/t/p/w1280/gwPSoYUHAKmdyVywgLpKKA4BjRr.jpg",
        description: "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond."
    },
    {
        name: "Solo: A Star Wars Story", 
        year: "2018",
        image: "https://image.tmdb.org/t/p/original/pH0rtDSgBM98Ho8HgiEq8topsxL.jpg",
        description: "Through a series of daring escapades deep within a dark and dangerous criminal underworld, Han Solo meets his mighty future copilot Chewbacca and encounters the notorious gambler Lando Calrissian."
    },
    {
        name: "Beauty and the Beast", 
        year: "2017",
        image: "https://image.tmdb.org/t/p/original/n28rdNRdhr5sTcskuzPRwczfP2t.jpg",
        description: "A live-action adaptation of Disney's version of the classic tale of a cursed prince and a beautiful young woman who helps him break the spell."
    },
    {
        name: "The Godfather", 
        year: "1972",
        image: "https://image.tmdb.org/t/p/w1280/rPdtLWNsZmAtoZl9PK7S2wE3qiS.jpg",
        description: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge."
    },
    {
        name: "Spirited Away", 
        year: "2001",
        image: "https://image.tmdb.org/t/p/original/djgM2d3e42p9GFQObg6lwK2SVw2.jpg",
        description: "A young girl, Chihiro, becomes trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free her family."
    },
    {
        name: "Life Is Beautiful ", 
        year: "1997",
        image: "https://image.tmdb.org/t/p/w1280/f7DImXDebOs148U4uPjI61iDvaK.jpg",
        description: "A touching story of an Italian book seller of Jewish ancestry who lives in his own little fairy tale. His creative and happy life would come to an abrupt halt when his entire family is deported to a concentration camp during World War II. While locked up he tries to convince his son that the whole thing is just a game."
    }
    
    
]

function seedDB(){
    // Remove all users
    User.remove({}, function(err) {
        if(err){
            console.log(err);
        } else {
            console.log("users removed!");
        }
    });
    
    var adminUser = {
    username: "VShare"
    }
    
    //add test user
    User.register(adminUser, "123456", function(err, user){
        if(err){
            console.log(err);
        } else {
            passport.authenticate("local");
            console.log("added a user: " + user._id);
            addMove();
        }
    });
}

function addMove() {
        Movie.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("All movies removed!");
             //add a few movies
             var query  = User.where({ username: 'VShare'});
             query.findOne(function(err, user){
                 if (err) {
                     console.log(err);
                 } else {
                     data.forEach(function(seed){
                    Movie.create(seed, function(err, movie){
                        if(err){
                            console.log(err)
                        } else {
                            movie.author.id = user._id;
                            movie.author.username = user.username;
                            //create a comment
                            Comment.create(
                            {
                                text: "This is a greate movie!",
                                author: {
                                    id: user._id,
                                    username: user.username
                                }
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    movie.comments.push(comment);
                                    movie.save();
                                    console.log("Created new comment");
                                }
                            });
                            console.log("added a movie: " + movie.name);
                    }
                });
            });
                 }
                 
             });
             
            
        }
    });
}
    


module.exports = seedDB;