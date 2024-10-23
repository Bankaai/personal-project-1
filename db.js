require('dotenv').config();

const mongoose = require('mongoose');
const mongo_URI = process.env.MONGO_URI;

mongoose.connect(mongo_URI)
    .then(()=>{
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.error("Database connection error", error.message)
    })


    // Schema for Database level entry

    const UserSchema = new mongoose.Schema({
        userame :{
            type : String,
            required: true,
            unique: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true,
            lowerCase: true
        }
    })

    const User = mongoose.model("User",UserSchema);

    module.exports ={
        User
    }