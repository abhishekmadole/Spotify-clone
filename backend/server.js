require("dotenv").config();

const connectDB = require("./config/db");

const express = require("express"); //Imports express
// require("dotenv").config();

// const connectDB = require("./config/db");

const app = express(); //Creates an Express application

// const PORT = 5000;//Defines a get route

//test route 
// app.get("/api/health", (req, res) => {    //req:-  Incoming request   res:- Response sent back
//     res.json({
//         success : true,
//        message : "Spotify API is working!" 
//     });
// });

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

//start server
// app.listen(PORT, () => {     //starts the server
//     console.log(`server is running on port ${PORT}`);
// });
