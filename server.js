var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 3000;

var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

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

    $('li article h2').each(function(i, element){
      var result = {};

      result.title = $(this).text();
      // result.summary = $(this).children('p.summary').text();

      // console.log('Thisdata>>>', result.title);

      db.Article.create(result).then(function(dbData){
        alert("Added 20 new articles!");
        res.send(result.title);
        // TODO for frontend add a modal showing 20 article here
      }).catch(function(err){
        res.json(err);
      });
    });
  }).catch(function (error) {
    console.log(error);
  });
});

app.get("/saved", function(req,res){
  // TODO: db.Article.findOne({ _id: })
});

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
