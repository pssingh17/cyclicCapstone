const project = require('../models/Project')
const report = require('../models/Report')
const Response = require('../service/customResponse')
const {Op} = require('sequelize') 
const { QueryTypes } = require('sequelize');
const sequelize = require('../database/DBConnection')

async function getReveiwerProjectsByName(userId,name,req){

    console.log("Reveiwer Id is : " + userId)
    const {limit,offset} = getLimitAndOffset(req)
    try{
        let query = `SELECT distinct(p.project_number), p.project_name FROM project_info p INNER JOIN report r ON 
        p.project_number = r.project_number AND r.reviewer_id = ? WHERE (p.project_name LIKE ? OR 
        p.project_name LIKE ? OR p.project_name LIKE ?) limit ? offset ?`

        const result = await sequelize.query(query,{
            replacements:[userId,`%${name}`,`%${name}%`,`${name}%`,limit,offset],
            raw:false,
            type:QueryTypes.SELECT
        })

        console.log(result)

        return new Response(200,"SUCCESS",`Projects related to reveviwer ${userId}`,result)

    }catch(error){
         console.log("Error in getting project names for the reveviewer ==> " + error)
         return new Response(500,"FAILURE",`Unknown error occured.`,null)
    }
}

async function searchForReveiwer(req){

    const {projectId,reportId,name,id} = req.query
    const {limit,offset} = getLimitAndOffset(req)
    const userId = req.user.userId
     
    try{
       let query=null
       let replacements=null
       if(projectId){
         query=`SELECT distinct(p.project_number), p.project_name FROM project_info p INNER JOIN report r ON 
         p.project_number = r.project_number AND r.reviewer_id = ? WHERE (p.project_number LIKE ? OR 
         p.project_number LIKE ? OR p.project_number LIKE ?) limit ? offset ?`
         replacements=[userId,`%${projectId}`,`%${projectId}%`,`${projectId}%`,limit,offset]
       }else if(reportId){
        query=`SELECT distinct(p.project_number), p.project_name FROM project_info p INNER JOIN report r ON 
        p.project_number = r.project_number AND r.reviewer_id = ? WHERE (r.report_number LIKE ? OR 
        r.report_number LIKE ? OR r.report_number LIKE ?) limit ? offset ?`
        replacements=[userId,`%${reportId}`,`%${reportId}%`,`${reportId}%`,limit,offset]
       }else if(name || id){
        query=`select distinct(p.project_number), p.project_name from project_info p inner join manufacturer m on 
        p.transacting_customer=m.id inner join report r on p.project_number = r.project_number where (
        r.reviewer_id = ? and  (m.name like ? or m.name like ? or m.name like ? or m.id like ? or
        m.id like ? or m.id like ?)) limit ? offset ?`
        replacements=[userId,`%${name}`,`%${name}%`,`${name}%`,`%${id}`,`%${id}%`,`${id}%`,limit,offset]
       }else{
        return new Response(400,"FAILURE","projectId,reportId,name or id required in request query",null)
       }

       const result = await sequelize.query(query,{
              replacements:replacements,
              raw:true,
              type:QueryTypes.SELECT
       })

       return new Response(200,"SUCCESS","Search Result",result)
    }catch(error){
        console.log("Error in search api for the reveiwer ==> ",error)
        return new Response(500,"FAILURE",`Unknown error occured.`,null)
    }
}

async function getReviwerNotifications(userId,req){

    const {limit,offset} = getLimitAndOffset(req)
    try{
     let query = `select r.report_number, r.created_by as 'report_created_by' , r.report_name , u.name as 'engineer_name', st.name as
     "report_status" , r.created_at as 'report_created_at' from report r inner join user u on r.created_by = u.id
     inner join status_type st on r.status_id=st.id where r.reviewer_id=? and r.status_id in (?)  
     order by r.updated_at desc limit ? offset ?`

     const result = await sequelize.query(query,{
        replacements:[userId,[4],limit,offset],
        raw:true,
        type:QueryTypes.SELECT
     })
    
     return new Response(200,"SUCCESS",`Notification for reviewer with id ${userId}.`,result)
    }catch(error){
        console.log("Error in notification api for the reveiwer ==> ",error)
        return new Response(500,"FAILURE",`Unknown error occured.`,null)
    }
}

async function getReveiwerWorkStatus(userId,req){

  try{
    let query = `select count(*) as 'count' , r.status_id as 'statusId' , s.name as 'statusName' from report r inner join 
    status_type s on r.status_id = s.id where r.reviewer_id=? group by status_id`

    const result = await sequelize.query(query,{
        replacements:[userId],
        raw:true,
        type:QueryTypes.SELECT
    })

    return new Response(200,"SUCCESS",`Report status count for reveiwer id ${userId}.`,result)

  }catch(error){
        console.log("Error in Reveiwer Work Status api  ==> ",error)
        return new Response(500,"FAILURE",`Unknown error occured.`,null)
  }


}

function getLimitAndOffset(req){

    let {limit,offset} = req.query

    if(!limit || isNaN(limit)){
        limit = 10
    }

    if(!offset || isNaN(offset)){
        offset=0
    }
    
    return {
        limit:parseInt(limit),
        offset:parseInt(offset)
    }
}


module.exports = {getReveiwerProjectsByName,searchForReveiwer,getReviwerNotifications,getReveiwerWorkStatus}
