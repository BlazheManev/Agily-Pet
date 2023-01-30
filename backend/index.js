const express = require("express");
//const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require("cors");
const {google} = require('googleapis');
const bodyParser = require('body-parser'); // tuka


const app = express();

/*var allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

app.use(cors({
  credentials: true,
  origin: function(origin, callback){
    // Allow requests with no origin (mobile apps, curl)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin)===-1){
      var msg = "The CORS policy does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));*/

router = express.Router();
var mail = require('./mailer/mailer.js');



var corsOptions = {
    origin: "http://localhost:3000"
}

//app.use(cors(corsOptions));


//new
var allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
app.use(cors({
  credentials: true,
  origin: function(origin, callback){
    // Allow requests with no origin (mobile apps, curl)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin)===-1){
      var msg = "The CORS policy does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

//konec new
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./models/baza");
const { prototype } = require("form-data");



db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Začetna stran AgilyPet" });
});

require("./routes/pes.routes")(app);
require("./routes/uporabnik.routes")(app);
require("./routes/courseRoutes")(app);
require("./routes/eventRoutes")(app);
require("./routes/tokenRoutes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use("/api", router);
