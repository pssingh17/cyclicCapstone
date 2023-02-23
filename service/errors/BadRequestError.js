class BadRequestError extends Error{
    constructor(message){
        super(message)
        this.statusCode=400
        this.status = "SUCCESS"
    }
}

module.exports = BadRequestError