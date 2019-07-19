var dotenv= require("dotenv");
dotenv.config();


exports.config = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};