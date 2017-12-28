var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
//Set handlebars
var expHbs = require('express-handlebars');
var db = require("./models");

// scraping tools
var request = require("request");
var cheerio = require("cheerio");

// Require all models
// const db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Configure middleware

//  Static For styling
app.use(express.static('./public'));

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

//  Handlebars Initialize
app.engine('handlebars', expHbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// app.set('views', './views');

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
let MONGODB_URI = process.env.MONGODB_URI; //|| "mongodb://localhost/mongoscrapper";

mongoose.Promise = Promise;

if (MONGODB_URI) {
    mongoose.connect(MONGODB_URI, {
        useMongoClient: true
    });
} else {
    mongoose.connect("mongodb://localhost/mongoscrapper", {
        useMongoClient: true
    });
}


require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);


// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});







