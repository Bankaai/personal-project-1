const express = require("express");
const router = express.Router();

// imports
const z = require('zod');
const jwt = require('jsonwebtoken');
const { User } = require("../db");
const{ validateSignup} = require("../middlewares/signupAuth");

require('dotenv').config();
const jwt_secret = process.env.JWT_SECRET;

// SIGNUP ROUTE
router.post("/signup", validateSignup, async (req, res) => {
    const { username, email, password } = req.body; 

    const { success, error } = signupSchema.safeParse(req.body);  

    if (!success) {
        return res.status(400).json({
            message: "Invalid inputs",
            error: error ? error.message : "Validation failed"  
        });
    }

    try {
        const user = await User.create({
            username: username,
            email: email.toLowerCase(),
            password: password
        });

        if (user) {
            res.status(200).json({
                message: "User created successfully"
            });
        } else {
            res.status(500).json({
                message: "Failed to create user"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error occurred during user creation",
            error: err.message
        });
    }
});

module.exports = router;
