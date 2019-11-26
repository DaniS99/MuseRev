const mongoose = require("mongoose");
const router = require("express").Router();
const Songs = mongoose.model("Songs");
const Reviews = mongoose.model("Reviews");

router.post("/create", (req, res, next) => {
	console.log(req.body);
	//let song = req.body;
	//console.log(song);
	/*
	const {
		body: { song }
	} = req;

	console.log(song);

	const fullSong = new Songs(song);

	console.log(fullSong);

	return fullSong.save().then(() => res.json({ song: fullSong.toAuthJSON() }));*/

	let fullSong = new Songs({
		header: req.body.header,
		title: req.body.title,
		artist: req.body.artist,
		album: req.body.album,
		year: req.body.year,
		comment: req.body.comment,
		zeroByte: req.body.zeroByte,
		track: req.body.track,
		genre: req.body.genre,
		review: req.body.review
	});

	fullSong.save(function(err) {
		if (err) {
			return next(err);
		}
		res.send("Song addedd successfully");
	});
});

router.post("/createReview", (req, res, next) => {
	let review = new Reviews({
		username: req.body.username,
		rating: req.body.rating,
		comment: req.body.comment
	});

	review.save(function(err) {
		if (err) {
			return next(err);
		}
		res.send("Review addedd successfully");
	});
});

module.exports = router;
