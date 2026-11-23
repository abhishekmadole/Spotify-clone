const express = require("express")
const authenticator = require("../middleware/auth.middleware")

const Router = express.Router()

const {userdetails, loginuser} = require("../controllers/usermodel.controller")
const usermodel = require("../model/auth.model")

Router.post("/register", userdetails)
Router.post("/login", loginuser)
Router.get("/profile", authenticator, async (req, res) => {
    try {
        const user = await usermodel.findById(req.user.userId).select("-password");
        console.log("Decoded user ID:", req.user.userId);
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            user
        })
    } catch(error) {

         console.error("Profile API error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
})

module.exports = Router