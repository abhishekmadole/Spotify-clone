//next	Passes error to another error handler if needed

const errorhandling = (err, req, res, next) => {  //Important: Express identifies error-handling middleware by its four parameters, in this order.

    console.error(err.stack);  

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal server error"
    })

}

module.exports = errorhandling