const requestlogger = (req, res, next) => {
    
    console.log(`${req.method} ${req.originalUrl}`);

    next();//Without next(), this middleware neither sends a response nor passes control forward. Your request would remain pending.

};

module.exports = requestlogger;