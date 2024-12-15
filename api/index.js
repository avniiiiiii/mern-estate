import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.router.js";
import cookieParser from "cookie-parser";
import listingRouter from "./routes/listing.route.js";
import uploadRoute from "./routes/uploadRoute.js";
import path from "path";

dotenv.config();
console.log("MONGODB_URI:", process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db!!");
  })
  .catch((err) => {
    console.log("error:" + err);
  });
const __dirname = path.resolve(); //render

const app = express();
app.use(express.json());
app.use(cookieParser()); //cookie parser downloaded to read our cookies

app.listen(5000, () => {
  console.log("hello avni ");
});
//not a great way to make api route as it will elongate the index js file.
//best way is to seperate the api route and functions(controller) in a differnt file. so we created routes folder in api folder and controllers folder
// app.get("/test", (req, res) => {
//   res.send("hello test");
// });
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api", uploadRoute); //api for image uploads
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__dirname, "/client/dist"))); //render config
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

//middleware to handle errors instead of try catch
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
