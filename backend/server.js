require("dotenv").config();
const connectDB = require("./src/db/db");
const express = require("express");
const playlistmodel = require("./src/model/note.model");
const playlistRoutes = require("./src/routes/playlistmodel.routes")

const app = express();

app.use(express.json());
app.use("/api/playlists", playlistRoutes);

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
