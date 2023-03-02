const project = require('../models/Report')
const document = require('../models/Document')
const reviewStandardsMapping = require('../models/ReviewStandardsMapping')
const reportDao = require('../database/reportDao')
const userDao = require('../database/userDao')
const Response = require('../service/customResponse')
const sequelize = require('../database/DBConnection')
const azureStorage = require('../service/AzureStorage')
const BadRequestError = require('../service/errors/BadRequestError')
const reportStatus = require('../models/ReportStatus')
const fs = require('fs')
const IllegalStateError = require('./errors/IllegalStateError')


async function saveReport(req,res){

    const {hasReport=false, hasCertificate = false} = req.body

    try{

      const result  = await sequelize.transaction(async (t1)=>{
            const userId = req.user.userId
            const {receiving_customer,reviewer_id} = req.body

            const receivingPerson = await userDao.getUserById(receiving_customer)
            if(!receivingPerson){
                throw new BadRequestError('Receiving Person is not a registered user.')
            }
            const reviewerPerson = await userDao.getUserById(reviewer_id) // check if the person is a reviewer or not
            if(!reviewerPerson){
                throw new BadRequestError('Reviewer Person is not a registered user.')
            }

            const response = await reportDao.saveReport(req.body,userId)

            console.log(response)
        
            if(response.getStatusCode() === 200){

                if((hasReport && !req.files['report']) || (hasCertificate && !req.files['certificate'])){

                    console.log("File's submission is not correct hasReport " + hasReport + " report " + req.files['report']
                    + " hasCertificate " + hasCertificate + " certificate  " + req.files['certificate']) 

                    throw new BadRequestError('Missing files report/certificate. Either File size is too large , or incorrect extension or file is not added in the request.')
                }

                const containerName = (response.result.id).toLowerCase()
                const files = {
                    "report" : hasReport,
                    "certificate" : hasCertificate
                }
                const containerClient  = await azureStorage.createContainer(containerName)

                Object.keys(files).map(async (key) => {
                    
                    if(files[key]){
                        const blobName = containerName+"_" +key
                        await azureStorage.uploadBlob(req.files[key][0],containerName,blobName,containerClient)
                        const docResponse = await reportDao.saveDocument(userId,response.result.id,key,blobName,req.files[key][0].originalname)
                        if(docResponse.getStatusCode() !== 200){
                            throw new IllegalStateError("Unknown error occured")
                        }
                    }
                })

            }else{
                console.log("Report could not be saved for creator with id " + userId)
                throw new IllegalStateError('Unknown new error occured.')
            }

            return {report_number : response.result.id}

      })
       console.log("Outside of the transaction.")
      // azureStorage.deleteContainer((result.report_number).toLowerCase())
       return res.json((new Response(200,"SUCCESS",`Report created successfully with id ${result.report_number}`,{
        id : result.report_number
      })).getSuccessObject())

    }catch(error){

        console.log("ReportService || Error in saving report : " + error)

        if(error instanceof BadRequestError){
             return res.status(400).json((new Response(error.statusCode,error.status,error.message,null)).getErrorObject())
        }
    
        return res.json(( new Response(500,"FAILURE",`Unknown error occured.`,"")).getErrorObject())
    }
}

async function getReportsWithStatusCount(res){
   const response = await reportDao.getReportsWithStatusCount()
   return createResponse(response,res)
}

function createResponse(response,res){
    if(response.getStatusCode() !== 200){
        return res.status(response.getStatusCode()).json(response.getErrorObject())
    }

    return res.json(response.getSuccessObject())
} 

module.exports = {saveReport,getReportsWithStatusCount}







