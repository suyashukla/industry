var mongoose    =   require("mongoose");

var locationSchema   =   mongoose.Schema({
    name: String,
	description: String,
	sensors:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Sensor"
		}
	]
});

module.exports  =   mongoose.model("Location", locationSchema);