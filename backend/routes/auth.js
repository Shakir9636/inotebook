const express = require('express')
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = "shakirisgoodman";

//Route-1: Create a User using:POST "/api/auth/createuser" does't require auth
router.post('/createuser', [
    body('name','Enter a valid name').notEmpty().escape(),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    //if there are errors, return bad request and the errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({errors:result.array()});
    }
    // check whether the user exists already
    try{
        let user  = await User.findOne({email:req.body.email})
        if(user){
            return res.status(400).json({error:"Sorry a user with this email already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);
        //Create a new user
        user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secPass
        });
        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        
        // .then(user => res.json(user))
        // .catch(err=>{console.log(err)
        // res.json({error:"please enter a unique value for email",message:err.message})})
        // res.send(user)
        res.send({authtoken})
    } catch(error){
        res.status(500).send("Internal Server Error");
    }
  })
//Route-2:Authenticate a User using:POST "/api/auth/login"
router.post('/login', [
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists(),
], async (req, res) => {
    //if there are errors, return bad request and the errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({errors:result.array()});
    }
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!user || !passwordCompare){
            return res.status(400).json({error:"Please try to login with correct Credentials"});
        }
        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.send({authtoken})
    }catch(err){
        res.status(500).send("Internal Server Error");
    }

})

//Route-2:Get loggedin User Details using:POST "/api/auth/getuser" Login Required
router.post('/getuser', fetchuser, async (req, res) => {
    try{
        const userId = req.user.id
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }catch(err){
        res.status(500).send("Internal Server Error");
    }

})

module.exports = router