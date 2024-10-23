const express = require("express");

const router = express.Router();

// creating custom routes

const userRouter = require("./user");

// adding the routes to main router

router.use("/user",userRouter);
