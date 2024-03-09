import UserModel from "../../models/auth/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  try {
    let existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists. Please login instead." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email: email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User not found. Please sign up." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "Invalid email/password combination." });
    }

    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    // Set cookie with token
    res.cookie(String(existingUser._id), token, {
      path: "/",
      maxAge: 3600000, // 1 hour in milliseconds
      httpOnly: true,
      sameSite: "lax",
    });

    return res
      .status(200)
      .json({ message: "Successfully logged in", user: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(404).json({ message: "No token found." });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(400).json({ message: "Invalid token." });
    }
    req.userId = decodedToken.id;
    next();
  });
};

export const getUser = async (req, res, next) => {
  const userId = req.userId;

  try {
    const user = await UserModel.findById(userId, "-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const refreshToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(400).json({ message: "Couldn't find token" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }

    // Clear previous token cookie
    res.clearCookie(String(decodedToken.id));

    // Generate new token
    const newToken = jwt.sign({ id: decodedToken.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h" // 1 hour
    });

    // Set cookie with new token
    res.cookie(String(decodedToken.id), newToken, {
      path: "/",
      maxAge: 3600000, // 1 hour in milliseconds
      httpOnly: true,
      sameSite: "lax",
    });

    req.userId = decodedToken.id;
    next();
  });
};
