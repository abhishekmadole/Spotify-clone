const express = require("express")
const validaterequest = require("../middleware/inputvalidate.middleware")

const router = express.Router();

const { createPlaylist, getallplaylist, getplaylistbyid, upadteplaylistbyid, deleteplaylistbyid, searchplaylist, sortoptions, sortrecently, pagination } = require("../controllers/playlistmodel.controller")

//general routes
router.post("/", validaterequest, createPlaylist)
router.get("/", getallplaylist)

//static routes
router.get("/query/search", searchplaylist)
router.get("/recently/sort", sortrecently)
router.get("/options/order", sortoptions)
router.get("/page", pagination)
router.get("/test-case", (req, res, next) => {

    const err = new Error("This is an error!!")

    err.statusCode =400

    next(err)

})

//dynamic route
router.get("/:id", getplaylistbyid)
router.get("/:id", getplaylistbyid)
router.put("/:id", upadteplaylistbyid)
router.delete("/:id", deleteplaylistbyid)

module.exports = router