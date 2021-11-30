//  import the require dependencies
const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./Util/config");
const cookieParser = require("cookie-parser");

// use cors to allow cross origin resource sharing
app.use(cors({ origin: `${config.api_local}`, credentials: true }));

// use express session to maintain session data
app.use(
  session({
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000,
  })
);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Allow Access Control
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", `${config.api_local}`);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cacbodyhe");
  next();
});

app.use(cookieParser());

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
console.log(config.mongoURI);
mongoose.connect(config.mongoURI, options, (err, res) => {
  if (err) {
    console.log("cannot connect to mongo db");
  } else {
    // console.log(res);
    console.log("connection successful");
  }
});
mongoose.set("debug", (collectionName, method, query, doc) => {
  console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
});
// Routing
const login = require("./Routes/Customer/Login.js");
const signUp = require("./Routes/Customer/Signup.js");
const employeeLogin = require("./Routes/Employee/login");
const employeeSignup = require("./Routes/Employee/signup");
const profile = require("./Routes/Profile/Profile.js");
const addFlightRoutes = require("./Routes/Employee/addFlight");
const editFlight = require("./Routes/Employee/editFlight");
const flights = require("./Routes/Flights/flights.js");
const reservations = require("./Routes/Flights/reservations");
const cancelFlight = require("./Routes/Employee/cancelFlight");
const changeSeatResarvation = require("./Routes/Flights/changeSeat");
const getReservations = require("./Routes/Customer/getAllReservations");
const getAvailableSeats = require("./Routes/Flights/getAvailableSeats");
const getUpcomingFlights = require("./Routes/Employee/getUpcomingFlights");
const getUpcomingCustomerReservations = require("./Routes/Customer/getUpcomingCustomerReservations");

// Route config
app.use("/login", login);
app.use("/signup", signUp);
app.use("/employee/login", employeeLogin);
app.use("/employee/signup", employeeSignup);
app.use("/profile", profile);
app.use("/employee/addFlight", addFlightRoutes);
app.use("/employee/editFlight", editFlight);
app.use("/employee/cancelFlight", cancelFlight);
app.use("/flights", flights);
app.use("/employee/getUpcomingFlights", getUpcomingFlights);
app.use("/reservations", reservations);
app.use("/reservations/changeSeat", changeSeatResarvation);
app.use("/customer/getReservations", getReservations);
app.use("/flights/getAvailableSeats", getAvailableSeats);
app.use(
  "/customer/getUpcomingCustomerReservations/",
  getUpcomingCustomerReservations
);

app.use((req, res, next) => {
  const error = new Error("Route Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// start your server on port 3001
app.listen(config.serverPort);
console.log("Server Listening on port 3001");
