var mongoose    =   require("mongoose");

var sensorSchema   =   mongoose.Schema({
    name: String,
	description: String,
});

module.exports  =   mongoose.model("Sensor", sensorSchema);