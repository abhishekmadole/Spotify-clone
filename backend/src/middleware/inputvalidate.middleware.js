const validaterequest = (req, res, next) => {

    const {title, description } = req.body

    if(!title && !title.trim()){
        res.status(400).json({
            success: false,
            message: "Please provide title"
        })
        console.log("Above request failed due to invalid input")
    }

    if(!description && !description.trim()){
        res.status(400).json({
            success: false,
            message: "Please provide description"
        })
        console.log("Above request failed due to invalid input")
    }

    next();
}

module.exports = validaterequest