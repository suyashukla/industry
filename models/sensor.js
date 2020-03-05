var mongoose    =   require("mongoose");

var sensorSchema   =   mongoose.Schema({
    name: String,
	value: String
});

module.exports  =   mongoose.model("Sensor", sensorSchema);