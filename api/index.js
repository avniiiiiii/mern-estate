import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to db!!");
  })
  .catch((err) => {
    console.log("error:" + err);
  });

const app = express();

app.listen(5000, () => {
  console.log("hello avni ");
});
