//Some live feedback to tell you that the app is running
console.log("App started!");

//load the libraries we need at the start
var express = require("express");
var jade  = require("jade");
var Sequelize = require("sequelize");
var bodyParser = require("body-parser");
var sequelize = new Sequelize("sqlite://"+__dirname+"/db/database.sqlite");

// Express handles routing and sending webpages to the client
var app = express();

// Set up static directory to access directly
app.use(express.static('static'));

// Creates a route for the root path, our main page
app.route("/").get(function(req,res,next){

  // Gets the jade file and compiles it
  var mainPage = jade.compileFile(__dirname+"/jade/index.jade");
  // Add some data to mainPage, and send it to the Jade renderer
  res.end(mainPage( {
    todoList: [
      {id: 1, title: "This is a sample item"},
      {id: 2, title: "I have so many to-dos, sob"}
    ]
  }));

});

// Tells node to listen on port 8000 for incoming connections
app.listen(8000, function(){
  console.log("Listening on port 8000");
});
