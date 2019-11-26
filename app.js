const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("errorhandler");

// Code from: https://www.signet.hr/learn-how-to-handle-authentication-with-node-using-passport-js/

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === "production";

//Initiate our app
const app = express();

//Configure our app
app.use(cors());
app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
	session({
		secret: "passport-tutorial",
		cookie: { maxAge: 60000 },
		resave: false,
		saveUninitialized: false
	})
);

if (!isProduction) {
	app.use(errorHandler());
}

//Configure Mongoose
//mongoose.connect("mongodb://localhost/passport-tutorial");
const uri =
	"mongodb+srv://se3316:lab5@clusterdb-nyt2p.mongodb.net/test?retryWrites=true&w=majority";
//use your own URI from mongoDB atlas
// --------------------------------------------

// DB connect code for 'mongoose' package
mongoose.connect(uri, {
	useNewUrlParser: true
});
mongoose.set("debug", true);

//Models & routes
require("./models/Users");
require("./models/Songs");
require("./config/passport");
app.use(require("./routes"));

//Error handlers & middlewares
if (!isProduction) {
	app.use((err, req, res) => {
		res.status(err.status || 500);

		res.json({
			errors: {
				message: err.message,
				error: err
			}
		});
	});
}

app.use((err, req, res) => {
	res.status(err.status || 500);

	res.json({
		errors: {
			message: err.message,
			error: {}
		}
	});
});

app.listen(8000, () => console.log("Server running on http://localhost:8000/"));
