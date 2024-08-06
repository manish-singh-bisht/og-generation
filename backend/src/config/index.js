const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
  CLOUD_NAME: process.env.CLOUDINARY_NAME,
  API_KEY: process.env.CLOUDINARY_API_KEY,
  API_SECRET: process.env.CLOUDINARY_API_SECRET,
  KAFKA_BROKERS: process.env.KAFKA_BROKERS,
  USERNAME_KAFKA: process.env.USERNAME_KAFKA,
  PASSWORD_KAFKA: process.env.PASSWORD_KAFKA,
  ORIGIN: process.env.ORIGIN,
};
