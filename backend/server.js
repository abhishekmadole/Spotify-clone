require("dotenv").config();
const connectDB = require("./src/db/db");
const express = require("express");
const playlistmodel = require("./src/model/note.model");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

// POST API
app.post("/api/playlists", async (req, res) => {
    try {
        const { title, description, image, song } = req.body;

        const newPlaylist = await playlistmodel.create({
            title,
            description,
            image,
            song
        });

        res.status(201).json({
            success: true,
            message: "Playlist saved successfully in MongoDB",
            data: newPlaylist
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

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

app.get("/api/playlists", async (req, res) => {

    try{
        const playlists = await playlistmodel.find()
        
        res.status(200).json({
            message: "playlists fetch successfully ",
            count: playlists.length,
            playlists: playlists
        })
    }catch(error){
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
})

app.get("/api/playlists/:id", async (req, res) => {
    try{
        const newplaylist = await playlistmodel.findById(req.params.id)

        res.status(200).json({
            success: true,
            newplaylist: newplaylist
        })
    }catch(error){
            res.status(400).json({
            success: false,
            message: error.message
        })
    }
})


app.put("/api/playlists/:id", async (req, res) => {
    try {
        const updatedPlaylist = await playlistmodel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedPlaylist) {
            return res.status(404).json({
                success: false,
                message: "Playlist not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Playlist updated successfully",
            data: updatedPlaylist
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});


app.put("/api/playlists/:id", async (req, res) => {
    try{
        const data = req.body

        upadatedplaylist = await playlistmodel.findByIdAndUpdate({_id: req.params.id}, {title: data.title})

        res.status(200).json({
            success: true,
            message : "palylist updated in mongodb successfully",
            upadatedplaylist: upadatedplaylist
        })
    }catch(error){
        res.status(400),json({
            success: false,
            message: error.message
        })
    }
})


app.delete("/api/playlists/:id", async (req, res) => {
    try {
        const deletedPlaylist = await playlistmodel.findByIdAndDelete(
            req.params.id
        );

        if (!deletedPlaylist) {
            return res.status(404).json({
                success: false,
                message: "Playlist not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Playlist deleted successfully",
            data: deletedPlaylist
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});


// Start server after connecting to MongoDB
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
