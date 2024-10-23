const express = require("express");
const cors    = require("cors");

require('dotenv').config();
require('./db');

const mainRouter = require("./routes/index");


const app = express();
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/v1",mainRouter);

app.listen( 3000, ()=> {
    console.log("The server has started successfully");

} )

