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
	header: { type: String, max: 3 }, //, index: true, text: true },
	title: { type: String, max: 30 }, //, index: true, text: true },
	artist: { type: String, max: 30 }, //, index: true, text: true },
	album: { type: String, max: 30 }, //, index: true, text: true },
	year: { type: Number, max: this.year },
	comment: { type: String, max: 30 }, //, index: true, text: true },
	zeroByte: { type: Number, max: 1 },
	track: { type: Number, max: 30 },
	genre: { type: Number, max: 255 },
	review: { type: Array },
	notice: { type: Array }
});

//songsSchema.set("autoIndex", false);
//songsSchema.set("useCreateIndex", true);
songsSchema.index({
	header: "text",
	title: "text",
	artist: "text",
	album: "text",
	year: "text",
	comment: "text",
	genre: "text"
});

//songsSchema.dropIndex("artist_text");

//songsSchema.dropIndex("title_text");
/*
songsSchema.createIndex({
	title: "text",
	content: "text",
	description: "text"
});
*/
//songsSchema.index({ artist: "text" });

//

// Export the model
module.exports = mongoose.model("Songs", songsSchema);
module.exports = mongoose.model("Reviews", reviewsSchema);
module.exports = mongoose.model("Notices", noticeSchema);
