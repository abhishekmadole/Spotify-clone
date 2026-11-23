const usermodel = require("../model/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userdetails = async (req, res) => {
    try{
        const {username, email, password} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All feilds are required!!"
            })
        }
        
        const existingUser = await usermodel.findOne({email})

        if(existingUser){
            return res.status(409).json({
                success: false,
                message: "Email already registered!!"
            })
        }

        const hashedpassword = await bcrypt.hash(password,10)
        //bcrypt.hash() accepts two arguments:
        //Argument	Meaning
        //password	Original password received from the user
        //10	Salt rounds (cost factor)

        const newuser = await usermodel.create({
            username,
            email,
            password: hashedpassword
        })

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newuser._id,
                username: newuser.username,
                email: newuser.email
            }
        })
    } catch(error) {

        if(error.code === 11000){
            return res.status(409).json({
                success: true,
                message: "email already registered!!"
            })
        }

        console.error("Registeration  error: ",error.message)

        return res.status(500).json({
            success: false,
            message : error.message
        })
    }
}

const loginuser = async (req, res) => {
    try {
        //1. Taking login credentials from user
        const {email, password} = req.body

        //Validating if user sent invalid credentials
        if(!email || !password){
            return res.status(409).json({
                success: false,
                message: "Invalid creadentials"
            })
        }

    
        const userexists = await usermodel.findOne({email}).select("+password");
        // const userexists = await usermodel.findOne({email})
        //checked for thus userexists and his password exists or not
        // console.log("User found:", !!userexists);
        // console.log("Password hash exists:", !!userexists?.password);

        if(!userexists){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }
        // console.time("bcrypt comparison");
        const isPasswordValid = await bcrypt.compare(
            password,
            userexists.password
        );
        console.log("Bcrypt cost:", userexists.password.split("$")[2]);
        console.timeEnd("bcrypt comparison");
        console.log(
    "Is bcrypt hash:",
    /^\$2[aby]\$/.test(userexists.password)
);
        console.log("Password received:", typeof password);
        console.log("Password is empty:", !password);
        console.log("Hash received:", typeof userexists.password);

        if(!isPasswordValid){
            return res.status(401).json({
                success: true,
                message: "Invalid email or password"
            })
        }

        const token = jwt.sign(
            {userid: userexists._id},
            process.env.JWT_SECRET,
            { expiresIn: "1d"}
        )
        // console.log("type of userid",typeof userid)
        return res.status(201).json({
            success: true,
            message: "Login Successfully!!",
            userexists: {
                id: userexists._id,
                username: userexists.username,
                email: userexists.email
            }
        })
    } catch(error){
        console.error("login error: ",error.stack)

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {userdetails, loginuser}