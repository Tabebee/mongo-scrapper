// scraping tools
const axios = require("axios");
const cheerio = require("cheerio");
//  Models
let db = require("../models");
//  Why cant I do db = require("../models")


module.exports = function (app) {
    //  scrape articles route
    app.get("/scrape", function (req, res) {
        axios.get("https://www.nytimes.com/").then(function (response) {
            // console.log(response);
                let $ = cheerio.load(response.data);
                console.log("this");
            $(".story").each( function (i, element) {
                    console.log("this after each");

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
                    // console.log(result);
                    //  $ck if article is in the db and pass in if its not
                    db.Articles.findOne({title: result.title}).then(function (isIn) {
                        if (isIn) {
                            return;
                        } else {
                            db.Articles.create(result)
                                .then( function (dbArticle) {
                                    res.send("Scrape complete");
                                }).catch( function (err) {
                                    res.json("An Error occurred: \n"+ err);
                            });
                        }
                    });
                }); // close each
            res.redirect("/");
            }); // close axios
    }); //  close scrape route
    //  find all articles route
    app.get("/articles", function (req, res) {
        db.Articles.find({})
            .then( function (dbArticle) {
                res.json(dbArticle);
            }).catch( function (err) {
                res.json(err);
        });
    }); //  close Get Find All Route

    //  save article route
    app.post("/articles/:id", function (req, res) {
        db.Articles.findOneAndUpdate({ "_id": req.params.id}, {"savedboolean": true})
            .then( function (dbb) {
                res.send(dbb);
            }).catch( function (err) {
                res.json(err);
        })

    });
    //  delete article route
    app.post("/articles/delete/:id", function (req, res) {
        db.Articles.findOneAndUpdate({ "_id": req.params.id}, { "savedboolean": false, "note": [] })
            .then( function (dbb) {
                res.send(dbb);
            }).catch( function (err) {
            res.json(err);
        });
    });
    //  Add a note route
    app.post("/newnote/:id", function (req, res) {
        console.log(req.body);
        db.Note.insert({ "_id": req.body })
    });


};



