const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
//Set handlebars
const expHbs = require('express-handlebars');

// scraping tools
const request = require("request");
const cheerio = require("cheerio");

// Require all models
// const db = require("./models");

const PORT = 3000;

// Initialize Express
const app = express();

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
app.set('views', './views');

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/mongoscrapper", {
    useMongoClient: true
});

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);


// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});







