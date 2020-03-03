var mongoose    =   require("mongoose");

var locationSchema   =   mongoose.Schema({
    name: String,
	description: String,
	// sensor:[
	// 	{
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: "Sensor"
	// 	}
	// ]
});

module.exports  =   mongoose.model("Location", locationSchema);