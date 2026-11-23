const express = require("express")

const Router = express.Router()

const {userdetails, loginuser} = require("../controllers/usermodel.controller")

Router.post("/register", userdetails)
Router.post("/login", loginuser)

module.exports = Router