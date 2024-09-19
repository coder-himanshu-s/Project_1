class ExpressError extends Error {
    constructor(statusCode, message) {  // use statusCode with uppercase C here
        super();
        this.statusCode = statusCode;   // keep this uppercase too
        this.message = message;
    }
}

module.exports = ExpressError;
