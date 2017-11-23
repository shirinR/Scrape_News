var express = require('express');
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var port = process.env.PORT || 3000;

var app = express();
app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/week18Populater", {
  useMongoClient: true
});

app.get("/", function(req,res){
  axios.get("https://www.nytimes.com/section/us").then(function(response){
    var $ = cheerio.load(response.data);

    $('h2.headline').each(function(i, element){
      var result = {};

      result.title = $(this).children("a").text().attr('href');

      db.Article.create(result).then(function(dbData){
        res.send("Added 20 new articles!");
        // TODO for frontend add a modal showing 20 article here
      }).catch(function(err){
        res.json(err);
      });
    });
  });
});

app.get("/saved", function(req,res){
  // TODO: db.Article.findOne({ _id: })
});

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
