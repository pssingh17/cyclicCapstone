const {express} = require('../configuration/server')
const projectMethods = require('../service/projectService')
const  {check,validationResult} = require('express-validator') 
const Response = require('../service/customResponse')
const FileType = require('../service/staticData/FileType')
const StatusType = require('../service/staticData/StatusType')

const projectRoute = express.Router()

projectRoute.all('*',(req,res,next)=>{
    return req.isAuthenticated() ?
    next() :  
    res.status(401).json({status:"FAILURE",message:"Please LogIn.",isLoggedIn:false})
})


projectRoute.post('/save',[
    check("project_type","Field Required").notEmpty(),
    check("project_name","Field Required").notEmpty(),
    check("client_ready","Field Required").isDate(),
    check("completion","Field Required").isDate(),
    check("start_date","Field Required").isDate(),
    check("end_date","Field Required").isDate(),
    check("receiving_customer","Field Required").notEmpty(),
    check("transacting_customer","Field Required").notEmpty()
],async (req,res)=>{
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json((new Response(400,"FAILURE","Validation Errors",{ errors: errors.array() })).getSuccessObject());
      }
      return await projectMethods.saveProject(req.user.userId,req.body,res)
})

projectRoute.get('/',async (req,res)=> {
   const {name} = req.query
   return await projectMethods.getProjectsByName(req.user.userId,name,res)
})

projectRoute.get('/search',async(req,res)=>{
    return await projectMethods.getManufactureOrProjectInfo(req,res)
})

projectRoute.get('/:id',async (req,res)=>{
    return await projectMethods.getAllProjectInformation(req,res)
})

projectRoute.get('/notification/engineer',async (req,res)=>{
    return await projectMethods.getNotificationsForTheEngineer(req,res)
})

projectRoute.get('/status/types',async(req,res)=>{
     return res.json((new Response(200,"SUCCESS","Status Types",await FileType.getFileTypes())).getSuccessObject())
})

projectRoute.get('/document/types',async (req,res)=>{
    return res.json((new Response(200,"SUCCESS","Status Types",await StatusType.getAllStatusTypes())).getSuccessObject())
})

module.exports = projectRoute