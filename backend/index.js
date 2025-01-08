require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString);

const User = require("./models/user.model");

const express = require('express')
const cors = require('cors')
const app = express()

const jwt = require("jsonwebtoken");
const {authenticateToken} = require("./utilities");

app.use(express.json());

app.use(
    cors({
        origin: ['+'],
        credentials: true
    })
);
app.get('/', (req, res) => {
    res.json({data: "Hello"});
})

// Create account 
app.post("/create-account", async (req, res) => {

    const {name, email, password} = req.body; 

    if (!name) {
        return res 
        .status(400)
        .json({error: true , message: "Please enter your full name"});
    }

    if (!email) {
        return res 
       .status(400)
       .json({error: true, message: "Please enter your email address"});
    }

    if (!password) {
        return res 
       .status(400)
       .json({error: true, message: "Please enter your password"});
    }

    const isUser = await User.findOne({email: email});

    if (isUser) {
        return res.json({
            error: true,
            message: "Email already exists."
        });
    }
    
    const user = new User({
        name,
        email,
        password
    });

    await user.save();

    const accessToken = jwt.sign({user}, process.env.accessToken, {
        expiresIn: "36000m"
    });

    res.json({
        error: false,
        user,
        accessToken,
        message: "User created successfully"
    });

});

app.listen(8000)

module.exports = app;