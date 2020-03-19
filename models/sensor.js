var mongoose    =   require("mongoose");

var sensorSchema   =   mongoose.Schema({
    name: String,
    value: String,
    history:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "History"
		}
	]
});

module.exports  =   mongoose.model("Sensor", sensorSchema);