const express=require('express')
const User=require("../models/User")
const router =express.Router();
const {body,validationResult}=require('express-validator')
const bcrypt= require('bcryptjs')
const fetchuser=require('../middleware/fetchuser')

const jwt=require("jsonwebtoken");

const JWT_SECRET='Naimul$123';

//route 1: create a user using:POST "/api/auth/createuser". Doesn't require auth
router.post('/createuser',[
    body('name','enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password').isLength({min:5})
],async (req,res) =>{

    //if there are errors, return bad request and the errors
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
        
        
        //check whether the user with this email exist already
    let user=await User.findOne({email:req.body.email});
    if(user){
        res.status(400).json({error:"Sorry a user with this email already exists"})
    }
    const salt=await bcrypt.genSalt(10);
    secPass= await bcrypt.hash(req.body.password,salt) 
    //create a new user
     user=await User.create({
        name:req.body.name,
        password:secPass,
        email:req.body.email,
    });
    const data={
        user:{
            id:user.id
        }
    }

    const authToken=jwt.sign(data,JWT_SECRET)
    console.log(authToken);

    // res.json({"msg":"Data saved successfully"})
    // res.json(user)
    res.json({ authToken} )
} catch(err){
    console.error(err.message);
    res.status(500).send("Internal server error occured")
}

})

// route 2: authenticate a user using POST "/api/auth/login". No Login required
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
],async (req,res) =>{
 
    //if there are errors, return bad request and the errors
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password}=req.body;

    try {
        let user=await User.findOne({email})
        if(!user){
            return res.status(400).json({error:"Please try to login with correct credentials"})
        }
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({error:"Please try to login with correct credentials"})
        }
        const data={
            user:{
                id:user.id
            }
        }
    
        const authToken=jwt.sign(data,JWT_SECRET)
        res.json({authToken})
        // res.json(user)
    } catch(err){
        console.error(err.message);
        res.status(500).send("Internal server error occured")
    }
})

//route 3: Get loggedIn user details using: POST "/api/auth/getuser". Login required
router.post('/getuser',fetchuser,async (req,res) =>{
try {
 userId=req.user.id;
 const user=await User.findById(userId).select("-password")
 res.send(user)
    
} catch(err){
    console.error(err.message);
    res.status(500).send("Internal server error occured")
}
})

module.exports=router