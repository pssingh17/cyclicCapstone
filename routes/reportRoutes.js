const {express,upload,multer, app} = require('../configuration/server')
const fs = require('fs')
const reportService = require('../service/reportService')
const azureStorage = require('../service/AzureStorage')
const {dirname}  = require('path')
const path  = require('path')
const appDir = dirname(require.main.filename)
const reportStatus = require('../models/ReportStatus')



const reportRoute = express.Router()
const reportUpload = upload.fields([{name:'report',maxCount:1},{name:'certificate',maxCount:1}])
const editUpload = upload.single('file')

reportRoute.all('*',(req,res,next)=>{
     return req.isAuthenticated() ?
     next() :  
     res.status(401).json({status:"FAILURE",message:"Please LogIn.",isLoggedIn:false})
})

function isEngineer(req,res,next){
      return req.user.is_engineer?
             next():
             res.json((new Response(200,"FAILURE","Person Signed in, is not an engineer.",null).getErrorObject()))
  }
  
reportRoute.get('/',async (req,res)=> {
      return await reportService.getReportsWithStatusCount(req,res)
})

reportRoute.post('/',reportUpload,isEngineer,async (req,res)=>{ 
      console.log(req.files['report'])
      return await reportService.saveReport(req,res)
})

reportRoute.get('/download/:fileId',async(req,res)=>{
      return await reportService.downloadDocumentRelatedToReport(req.params.fileId,res)
})

reportRoute.put('/upload',editUpload,async(req,res)=>{
       return await reportService.updateDocument(req,res)
})

reportRoute.put('/delete',async (req,res)=>{
      return await reportService.deleteDocument(req,res)
})


module.exports = reportRoute

// decision
// report_id

// comments

// deleteBlob  ==> fileId(delete),reportId // if file count 0 
//                                          delete the container/update documents_uploaded=false in reports table
//                                   else
//                                          delete the blob

// updateBlob ==> fileId,subType==>blob(update)
 