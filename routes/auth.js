// const router = require("express").Router();
import {Router} from "express";
// import { genSalt, hash} from "bcryptjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import verifyAuth from "../middleware/verifyAuth.js";

const router = Router();

// POST | /api/v1/register | public | register user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // CEK APAKAH SEMUA FIELDS SUDAH DIISI
    if (!name || !email || !password) {
      return res.status(400).json({
        msg: "please fill the required fields",
        success: false,
      });
    }
    // CEK APAKAH EMAIL SUDAH TERDAFTAR
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        msg: "user already exists",
        success: false,
      });
    }

    user = new User({
      name,
      email,
      password,
    });

    const slat = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, slat);
    await user.save();

    // paylaod || {id: user._id}
    jwt.sign(
      { id: user._id },
      process.env.JWT_SECTET,
      {
        expiresIn: 36000,
      },
      (err, token) => {
        if (err) throw err;
        return res.status(200).json({
          token
        });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ success: false });
  }
});


// POST api/v1/login | public | login exixting user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        msg: "invalid credentials",
        success: false,
      });
    }
    let user = await findOne({ email }).select("+password");
    if (!user)
      return res.status(400).json({
        msg: "invalid credentials",
        success: false,
      });
    const isMatch = await compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        msg: "invalid credentials",
        success: false,
      });
    sign(
      { id: user._id },
      process.env.JWT_SECTET,
      {
        expiresIn: 36000,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
});
// GET api/v1/user | private | get logged in user for the process of auth
router.get("/user", verifyAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      // deep populate
      path: "posts",
      populate: {
        path: "comments",
      },
    });
    res.status(200).json({
      user,
      success: true,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "SERVER ERROR" });
  }
});
export default router;
