var express	=	require("express");
var app	=	express();
var bodyParser	=	require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("index");
});

app.listen(3200, function(){
	console.log("The Server Has Started!");
});
