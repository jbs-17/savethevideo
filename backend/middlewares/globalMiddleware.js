const globalMiddleware = (req, res, next) => {
    res.info = {
        code: null,
        message: null
    };

    next();
};

export { globalMiddleware };
