const playlistmodel = require("../model/note.model")

const createPlaylist = async (req, res) => {
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
}

const getallplaylist = async (req, res) => {

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
}

const getplaylistbyid = async (req, res) => {
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
}

const upadteplaylistbyid = async (req, res) => {
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
}

const deleteplaylistbyid =  async (req, res) => {
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
}

const searchplaylist =  async (req, res) => {
    try {
        const search = req.query.search;

        if(!search || !search.trim()){
            res.status(400).json({
                success: false,
                message: "Please provide valid search!!"
            })
        }

        const playlist = await playlistmodel.find({
            title: {
                $regex: search,
                $options: "i"
            }
    })

        res.status(200).json({
            success: true,
            count: playlist.length,
            data: playlist
        })
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

const sortrecently =  async (req, res) => {
    try{
        const playlist = await playlistmodel.find().sort({ createdAt : -1 });

        res.status(200).json({
            success : true,
            message : "sorted by recent condition successfully",
            data: playlist
        })
    } catch (error) {
        res.status(400).json({
        success: false,
        message : error.message 
        })
    }
}

const sortoptions =  async (req, res) => {
    try{
        const order = req.query.order || "newest"

        const sortOptions= {
            newest: { createdAt: -1},
            oldest: { createdAt: 1},
            az: { title: 1},
            za: { title: -1}
        }

        if(!sortOptions[order]) {
            return res.status(400).json({
                success: false,
                message: "Please provide valid sorting options"
            })
        }

        const playlist = await playlistmodel.find().sort(sortOptions[order])

        res.status(200).json({
            success: true,
            message: "Sorted succcessfully",
            data: playlist
        })
    } catch(error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const pagination = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        if (page < 1 || limit < 1 || limit > 50) {
            return res.status(400).json({
                success: false,
                message: "Invalid page or limit"
            });
        }

        const skip = (page - 1) * limit;

        const playlists = await playlistmodel
            .find()
            .skip(skip)
            .limit(limit);

        const totalPlaylists = await playlistmodel.countDocuments();

        res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(totalPlaylists / limit),
            totalPlaylists,
            data: playlists
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { createPlaylist, getallplaylist,
    getplaylistbyid, upadteplaylistbyid,
    deleteplaylistbyid, searchplaylist,
    sortrecently, sortoptions,
    pagination }
