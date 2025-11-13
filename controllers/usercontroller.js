import User from "../models/userschema.js";
import Usergoogle from "../models/userschemagooglelogin.js";
import Chat from "../models/chatschema.js";
import { mongoconnect } from "../libs/mongodbconnect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function login(req, res) {
    await mongoconnect();
    const { email, password } = req.body;
    try {
        const useremail = await User.findOne({ email: email });
        if (!useremail) {
            return res.status(400).json({ success: false, message: "Incorrect email and password" });
        }
        const passwordmatch = await bcrypt.compare(password, useremail.password);
        if (!passwordmatch) {
            return res.status(400).json({ success: false, message: "Incorrect email and password" });
        }

        const token = jwt.sign({ id: useremail._id, email: useremail.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

        return res.status(200).json({ success: true, message: "Login Successful", email :useremail.email, token });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "Unexpected Error" });
    }
}


export async function signup(req, res) {
    await mongoconnect();
    const { email, password } = req.body;
    try {
        const useremail = await User.findOne({ email: email });
        if (useremail) {
            return res.status(400).json({ success: false, message: "Email Already Existed" });
        }
        let encryptedpassword = await bcrypt.hash(password, 10);
        await User.create({ email: email, password: encryptedpassword });
        return res.status(200).json({ success: true, message: "Account Successfully Created" });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "Unexpected error" });
    }
}

export async function googlelogin(req, res) {

    await mongoconnect();
    const { email, name, picture, googleId } = req.body;
    try {
        let user = await Usergoogle.findOne({ googleid : googleId });
        if (!user) {
            user = await Usergoogle.create({ googleemail: email, googlename: name, googleid: googleId, googlepicture: picture });
        }
        const token = jwt.sign({ id: user._id, googleemail: user.googleemail }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return res.status(200).json({
            success: true, message: "Google Login Successful", 
            username: user.googlename,
            email: user.googleemail,
            picture: user.googlepicture,
            token,
        });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: "Unexpected Error" });
    }
}

export async function chat(req,res)
{
    await mongoconnect();
    const { id, userchatmessage } = req.body;
    try
    {
        const useridexist = await Chat.findOne({id : id});
        if(!useridexist)
        {
           await Chat.create({id: id, messages : userchatmessage});
        }
        return res.status(200).json({success : true,message: "Done"});
    }
    catch(err)
    {
        return res.status(500).json({success: false, message : "Uexpected Error"});
    }
}