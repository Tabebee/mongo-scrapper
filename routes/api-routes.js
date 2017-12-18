// scraping tools
const axios = require("axios");
const cheerio = require("cheerio");
//  Models
let Articlesdb = require("../models/Articles");
let Notesdb = require("../models/Notes");
//  Why cant I do db = require("../models")


module.exports = function (app) {
    app.get("/scrape", function (req, res) {
        axios.get("https://www.nytimes.com/").then(function (response) {
            // console.log(response);
                let $ = cheerio.load(response);

                $("article.story").each( function (i, element) {
                    //  Store each article in its own block
                    let result = {};
                    result.title = $(this)
                        .children("h2.story-heading")
                        .children("a")
                        .text();
                    result.link = $(this)
                        .children("h2.story-heading")
                        .children("a")
                        .attr("href");
                    result.sum = $(this)
                        .children("p.summary")
                        .text();
                    //  Check if article is in the db and pass in if its not
                    Articlesdb.findOne({title: result.title}).then(function (isIn) {
                        if (isIn) {
                            return;
                        } else {
                            Articlesdb.create(result)
                                .then( function (dbArticle) {
                                    res.send("Scrape complete");
                                }).catch( function (err) {
                                    res.json("An Error occurred: \n"+ err);
                            });
                        }
                    });
                    return i < 1 // Take this out before deploy
                }); // close each
            }); // close request
    }); //  close scrape route

    app.get("/articles", function (req, res) {
        Articlesdb.find({})
            .then( function (dbArticle) {
                res.json(dbArticle);
            }).catch( function (err) {
                res.json(err);
        });
    }); //  close Get Find All Route






};



