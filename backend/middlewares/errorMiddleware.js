const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";

    console.log(err.status, err.message);
    return res.status(status).json({
        status: status !== 200 ? false : true,
        message
    });
}

module.exports = errorMiddleware;