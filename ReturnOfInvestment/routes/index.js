
var ejs = require("ejs");

/*
 * GET home page.
 */

exports.home = function(req, res){
  res.render('home');
};

exports.index = function(req, res){
res.render('frontpage');
};

exports.maps = function(req,res){
res.render('map');
};
