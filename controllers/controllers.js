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

router.post("/save", function(req,res){
  console.log("here body >>>> ", req.body);
});

router.get("/save", function(req,res){
  // TODO: Article.findAll({ _id: })
  Article.findALl({}, function(err, data){
    if(err) throw err;

  });
});


module.exports = router;
