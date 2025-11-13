import User from "../models/userschema.js";
import Usergoogle from "../models/userschemagooglelogin.js";
import Chat from "../models/chatschema.js";
import { mongoconnect } from "../libs/mongodbconnect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// User login
export async function login(req, res) {
  await mongoconnect();
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ success: false, message: "Missing email or password" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Incorrect email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ success: false, message: "Incorrect email or password" });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return res.status(200).json({ success: true, message: "Login Successful", email: user.email, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Unexpected Error" });
  }
}

// User signup
export async function signup(req, res) {
  await mongoconnect();
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ success: false, message: "Missing email or password" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: "Email Already Exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword });

    return res.status(200).json({ success: true, message: "Account Successfully Created" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Unexpected Error" });
  }
}

// Google login
export async function googlelogin(req, res) {
  await mongoconnect();
  const { email, name, picture, googleId } = req.body;

  if (!email || !googleId)
    return res.status(400).json({ success: false, message: "Missing Google credentials" });

  try {
    let user = await Usergoogle.findOne({ googleid: googleId });
    if (!user) {
      user = await Usergoogle.create({ googleemail: email, googlename: name, googleid: googleId, googlepicture: picture });
    }

    const token = jwt.sign({ id: user._id, googleemail: user.googleemail }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return res.status(200).json({
      success: true,
      message: "Google Login Successful",
      username: user.googlename,
      email: user.googleemail,
      picture: user.googlepicture,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Unexpected Error" });
  }
}

// Save or append chat messages
export async function chat(req, res) {
  await mongoconnect();
  const { id, userchatmessage } = req.body;

  if (!id || !userchatmessage) return res.status(400).json({ success: false, message: "Missing parameters" });

  try {
    let chatdata = await Chat.findOne({ id });

    if (!chatdata) {
      // Create new chat
      await Chat.create({ id, messages: userchatmessage });
    } else {
      // Append new messages to existing chat
      chatdata.messages.push(...userchatmessage);
      await chatdata.save();
    }

    return res.status(200).json({ success: true, message: "Messages stored" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Unexpected Error" });
  }
}

// Get chat history for a user
export async function getchathistory(req, res) {
  await mongoconnect();
  const { id } = req.params;

  if (!id) return res.status(400).json({ success: false, message: "Missing user id" });

  try {
    const chatdata = await Chat.findOne({ id });
    if (!chatdata) return res.status(200).json({ messages: [] });

    return res.status(200).json({ messages: chatdata.messages });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Unexpected Error" });
  }
}
