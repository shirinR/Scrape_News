var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();

// Configure middleware
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// MongoDB
mongoose.Promise = Promise;
var MONGODB_URI = process.env.MONGOLAB_ONYX_URI  || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

var routes = require("./controllers/controllers.js");
app.use("/", routes);

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
