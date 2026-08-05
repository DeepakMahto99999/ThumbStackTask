import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";


/**
 *  - user register controller
 *  - POST /api/auth/register
 */
export const userRegisterController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const isExists = await userModel.findOne({ email });

        if (isExists) {
            return res.status(409).json({
                status: "failed",
                message: "User already exists.",
            });
        }

        const user = await userModel.create({
            name,
            email,
            password,
        });

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            status: "success",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: error.message,
        });
    }
};


/**
 *  - user login controller
 *  - POST /api/auth/login
 */
export const userLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                status: "failed",
                message: "Email or password is invalid.",
            });
        }

        const isValidPassword = await user.comparePassword(password);

        if (!isValidPassword) {
            return res.status(401).json({
                status: "failed",
                message: "Email or password is invalid.",
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "3d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            status: "success",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: error.message,
        });
    }
};