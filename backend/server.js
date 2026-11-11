const express = require("express"); //Imports express

const app = express(); //Creates an Express application

const PORT = 5000;//Defines a get route

//test route 
app.get("/api/health", (req, res) => {    //req:-  Incoming request   res:- Response sent back
    res.json({
        success : true,
       message : "Spotify API is working!" 
    });
});

//start server
app.listen(PORT, () => {     //starts the server
    console.log(`server is running on port ${PORT}`);
});
