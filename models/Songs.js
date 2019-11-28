var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var date = new Date();
var year = date.getFullYear();

const reviewsSchema = new mongoose.Schema({
	username: { type: String },
	rating: { type: Number, max: 10 },
	comment: { type: String, max: 200 }
});

const noticeSchema = new mongoose.Schema({
	dateRec: { type: Date },
	dateSent: { type: Date },
	dateDisRec: { type: Date }
});

const songsSchema = new mongoose.Schema({
	header: { type: String, max: 3 },
	title: { type: String, max: 30 },
	artist: { type: String, max: 30 },
	album: { type: String, max: 30 },
	year: { type: Number, max: this.year },
	comment: { type: String, max: 30 },
	zeroByte: { type: Number, max: 1 },
	track: { type: Number, max: 30 },
	genre: { type: Number, max: 255 },
	//review: { type: reviewsSchema },
	review: { type: Array },
	notice: { type: Array }
	//notice: { type: noticeSchema }
});

// Export the model
module.exports = mongoose.model("Songs", songsSchema);
module.exports = mongoose.model("Reviews", reviewsSchema);
module.exports = mongoose.model("Notices", noticeSchema);
