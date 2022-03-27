import dotenv from "dotenv";
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  DATABASE: process.env.DATABASE,
  USER: process.env.USER,
  PASS: process.env.PASS,
  LIMITCON: process.env.LIMITCON,
  SECRET_KEY: process.env.SECRET_KEY,
  SALT: process.env.SALT,
  EXPIRED: process.env.EXPIRED,
};
