var mongoose    =   require("mongoose");

var historySchema   =   mongoose.Schema({
    date: String,
    time: String,
  	value: Number
});

module.exports  =   mongoose.model("History", historySchema);