const projectDao = require('../database/projectDao')
const userDao = require('../database/userDao')
const reportDao = require('../database/reportDao')
const Response = require('./customResponse')


async function saveProject(userId,body,res){
    const response = await projectDao.saveProject(userId,body)
     return createResponse(response,res)
}

async function getProjectsByName(userId,name,res){     
    if(!name){
        return res.status(400).json((new Response(400,"SUCCESS","name field missing in req query params.",null).getErrorObject()))
    }
    const response = await projectDao.getProjectByName(name,null,userId)
    return createResponse(response,res)
}

async function getManufactureOrProjectInfo(req,res){

    const {projectId,reportId,name,id} = req.query

     console.log("Search API being called with " + req.query)

    if(!projectId && !reportId && !name && !id){
        return res.status(400).json((new Response(400,"SUCCESS","projectId or reportId or name or id fields missing in req query params.",null).getErrorObject()))
    }

    let response;

    console.log("Get Request getManufactureOrProjectInfo ==> " + JSON.stringify(req.query))

    if(projectId){
        response = await projectDao.getProjectByName(null,projectId,req.user.userId)
        return createResponse(response,res)
    }

    if(reportId){
        response = await reportDao.getProjectLinkedToReports(reportId,req.user.userId)
        return createResponse(response,res)
    }

    if(name || id){
        response = await userDao.getProjectByManufactureNameOrId(name,id)
        return createResponse(response,res)
    }
}

function createResponse(response,res){
    if(response.getStatusCode() !== 200){
        return res.status(response.getStatusCode()).json(response.getErrorObject())
    }

    return res.json(response.getSuccessObject())
} 

module.exports = {saveProject,getProjectsByName,getManufactureOrProjectInfo}