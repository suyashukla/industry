var express	=	require("express");
var app	=	express();
var bodyParser	=	require("body-parser"),
mongoose	=	require("mongoose");

mongoose.connect("mongodb://localhost/industry", { useNewUrlParser: true, useUnifiedTopology: true } );


//Schema Setup
var projectSchema	=	new mongoose.Schema({
	name: String,
	description: String
});

var Project	=	mongoose.model("Project", projectSchema);

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
	res.render("config");
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
			res.redirect("/project");
		}
	});
});

app.listen(3200, function(){
	console.log("The Server Has Started!");
});
