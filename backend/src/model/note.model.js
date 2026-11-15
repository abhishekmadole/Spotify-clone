const mongoose = require("mongoose")

const playlistschema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    image:  {
        type: String
    },

    song: {
        type: String
    }
},{
    timestamps: true
});

const playlistmodel = mongoose.model("playistmodel", playlistschema);

module.exports = playlistmodel;