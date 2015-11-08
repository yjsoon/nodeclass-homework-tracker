//Some live feedback to tell you that the app is running
console.log("App started!");

//load the libraries we need at the start
var express = require("express");
var jade  = require("jade");
var Sequelize = require("sequelize");
var bodyParser = require("body-parser");
var sequelize = new Sequelize("sqlite://"+__dirname+"/db/database.sqlite");

var Task = sequelize.define("tasks",{
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  creator: {
    type: Sequelize.STRING,
    field: "first_name"
  },
  title: {
    type: Sequelize.STRING,
    field: "title"
  },
  complete: {
    type: Sequelize.BOOLEAN,
    field: "complete"
  }
});

Task.sync({force:true}).then(function(){
  return Task.create({
    creator: "Mr Soon",
    title: "This is a sample item",
    complete: false
  });
}).then(function(){
  return Task.create({
    creator: "Mr Soon",
    title: "I have so many to-dos, sob",
    complete: false
  });
}).then(function() {
  return Task.create({
    creator: "Mr Soon",
    title: "So many homeworks",
    complete: false
  });
}).then(function() {
  return Task.create({
    creator: "Mr Soon",
    title: "So many so many *cries*",
    complete: false
  });
})


// Express handles routing and sending webpages to the client
var app = express();

// Set up static directory to access directly
app.use(express.static('static'));

// Creates a route for the root path, our main page
app.route("/").get(function(req,res,next){

  // Gets the jade file and compiles it
  var mainPage = jade.compileFile(__dirname+"/jade/index.jade");

  // List out everything in our database
  Task.all().then(function(data) {
      console.log(data);
  })

  // Add some data to mainPage, and send it to the Jade renderer
  res.end(mainPage( {
    todoList: [
      {id: 1, title: "This is a sample item"},
      {id: 2, title: "I have so many to-dos, sob"},
      {id: 3, title: "So many homeworks"},
      {id: 4, title: "So many so many"}
    ]
  }));

});

// Tells node to listen on port 8000 for incoming connections
app.listen(8000, function(){
  console.log("Listening on port 8000");
});
