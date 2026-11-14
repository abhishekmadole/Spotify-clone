const express = require("express")

const router = express.Router();

const { createPlaylist, getallplaylist, getplaylistbyid, upadteplaylistbyid, deleteplaylistbyid, searchplaylist, sortoptions, sortrecently, pagination } = require("../controllers/playlistmodel.controller")

//satatic routes
router.post("/", createPlaylist)
router.get("/", getallplaylist)
router.get("/query/search", searchplaylist)
router.get("/recently/sort", sortrecently)
router.get("/options/order", sortoptions)
router.get("/page", pagination)
//dynamic route
router.get("/:id", getplaylistbyid)
router.get("/:id", getplaylistbyid)
router.put("/:id", upadteplaylistbyid)
router.delete("/:id", deleteplaylistbyid)

module.exports = router