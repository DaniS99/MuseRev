const mongoose = require("mongoose");
const router = require("express").Router();
const Songs = mongoose.model("Songs");
const Reviews = mongoose.model("Reviews");
const Notices = mongoose.model("Notices");
const Policy = mongoose.model("Policy");
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
		isVisible: true,
		review: req.body.review,
		notice: req.body.notice
	});

	fullSong.save(function(err, data) {
		if (err) {
			return next(err);
		}
		res.send(data);
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

router.put("/createNotice/:id", (req, res, next) => {
	Songs.findOne({ _id: req.params.id }, function(err, data) {
		let newNotice = req.body.notice;
		data.notice.push(newNotice);

		// after you finish editing, you can save it to database or send it to client
		data.save(function(err) {
			if (err) return res.send(err);
			res.send(data);
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

router.post("/find", (req, res, next) => {
	//var query = req.params.query;
	var query = req.body.query;
	//res.send(query);
	//res.send(req.body);

	Songs.find(
		{
			$text: {
				$search: query
			}
		},
		function(err, result) {
			if (err) throw err;
			if (result) {
				res.json(result);
				//res.send(result);
			} else {
				res.send(
					JSON.stringify({
						error: "Error"
					})
				);
			}
		}
	);
});

router.post("/createPolicy", (req, res, next) => {
	let policy = new Policy({
		policy: req.body.policy
	});

	policy.save(function(err) {
		if (err) {
			return next(err);
		}
		res.send("Policy addedd successfully");
	});
});

router.post("/listPolicy", (req, res, next) => {
	Policy.find(function(err, policy) {
		if (err) return next(err);
		res.send(policy);
	});
});

router.put("/updatePolicy/:id", (req, res, next) => {
	let privacy = req.body.policy;
	let dmca = req.body.policy;

	Policy.findByIdAndUpdate(
		// the id of the item to find
		req.params.id,

		// the change to be made
		req.body,

		// ask mongoose to return the updated version
		{ new: true },

		// the callback function
		(err, todo) => {
			// Handle any possible database errors
			if (err) return res.status(500).send(err);
			return res.send(todo);
		}
	);
});

router.put("/visibility/:id", (req, res, next) => {
	Songs.findByIdAndUpdate(
		// the id of the item to find
		req.params.id,

		// the change to be made
		req.body,

		// ask mongoose to return the updated version
		{ new: true },

		// the callback function
		(err, todo) => {
			// Handle any possible database errors
			if (err) return res.status(500).send(err);
			return res.send(todo);
		}
	);
});

// Has to be last for some reason
router.put("/:id", (req, res, next) => {
	Songs.findOne({ _id: req.params.id }, function(err, data) {
		let newReview = req.body.review;
		data.review.push(newReview);

		// after you finish editing, you can save it to database or send it to client
		data.save(function(err) {
			if (err) return res.send(err);
			//res.send(Boolean([data]));
			res.send(data);
		});
	});
});

router.delete("/delete/:id", (req, res, next) => {
	Songs.findByIdAndDelete(
		// the id of the item to find
		req.params.id,

		// ask mongoose to return the updated version
		{ new: true },

		// the callback function
		(err, todo) => {
			// Handle any possible database errors
			if (err) return res.status(500).send(err);
			return res.send(todo);
		}
	);
});

module.exports = router;
