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
const { dirname } = require('path')
const appDir = dirname(require.main.filename)
const path = require('path')


async function saveReport(req,res){

    const {hasReport=false, hasCertificate = false,report_type,certificate_type} = req.body

    try{

      const result  = await sequelize.transaction(async (t1)=>{
            const userId = req.user.userId
            console.log('userid ' + userId)
            const {receiving_customer,reviewer_id} = req.body

            const receivingPerson = await userDao.getUserById(receiving_customer)
            if(!receivingPerson){
                throw new BadRequestError('Receiving Person is not a registered user.')
            }
            const reviewerPerson = await userDao.getUserById(reviewer_id) // check if the person is a reviewer or not
            if(!reviewerPerson){
                throw new BadRequestError('Reviewer Person is not a registered user.')
            }
                                                                  
            if( !verifyDocumentsStatus(hasReport,req.files['report'],report_type) || !verifyDocumentsStatus(hasCertificate,req.files['certificate'],certificate_type)){

                console.log("File's submission is not correct hasReport " + hasReport + " report " + req.files['report']
                + " hasCertificate " + hasCertificate + " certificate  " + req.files['certificate']) 

                throw new BadRequestError('Missing files report/certificate. Either File size is too large , or incorrect extension or file is not added in the request.')
            }

            const response = await reportDao.saveReport(req.body,userId,(hasReport || hasCertificate))

            console.log(response)
        
            if(response.getStatusCode() === 200){
               
                const containerName = (response.data.id).toLowerCase()
                const files = {
                    "report" : hasReport,
                    "certificate" : hasCertificate
                }
                let containerClient = null

                if(hasReport || hasCertificate){
                    containerClient =  await azureStorage.createContainer(containerName)
                }

                Object.keys(files).map(async (key) => {
                    
                    if(files[key]){
                        const blobName = containerName+"_" +key
                        await azureStorage.uploadBlob(req.files[key][0],containerName,blobName,containerClient)
                        const docResponse = await reportDao.saveDocument(userId,response.data.id,key,blobName,req.files[key][0].originalname,key.toLowerCase()==="report"?report_type:certificate_type)
                        if(docResponse.getStatusCode() !== 200){
                                    if(req.files['report']){
                                        deleteFilesFromLocal(req.files['report'][0].path)
                                    }
                        
                                    if(req.files['certificate']){
                                         deleteFilesFromLocal(req.files['certificate'][0].path)
                                    }
                            throw new IllegalStateError("Unknown error occured")
                        }
                    }
                })

            }else{
                console.log("Report could not be saved for creator with id " + userId)
                            if(req.files['report']){
                                deleteFilesFromLocal(req.files['report'][0].path)
                            }
                
                            if(req.files['certificate']){
                                deleteFilesFromLocal(req.files['certificate'][0].path)
                            }
                throw new IllegalStateError('Unknown new error occured.')
            }

            return {report_number : response.data.id}

      })
      
       console.log("Outside of the transaction.")
       return res.json((new Response(200,"SUCCESS",`Report created successfully with id ${result.report_number}`,{
        id : result.report_number
      })).getSuccessObject())

    }catch(error){

        console.log("ReportService || Error in saving report : " + error)
        console.log(error)

        if(req.files['report']){
            deleteFilesFromLocal(req.files['report'][0].path)
        }

        if(req.files['certificate']){
            deleteFilesFromLocal(req.files['certificate'][0].path)
        }

        if(error instanceof BadRequestError){
             return res.status(400).json((new Response(error.statusCode,error.status,error.message,null)).getErrorObject())
        }
        
        return res.json(( new Response(500,"FAILURE",`Unknown error occured.`,"")).getErrorObject())
    }
}

function verifyDocumentsStatus(isPresent,file,type){

    let docStatus = false

    if(isPresent){
             if(file && type){
                  docStatus = true
             }else{
                docStatus = false
             }
    }else{
        docStatus = true
    }
    
    return docStatus
}


async function getReportsWithStatusCount(res){
   const response = await reportDao.getReportsWithStatusCount()
   return createResponse(response,res)
}


async function downloadDocumentRelatedToReport(fileId,res){
    
    const response = await reportDao.getDocumentBasedOnFileId(fileId)
    if(response.getStatusCode() !== 200){
        return res.json(response.getErrorObject())
    }
    
    if(!response.getData()){
        return res.json((new Response(400,"FAILURE","Invalid fileId. No data exist.",null)).getErrorObject())
    }

    const report = response.data
    const containerName = (report.report_id).toLowerCase()
    const blobName = report.storage_file_name
    const fileName = blobName+report.original_file_name
    const filePath = path.join(appDir,'/downloads',`/${fileName}`)
    await azureStorage.downloadBlob(containerName,blobName,filePath)
    setTimeout(()=>{
          deleteFilesFromLocal(filePath)
    },10000)
    return res.download(filePath)
}


async function deleteFilesFromLocal(path){
    fs.unlink(path,(err)=>{
        console.log("Deleting uploaded file from local storage.")
        if(err){
          console.log("Error in deleting file from local storage " + err)
        }
      })
}

function createResponse(response,res){
    if(response.getStatusCode() !== 200){
        return res.status(response.getStatusCode()).json(response.getErrorObject())
    }

    return res.json(response.getSuccessObject())
} 

module.exports = {saveReport,getReportsWithStatusCount,deleteFilesFromLocal,downloadDocumentRelatedToReport}







