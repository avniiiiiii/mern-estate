// bcryptjs for encrypting pass so mongodb admins cant read it
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    console.log(req.body); // Log the incoming request body
    const { username, email, password } = req.body;
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save(); // Save user to the database

    // Send success response
    res.status(201).json(newUser);
  } catch (error) {
    // console.error("Error during signup:", error.message);
    // res.status(500).json({ error: "Internal Server Error" });
    next(errorHandler(500, error.message));
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email }); // Check if the user exists in the database
    if (!validUser) return next(errorHandler(404, "User not found"));

    const validPassword = bcryptjs.compareSync(password, validUser.password); //Compare the provided password with the stored hash
    if (!validPassword) return next(errorHandler(401, "Invalid credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET); //token serves as a proof of the user's identity once they log in. After successful login, the server generates a token (e.g., JWT - JSON Web Token) and sends it to the client.The client stores this token (usually in localStorage or a cookie) and sends it with subsequent requests to prove the user's identity.
    //     //This way, the server doesn't need to verify credentials (like username and password) every time a request is made. The token is enough to authenticate the user.
    //     // install the JWT library // Create a JWT token for the use
    const { password: pass, ...rest } = validUser._doc; //everything in response except pass

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      const { password, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      const { password, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};
