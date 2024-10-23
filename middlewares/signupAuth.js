const express = require("express");
const z = require('zod');
const jwt = require("jsonwebtoken");
const bodyparser = require("body-parser");

const router = express.Router();



// Define Signup Schema
const signupSchema = z.object({
  username: z.string()
    .min(2, { message: "Username must be at least 2 characters long" })
    .refine(value => /^[A-Z]/.test(value), { message: "Username must start with an uppercase letter" }),

  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .refine(value => /[A-Z]/.test(value), { message: "Password must contain at least one uppercase letter" })
    .refine(value => /[a-z]/.test(value), { message: "Password must contain at least one lowercase letter" })
    .refine(value => /[0-9]/.test(value), { message: "Password must contain at least one number" }),
   

  email: z.string().email("Invalid email format")
    .refine(value => value.endsWith('.com'), { message: "Only '.com' domains are allowed" })
});

// Middleware for Signup Validation
const ValidateSignup = (req, res, next) => {

  const { username, email, password} = req.body;

  const missingField =[];
  if(!username){ missingField.push("username"); }
  if(!email){ missingField.push("email"); }
  if(!password){ missingField.push("password"); }

  if(missingField.length > 0){
    return res.status(411).json({
        status: "error",
        message: "missing field",
        errors: missingField.map(field => ({
            field,
         
                message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
             
        })
    ) 
    })
  }


  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: result.error.errors.map(err => ({
        
        // what is the field syntax?
        field: err.path[0], 
        message: err.message 
      }))
    });
  }

  next();  // Proceed to the next middleware or route handler
};

module.exports = { ValidateSignup } ;

