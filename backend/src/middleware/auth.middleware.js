import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
     console.log("========== AUTH MIDDLEWARE ==========");
    console.log("Cookies:", req.cookies);
    console.log("Authorization:", req.headers.authorization); 

    const token =
        req.cookies?.token ||
        req.headers.authorization?.split(" ")[1];

         console.log("Token:", token);

    if (!token) {
        return res.status(401).json({
            status: "failed",
            message: "Unauthorized access. Token is missing.",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded:", decoded);

        const user = await userModel.findById(decoded.userId);

        console.log("User:", user);

        if (!user) {
            return res.status(401).json({
                status: "failed",
                message: "User not found.",
            });
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            status: "failed",
            message: "Invalid or expired token.",
        });
    }
};