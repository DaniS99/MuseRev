var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var date = new Date();
var year = date.getFullYear();

const songsSchema = new mongoose.Schema({
	header: { type: String, max: 3 },
	title: { type: String, required: true, max: 30 },
	artist: { type: String, required: true, max: 30 },
	album: { type: String, max: 30 },
	year: { type: Number, required: true, max: this.year },
	comment: { type: String, max: 30 },
	zeroByte: { type: Number, max: 1 },
	track: { type: Number, max: 2 },
	genre: { type: Number, required: true, max: 1 }
});

// Export the model
module.exports = mongoose.model("Songs", songsSchema);
