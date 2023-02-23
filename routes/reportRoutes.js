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

reportRoute.all('*',(req,res,next)=>{
     return req.isAuthenticated() ?
     next() :  
     res.status(401).json({status:"FAILURE",message:"Please LogIn.",isLoggedIn:false})
})

reportRoute.get('/',async (req,res)=> {
      return await reportService.getReportsWithStatusCount(res)
})

reportRoute.post('/',reportUpload,async (req,res)=>{ 
      return await reportService.saveReport(req,res)
})

module.exports = reportRoute