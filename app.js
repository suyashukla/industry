var express	=	require("express");
var app	=	express();
var bodyParser	=	require("body-parser"),
	mongoose	=	require("mongoose"),
	Project	=	require("./models/projects"),
	seedDB		=	require("./seeds");

seedDB();;

mongoose.connect("mongodb://localhost/industry", { useNewUrlParser: true, useUnifiedTopology: true } );

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("index");
});

app.get("/project", function(req, res){
	Project.find({}, function(err, allProjects){
		if(err){
			console.log(err);
		}else{
			res.render("project",{projects:allProjects});
		}
	});
});

app.get("/config", function(req, res){
	Project.find({}, function(err, allProjects){
		if(err){
			console.log(err);
		}else{
			res.render("config",{projects:allProjects});
		}
	});
});

//CREATE - add new project to DBs
app.post("/config", function(req,res){
	//get data from form and add to campgrounds array
	var name	=	req.body.name;
	var desc	=	req.body.description;
	var newProject={name: name, description: desc}
	//Create a new project and save to DB
	Project.create(newProject, function(err, newlyCreate){
		if(err){
			console.log(err);
		}else{
			//redirect back to campgrounds page
			res.redirect("/config");
		}
	});
});

app.get("/config/:id", function(req, res){
	//find the campground with provided ID
	Project.findById(req.params.id).populate("locations").exec(function(err, foundProject){
		if(err){
			console.log(err);
		}else{
				console.log(foundProject);
				//render show template with that campground
				res.render("show", {project: foundProject});
				console.log(foundProject.locations)
		}
	});
});

app.post("/config/:id", function(req, res){
	//lookup campground using ID
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

app.listen(3200, function(){
	console.log("The Server Has Started!");
});
