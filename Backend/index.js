//  import the require dependencies
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./Util/config');
const dotenv = require('dotenv');
dotenv.config();
console.log(process.env.MONGODB_USER)
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
  }),
);

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

// Allow Access Control
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `${config.api_local}`);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
  );
  res.setHeader('Cache-Control', 'no-cacbodyhe');
  next();
});

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
console.log(config.mongoURI);
mongoose.connect(config.mongoURI, options, (err, res) => {
  if (err) {
    console.log('cannot connect to mongo db');
  } else {
    // console.log(res);
    console.log('connection successful');
  }
});
mongoose.set("debug", (collectionName, method, query, doc) => {
  console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
});
// Routing
const login = require('./Routes/Login.js');
const signUp = require('./Routes/Signup.js');
//const profile = require('./Routes/Profile.js');
const empRoutes = require("./Routes/employee");


// Route config
app.use('/login', login);
app.use('/signup', signUp);
app.use("/employee", empRoutes);


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

// app.use('/profile', profile);

// start your server on port 3001
app.listen(config.serverPort);
console.log('Server Listening on port 3001');
