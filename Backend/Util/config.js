const dotenv = require('dotenv');
dotenv.config();

const config = {
  secret: process.env.SECRET_KEY,
  api_local: 'http://localhost:'+process.env.PORT,
  mongoURI: 'mongodb+srv://'+process.env.MONGODB_USER+':'+process.env.MONGODB_PASSWORD+'@cluster0.wvjnk.mongodb.net/AirlineReservation?retryWrites=true&w=majority',
  url: 'localhost',
  serverPort: process.env.SERVER_PORT,
  port: process.env.PORT
};

module.exports = config;