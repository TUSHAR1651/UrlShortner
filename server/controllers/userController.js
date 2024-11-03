const mongo = require("mongoose");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
    res.send('hello Tushar, User route is working!');
};

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPass = await bcrypt.hash(password, 10);
        const user = new userModel({
            name,
            email,
            password: hashedPass
        });

        await user.save();
        res.status(201).json(
            {
                message: "User Created Successfully",
                User : user
            }
        );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel
            .findOne({ email: email });
        // console.log(!user);
        if(!user) {
            return res.json({ message: "User not found" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({
            email: user.email, id: user
        }, 'test', { expiresIn: "1h" });
        return res.status(200).json({ result: user, token  , message : "User Logged In Successfully" });

    }
    catch {
        res.status(500).json({ message: "Something went wrong" });
    }
    
}

module.exports = { test, signup , login };
