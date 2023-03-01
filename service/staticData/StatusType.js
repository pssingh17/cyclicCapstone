const statusType = require('../../models/ReportStatus')

class StatusType{

    static reportStatusType = null
    static statusTypeOmitForEngineer = 4

    static async getAllStatusTypes(){
        if(!this.reportStatusType){
            this.reportStatusType = statusType.findAll({raw:true})
        }
       return this.reportStatusType
    }

    static async getEngineerNotificationStatusTypes(){
        const statusTypes = await this.getAllStatusTypes()
        console.log(statusTypes)
        return statusTypes.map((st) => st.id).filter((id) => id!==this.statusTypeOmitForEngineer)
    }
}

module.exports = StatusType