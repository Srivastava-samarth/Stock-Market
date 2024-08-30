import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/userModel.js';

dotenv.config();

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Ensure that the token is coming from cookies
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Synchronously verify token
        if (!decoded || !decoded.userId) {
            return res.status(401).json({
                message: "Invalid Token",
                success: false
            });
        }

        // Optionally, you can retrieve the full user details from the database if needed
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        req.user = user;  // Attach the user object to the request
        req.id = decoded.userId;  // Attach the userId to the request

        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Authentication failed",
            success: false
        });
    }
}

export default isAuthenticated;
