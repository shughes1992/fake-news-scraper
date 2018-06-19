var express = require("express");

var app = express();

var newsURL = "https://www.snopes.com/fact-check/category/fake-news/";

var bodyParser = require("body-parser");

var mongoose = require("mongoose");

var cheerio = require("cheerio");

var Article = require("./models/article")

var request = require("request");

var db = require("./models");

var exphbs = require("express-handlebars")

app.engine("handlebars", exphbs({defaultLayout: "main"}))
//main refers to the folder we made in Layouts

app.set("view engine", "handlebars")

app.get("/", function(req, res){
    res.render("index")
})

app.get("/scrape", function(req, res){
    request(newsURL, function(error, response, html){
        // res.send(html) shows the entire page
        var $ = cheerio.load(html);
        var array = [];
        $(".article-link").each(function(){
            var title = $(this).children("div").children("h2").attr("class", "title").text();
            var summary = $(this).children("div").children("p").attr("class", "desc").text();
            var link = $(this).attr("href");

            console.log(title);
            console.log(summary);
            console.log(link)
            console.log("");            
            console.log("");

            if (title && summary && link) {
                var article = new Article({
                    title:title,
                    summary:summary,
                    link:link
                })

                article.save()
            }

        })
    })
    res.send("scrape worked!!!")
})

app.get("/all", function(req, res){
    Article.find()
    .exec()
    .then(function(doc){
        res.send(doc)
    })
})


app.listen(3000);

