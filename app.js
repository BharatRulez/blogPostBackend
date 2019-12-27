const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
var session = require('express-session');

const cors = require('cors')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const path = require("path");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("DB connected"));

mongoose.connection.on("error", err => {
  console.log(`DB connection error: ${err.message}`);
});
app.use(express.static(path.join(__dirname, "src")));


app.use(cors({credentials: true, origin: 'http://localhost:3006'}));
//middleware
app.use(morgan("dev"));
//app.use(myOwnMiddleWare);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret: 'keyboard cat',
resave: false,
saveUninitialized: true,
cookie: { secure: false }}));

app.use(bodyParser.json());
app.use(cookieParser());

//app.use(expressValidator());
var rroute = require('path').join(__dirname, 'src/routes')
require('fs').readdirSync(rroute).forEach(function(file) {
    var routeFile = require(rroute + '/' + file);
    app.use('/api/v1/', routeFile)
})


app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: "not authorized" });
    }
});

//const port = 4000;
const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`Server connected at  ${port}`);
});