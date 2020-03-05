var express	=	require("express");
var router	=	express.Router();
var Project	=	require("../models/projects"),
	Location	=	require("../models/location"),
	Sensor		=	require("../models/sensor");

//INDEX ROUTE-shows all projects in configuration page
router.get("/", function(req, res){
	Project.find({}, function(err, allProjects){
		if(err){
			console.log(err);
		}else{
			res.render("config/index",{projects:allProjects});
		}
	});
});

//CREATE - add new project to DBs
router.post("/", function(req,res){
	//get data from form and add to project array
	var name	=	req.body.name;
	var desc	=	req.body.description;
	var newProject={name: name, description: desc}
	//Create a new project and save to DB
	Project.create(newProject, function(err, newlyCreate){
		if(err){
			console.log(err);
		}else{
			//redirect back to config page
			res.redirect("/config");
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
				res.render("config/show", {project: foundProject});
				console.log(foundProject.locations)
		}
	});
});

router.post("/:id", function(req, res){
	Project.findById(req.params.id, function(err, project){
		if(err){
			console.log(err);
			res.redirect("/config");
		}else{
			Location.create(req.body.location, function(err, location){
				if(err){
					console.log(err)
				}else{
					project.locations.push(location);
					project.save();
					res.redirect("/config/"+project._id);
				}
			});
		}
	});
});

router.get("/:id/:locid", function(req, res){
	Project.findById(req.params.id, function(err, foundProject){
		if(err){
			console.log(err);
			res.redirect("/config");
		}else{
			Location.findById(req.params.locid).populate("sensors").exec(function(err, foundLocation){
				if(err){
					console.log(err);
				}else{
					res.render("config/loc",
						{
							location: foundLocation,
							project: foundProject
					});
				}
			});
		}
	});
});

router.post("/:id/:locid", function(req, res){
	Project.findById(req.params.id, function(err, project){
		if(err){
			console.log(err);
			res.redirect("/config");
		}else{
			Location.findById(req.params.locid, function(err, location){
				if(err){
					console.log(err);
					res.redirect("/config");
				}else{
					Sensor.create(req.body.sensor, function(err, sensor){
						if(err){
							console.log(err)
						}else{
							location.sensors.push(sensor);
							location.save();
							res.redirect("/config/"+project._id+"/"+location._id);
						}
					});
				}
			});
		}
	});
});

module.exports	=	router;