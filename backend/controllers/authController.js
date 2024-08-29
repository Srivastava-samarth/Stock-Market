import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/userModel.js'
import dotenv from 'dotenv'
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;


export const register = async(req,res)=>{
    try {
        const {fullname,email,password} = req.body;
        if(!fullname || !email || !password){
            return res.status(400).json({
                message:"Missing Credentials",
                success:false
            });
        };

        const user = await User.findOne({email});
    if(user){
        return res.status(400).json({
            message:'User already exist with this email',
            success:false
        })
    }
    const hashedPassword = await bcrypt.hash(password,10);

    await User.create({
        fullname,
        email,
        password:hashedPassword
    });
    return res.status(201).json({
        message:"Account created successfully",
        success:true
    });
    } catch (error) {
        res.status(5000).json({error:error.message})
        console.log(error);
    }
}

export const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message:"Missing Credentials",
                success:false
            });
        }
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Incorrect email or password",
                success:false
            })
        };
        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) return res.status(400).json({ error: 'Incorrect email or password' });
        const tokenData = {
            userId:user._id
        }
        const token = await jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:'1d'});
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message:'Failed to login',
            success:false
        })
        console.log(error);
    }
}