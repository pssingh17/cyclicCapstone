class Response{
    constructor(statusCode,status,message,result){
        this.status = status ? status : 'SUCCESS'
        this.message = message ? message : ''
        this.result = result ? result : ''
        this.statusCode = statusCode ? parseInt(statusCode) : 200
    }
    

    getStatusCode(){
        return this.statusCode
    }

    getStatus(){
        return this.status
    }

    getMessage(){
        return this.message
    }

    getResult(){
        return this.result
    }

    getSuccessObject(){
        return {
            statusCode:this.statusCode,
            status : this.status,
            message : this.message,
            data : this.result
        }
    }

    getErrorObject(){
        return {
            statusCode:this.statusCode,
            status : this.status,
            message : this.message
        }
    }

}

module.exports = Response