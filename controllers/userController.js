const users = require('../models/userModel')
const jwt = require('jsonwebtoken')

// register logic

exports.registerController = async (req,res)=>{
    console.log("Inside register function");
    const {username,email,password} = req.body
    console.log(username,email,password);

    try{
        // check email is in mongoDb users
        const existingUser = await users.findOne({email})
        if(existingUser){
            //already a user
            res.status(406).json("Account already exists!!! please login")
        }else{
            // add /register user : create object for your model
            const newUser = new users({
                username,email,password,github:"",linkedin:"",profilePic:""
            })
            //update mongodb from model
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        console.log(err);
        res.status(401).json(err)
    }

}

// login logic

exports.loginController = async (req,res)=>{
    console.log("inside login function");
    const {email, password} = req.body
    console.log(email,password);
    try{
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            //token generate
            const token = jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD)
            res.status(200).json({
                user:existingUser,
                token
            })
        }else{
            res.status(404).json("Invalid Email / Password...")
        }
    }catch(err){
        res.status(401).json(err)
    }
}