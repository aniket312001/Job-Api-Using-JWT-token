const { BadRequestError, UnauthenticatedError } = require('../errors')
const User = require('../models/User')
// const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')

const register = async (req,res)=>{

    // const {name,email,password} = req.body
    // // if(!name || !email || !password){
       
    // //     throw new BadRequestError("please Provide name, email, password")
    // // }

    // const salt = await bcrypt.genSalt(10);  // hashing the password using bcrypt lib
    // const hashedPassword = await bcrypt.hash(password,salt)


    // const tempUser = {name,email,password:hashedPassword}

    const user = await User.create({...req.body})

    const token  = user.createJWT()

    res.json({user:{ name:user.getName() },token})
}

const login = async (req,res)=>{
    const {email, password} = req.body

    if(!email || !password){
        throw new BadRequestError("Please Provide email and password ")
    }

    const user = await User.findOne({email})
    
    if(!user){
        throw new UnauthenticatedError("Invaild User")
    }

    // compare password in model file

    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError("Invaild User")
    }

    const token  = user.createJWT()


    res.status(StatusCodes.OK).json({user:{ name:user.getName() },token})
}

module.exports =  {
    register,
    login
}