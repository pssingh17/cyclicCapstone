const {express,upload,multer, app} = require('../configuration/server')
const fs = require('fs')
const reportService = require('../service/reportService')
const azureStorage = require('../service/AzureStorage')
const {dirname}  = require('path')
const path  = require('path')
const appDir = dirname(require.main.filename)



const reportRoute = express.Router()
const reportUpload = upload.fields([{name:'report',maxCount:1},{name:'certificate',maxCount:1}])



reportRoute.post('/',reportUpload,async (req,res)=>{
       console.log(req.files['report'][0])  
       await azureStorage.uploadBlob(req.files['report'][0],"dummy3","report-01")
       await azureStorage.downloadBlob(path.join(appDir,'/downloads/name.docx'),"dummy3","report-01")
       //fs.unlinkSync(req.files['report'][0].path)
       await azureStorage.deleteContainer("dummy3")
    //    res.download(req.files['report'][0].path,(err)=>{
    //        if(err){
    //         console.log(err)
    //        }
    //    })
    res.json("HOPE")
})

module.exports = reportRoute