import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const proctedRoute = async (req, res, next) => {
    try {
        console.log("TOKEN RECEIVED:", req.headers["token"]);  // <-- DEBUG

        const token = req.headers["token"];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("Auth error:", error);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};
