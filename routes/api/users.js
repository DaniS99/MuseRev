const mongoose = require("mongoose");
const passport = require("passport");
const router = require("express").Router();
const auth = require("../auth");
const Users = mongoose.model("Users");
const Songs = mongoose.model("Songs");

//POST new user route (optional, everyone has access)
router.post("/", auth.optional, (req, res, next) => {
	let {
		body: { user }
	} = req;

	//user = new Users({
	//email: req.body.email,
	//hash: req.body.hash,
	//salt: req.body.salt,

	//});

	//res.send(user);

	if (!user.email) {
		return res.status(422).json({
			errors: {
				email: "is required"
			}
		});
	}

	if (!user.password) {
		return res.status(422).json({
			errors: {
				password: "is required"
			}
		});
	}

	user["isAdmin"] = false;
	user["isActive"] = true;

	//const finalUser = new Users(user);
	const finalUser = new Users(user);

	finalUser.setPassword(user.password);

	return finalUser
		.save()
		.then(() => res.json({ user: finalUser.toAuthJSON() }));
});

//POST login route (optional, everyone has access)
router.post("/login", auth.optional, (req, res, next) => {
	const {
		body: { user }
	} = req;

	if (!user.email) {
		return res.status(422).json({
			errors: {
				email: "is required"
			}
		});
	}

	if (!user.password) {
		return res.status(422).json({
			errors: {
				password: "is required"
			}
		});
	}

	return passport.authenticate(
		"local",
		{ session: false },
		(err, passportUser, info) => {
			if (err) {
				return next(err);
			}

			if (passportUser) {
				const user = passportUser;
				user.token = passportUser.generateJWT();

				//return res.json({ user: user.toAuthJSON() });
				return res.json(user.token);
			}

			return status(400).info;
		}
	)(req, res, next);
});

//GET current route (required, only authenticated users have access)
router.get("/current", auth.required, (req, res, next) => {
	const {
		payload: { id }
	} = req;

	return Users.findById(id).then(user => {
		if (!user) {
			return res.sendStatus(400);
		}

		return res.json({ user: user.toAuthJSON() });
	});
});

router.get("/checkAdmin", auth.required, (req, res, next) => {
	const {
		payload: { id }
	} = req;

	return Users.findById(id).then(user => {
		if (!user) {
			return res.sendStatus(400);
		}

		var bool = Boolean(user.isAdmin);

		return res.send(bool);
	});
});

module.exports = router;
