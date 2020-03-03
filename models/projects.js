var mongoose    = require("mongoose");  

var projectSchema	=	new mongoose.Schema({
	name: String,
	description: String,
	locations:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Location"
		}
	]
});

module.exports	=	mongoose.model("Project", projectSchema);
