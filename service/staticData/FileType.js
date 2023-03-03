const document_type = require('../../models/DocumentType')

class FileType{

    static file_types = null

    static async getFileTypes(){

        if(!this.file_types){
            console.log("Fetching File types from the database.")
            this.file_types = await document_type.findAll({raw:true})
        }
        return this.file_types;
    }
}

module.exports = FileType