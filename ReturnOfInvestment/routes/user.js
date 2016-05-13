
/*
 * GET users listing.
 */
var mongoURL = "mongodb://localhost:27017/schoolsdb";
var mongo = require("./mongo");

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.getData = function(req,res){
	// These two variables come from the form on
	// the views/login.hbs page
	console.log("Inside User.js");
	var json_responses ={};

	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('schoolData');
		coll.find({"array.cost":{$gt:0}},{"array.name":1, "array.cost":1, "array.Comp":1, "array.earn":1}).toArray(function(err, user){
			if (user) {
				console.log(user.length);
				json_responses.statusCode = 200;
				json_responses.schools=user;
				//json_responses = {"statusCode" : 200};
				console.log("From user.js find function"+json_responses);
				res.send(json_responses);
				
			} else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		});
	});
};


exports.getDataYearly = function(req,res){
	// These two variables come from the form on
	// the views/login.hbs page
	console.log("Inside getDataYearly.js");
	var json_responses ={};

	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('schoolsYearly');
		coll.find({"array.schools.cost":{$gt:0}},{"array.schools.name":1, "array.schools.cost":1, "array.schools.comp":1, "array.schools.earn":1}).toArray(function(err, user){
			if (user) {
				console.log(user.length);
				json_responses.statusCode = 200;
				json_responses.schools=user;
				//json_responses = {"statusCode" : 200};
				console.log("From getDataYearly find function"+json_responses);
				res.send(json_responses);
				
			} else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		});
	});
};

exports.getNormalizedData = function(req,res){
	// These two variables come from the form on
	// the views/login.hbs page
	console.log("Inside getNormalizedData.js");
	var json_responses ={};

	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('schoolsNormalized');
		coll.find({"array.CURROPER":{$gt:0}},{"array.INSTNM":1, "array.PREDDEG":1, "array.CURROPER":1, "array.TUITIONFEE_IN":1, "array.EARN_2011":1, "array.MALE_RPY":1, "array.TUITIONFEE_IN":1, "array.EARN_2011":1, "array.C150_4":1})
.toArray(function(err, user){
			if (user) {
				console.log(user.length);
				json_responses.statusCode = 200;
				json_responses.schools=user;
				//json_responses = {"statusCode" : 200};
				console.log("From inside the normalizedData user.js function"+json_responses);
				res.send(json_responses);
				
			} else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		});
	});
};