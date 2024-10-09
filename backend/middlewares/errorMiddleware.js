const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";

    console.error(`Error: ${message}`);
    return res.status(status).json({
        success: false,
        status,
        message,
    });
};

module.exports = errorMiddleware;
