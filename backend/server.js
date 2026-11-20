require("dotenv").config();
const connectDB = require("./src/db/db");
const express = require("express");
const playlistmodel = require("./src/model/note.model");
const playlistRoutes = require("./src/routes/playlistmodel.routes")
const requestlogger = require("./src/middleware/logger.midddle")
// const validaterequest = require("./src/middleware/inputvalidate.middleware") //ucan use inputvalidate middleware here also and also in routes
const errorhandling = require("./src/middleware/errorhandling.middleware")
const cors = require("cors")

const app = express();

//sequence of app.use matters 
app.use(express.json());
app.use(cors({                //This allows your local React frontend to access your backend.
    origin: "localhost:1573"
}))
app.use(requestlogger);
// app.use(validaterequest);
app.use("/api/playlists", playlistRoutes);
app.use(errorhandling)

const PORT = process.env.PORT || 5000;
// app.post("/api/playlists", async (req, res) => {
//     const data1 = req.body
//     const data2 = req.body
//     const data3 = req.body
//     const data4 = req.body

//     await playlistmodel.create({
//         title: data1.title,
//         description: data2.description,
//         image: data3.image,
//         song: data4.song
//     })

//     res.status(201).json({
//         message: "Playlist saved successfully"
//     })
// })

// Start server after connecting to MongoDB
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
