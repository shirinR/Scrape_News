var express = require("express");
var router = express.Router();
var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

router.get('/', function(req, res){
  res.render('index');
});

router.get("/scrape", function(req, res){
  axios.get("https://www.nytimes.com/section/us").then(function(response){
    var $ = cheerio.load(response.data);

    let results = [];

    $('article h2').each(function(i, element){
      var title = $(element).text();

      results.push({
        title: title
      });
    });
    res.send(results);
  }).catch(function (error) {
    console.log(error);
  });
});

router.get("/saved", function(req,res){
  // TODO: db.Article.findOne({ _id: })
});


module.exports = router;
