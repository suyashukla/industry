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

//SHOW - show more info about one project
router.get("/:id", function(req, res){
	//find the project with provided ID
	Project.findById(req.params.id).populate("locations").exec(function(err, foundProject){
		if(err){
			console.log(err);
		}else{
				console.log(foundProject);
				//render show template with that project
				res.render("project/show", {project: foundProject});
				console.log(foundProject.locations)
		}
	});
});

router.get("/:id/:locid", function(req, res){
	Project.findById(req.params.id, function(err, foundProject){
		if(err){
			console.log(err);
			res.redirect("/project");
		}else{
			Location.findById(req.params.locid).populate("sensors").exec(function(err, foundLocation){
				if(err){
					console.log(err);
				}else{
					res.render("project/loc",
						{
							location: foundLocation,
							project: foundProject
					});
				}
			});
		}
	});
});
router.get("/:id/:locid/:senid", function(req, res){
	Project.findById(req.params.id, function(err, foundProject){
		if(err){
			console.log(err);
			res.redirect("/project");
		}else{
			Location.findById(req.params.locid).populate("sensors").exec(function(err, foundLocation){
				if(err){
					console.log(err);
				}else{
					Sensor.findById(req.params.senid).populate("history").exec(function(err, foundSensor){
						if(err){
							console.log(err);
						}else{
							//console.log(foundSensor.history);
							var values 	= [],
								dates	= [];
							foundSensor.history.forEach(function(his){
								values.push(his.value);
								dates.push(his.date);
							});	
							res.render("project/sense",
								{
									location: foundLocation,
									project: foundProject,
									sensor:	foundSensor,
									yaxis: values,
									xaxis: dates							
								}
							);
						}
					});
				}
			});
		}
	});
});

module.exports	=	router;