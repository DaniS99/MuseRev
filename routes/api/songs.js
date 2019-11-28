const mongoose = require("mongoose");
const router = require("express").Router();
const Songs = mongoose.model("Songs");
const Reviews = mongoose.model("Reviews");
const Notices = mongoose.model("Notices");
const { MongoClient, ObjectID } = require("mongodb");

router.post("/create", (req, res, next) => {
	//console.log(req);
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
		review: req.body.review,
		notice: req.body.notice
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

router.get("/list", (req, res, next) => {
	Songs.find(function(err, song) {
		if (err) return next(err);
		res.send(song);
	});
});

router.get("/:id", (req, res, next) => {
	Songs.findById(req.params.id, (err, data) => {
		//console.log(data);
		res.send(data);
		return;
	});
});

router.put("/:id", (req, res, next) => {
	Songs.findOne({ _id: req.params.id }, function(err, data) {
		//if (err) res.send(err);
		let newReview = req.body.review;
		data.review.push(newReview);

		// after you finish editing, you can save it to database or send it to client
		data.save(function(err) {
			if (err) return res.send(err);
			res.send(data);
			//return res.json({ message: "User updated!" });
		});
	});
});

router.post("/createNotice", (req, res, next) => {
	let notice = new Notices({
		dateRec: req.body.dateRec,
		dateSent: req.body.dateSent,
		dateDisRec: req.body.dateDisRec
	});

	notice.save(function(err) {
		if (err) {
			return next(err);
		}
		res.send("Notice addedd successfully");
	});
});

module.exports = router;
