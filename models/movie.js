var mongoose = require("mongoose");

var movieSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   year: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   createTime: { type : Date, default: Date.now },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Movie", movieSchema);