const mongoose = require("mongoose");
const router = require("express").Router();
const Songs = mongoose.model("Songs");

router.post("/create", (req, res, next) => {
	let song = new Songs({
		header: req.body.header,
		title: req.body.title,
		artist: req.body.artist,
		album: req.body.album,
		year: req.body.year,
		comment: req.body.comment,
		zeroByte: req.body.zeroByte,
		track: req.body.track,
		genre: req.body.genre
	});

	song.save(function(err) {
		if (err) {
			return next(err);
		}
		res.send("Song addedd successfully");
		console.log("Song addedd successfully");
	});
});

module.exports = router;
