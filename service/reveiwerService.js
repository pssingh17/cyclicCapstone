const reviewerDao = require('../database/reveiwerDao')
const Response = require('../service/customResponse')

async function getReveiwerProjectsByName(req,res){
     const {name} = req.query
     if(!name){
        return res.json((new Response(400,"FAILURE","name field required in request query.",null)).getErrorObject())
     }
     const response = await reviewerDao.getReveiwerProjectsByName(req.user.userId,name,req)
     return createResponse(response,res)
}

async function searchForReveiwer(req,res){
   const response = await reviewerDao.searchForReveiwer(req)
   return createResponse(response,res)
}

async function getReviwerNotifications(req,res){
    const response = await reviewerDao.getReviwerNotifications(req.user.userId,req)
    return createResponse(response,res)
}

async function getReveiwerWorkStatus(req,res){
    const response = await reviewerDao.getReveiwerWorkStatus(req.user.userId,req)
    return createResponse(response,res)
}

function createResponse(response,res){
    if(response.getStatusCode() !== 200){
        return res.status(response.getStatusCode()).json(response.getErrorObject())
    }
    return res.json(response.getSuccessObject())
} 

module.exports = {getReveiwerProjectsByName,searchForReveiwer,getReviwerNotifications,getReveiwerWorkStatus}