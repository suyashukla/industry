var express	=	require("express");
var app	=	express();
var bodyParser	=	require("body-parser"),
	mongoose	=	require("mongoose"),
	seedDB		=	require("./seeds"),
	//requiring Routes
	projectRoutes		=	require("./routes/project"),
	configRoutes		=	require("./routes/config"),
	indexRoutes			=	require("./routes/index");

//seedDB();

mongoose.connect("mongodb+srv://industry:industry@cluster0-7ook7.mongodb.net/industry?retryWrites=true&w=majority");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine", "ejs");

app.use(indexRoutes);
app.use("/config", configRoutes);
app.use("/project", projectRoutes);

app.listen(process.env.PORT || 3200, function(){
	console.log("The Server Has Started!");
});
