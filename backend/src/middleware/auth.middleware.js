const jwt = require("jsonwebtoken")

const authenticateUser = (req, res, next) => {
    // Extract the JWT token
    const authHeader = req.headers.authorization;

//     console.log(
//     "Bearer format:",
//     authHeader.startsWith("Bearer ")
// );

    // console.log("Authorization header: ", !!authHeader)

    //Validate the header
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            success: false,
            message: "Access denied. No token provided."
        });
    }

    //Extract the actual token
    const token = authHeader.split(" ")[1];

try {
    //Verify the JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("JWT verification successful:", !!decoded);
    req.user = decoded;
}catch(error) {
     console.log("JWT verification error:", error.message);
    return res.status(401).json({
        success: false,
        message: "Invalid or expired token"
    })
  }

  next();
}

module.exports = authenticateUser;