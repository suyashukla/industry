var express	=	require("express");
var router	=	express.Router({mergeParams: true}),
	Project	=	require("../models/projects"),
	Location	=	require("../models/location"),
	Sensor		=	require("../models/sensor");


router.get("/", function(req, res){
	Project.find({}, function(err, allProjects){
		if(err){
			console.log(err);
		}else{
			res.render("project/index",{projects:allProjects});
		}
	});
});

module.exports	=	router;