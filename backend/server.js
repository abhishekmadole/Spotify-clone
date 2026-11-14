require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express"); //Imports express

const app = express(); 

app.use(express.json());

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});



