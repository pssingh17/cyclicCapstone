const report = require('../models/Report')
const alphanumeric = require('alphanumeric-id')
const Response = require('../service/customResponse')
const document = require('../models/Document')
const sequelize = require('../database/DBConnection')
const { QueryTypes } = require('sequelize');
const {Op} = require('sequelize')
const project = require('../models/Project')
const documentType = require('../models/DocumentType')
const reportStatus = require('../models/ReportStatus')

async function saveReport(body,userId,documentPresent){

    var date = new Date()
    date.setMinutes(date.getMinutes()-date.getTimezoneOffset())

   try{
      
    const result = await report.create({
        report_number : (alphanumeric(3)+Math.floor(Math.random() * 9000000) + alphanumeric(3)).toUpperCase(),
        issued_at: body.issued_at,
        tags : body.tags,
        comments : body.comments,
        products_covered : body.products_covered,
        models : body.models,
        is_saved: body.is_saved,
        created_at : date,
        updated_at : date,
        status_id  : body.is_saved.toLowerCase() === 'true'?4:1,
        is_active : true,
        receiving_customer : body.receiving_customer,
        reviewer_id : body.reviewer_id,
        created_by : userId,
        project_number : body.project_number,
        documents_uploaded:documentPresent,
        report_name:body.report_name
    })

    //console.log(result)
    return new Response(200,"SUCCESS",`Report created successfully with id ${result.report_number}.`,{id:result.report_number})
   }catch(error){
            console.log("Error in saving the report ===> " + error)
            return new Response(500,"FAILURE",`Unknown error occured.`,"")
   }
}



async function saveDocument(userId,reportId,type,blobName,originalName,subTypeId){

    var date = new Date()
    date.setMinutes(date.getMinutes()-date.getTimezoneOffset())
       
    try{
           
        const result = await document.create({
            file_id : (Math.floor(Math.random()*900000) + alphanumeric(3)).toUpperCase(),
            original_file_name:originalName,
            storage_file_name:blobName,
            created_at : date,
            updated_at : date,
            type:type,
            sub_type:subTypeId,
            submitted_by:userId,
            report_id:reportId
        })

    
        return new Response(200,"SUCCESS",`Document created successfully with id ${result.file_id}.`,{id:result.file_id})

    }catch(error){
        console.log("Error in saving the report documents ===> " + error)
        return new Response(500,"FAILURE",`Unknown error occured.`,"")
    } 
}

async function getReportsWithStatusCount(userId){
    try{
        const users = await sequelize.query("select count(*) as 'count' , r.status_id as 'statusId' , s.name as 'statusName'" + 
        "from report r inner join status_type s on r.status_id = s.id where r.created_by=? group by status_id", 
        { type: QueryTypes.SELECT , raw:true ,replacements:[userId]});

        return new Response(200,"SUCCESS","Engineer Reports Status Count",users)
    }catch(error){
          console.log("Error in fetching report status  " + error)
          return new Response(500,"FAILURE","Unknown error occured.",null)
    }
}


async function getProjectLinkedToReports(reportId,userId){

    try{
        
        const result = await report.findAll({
            where:{
                [Op.and] : [
                    {created_by:{[Op.eq]:userId}},
                    {[Op.or] : [
                        {report_number:{[Op.like]:`${reportId}%`}},
                        {report_number:{[Op.like]:`%${reportId}%`}},
                        {report_number:{[Op.like]:`%${reportId}`}},
                    ]},
                    {is_saved:{[Op.eq]:true}}
                ],
            },
            attributes : ['report_number'],
            include:{
                model:project,
                as:"project_number_fk",
                attributes:["project_number","project_name"]
            }
        })

        const projects = result.map((data) => data.project_number_fk)

        return new Response(200,"SUCCESS",`Projects Linked to reportId ${reportId}`,projects)
        

    }catch(error){
             console.log("Error in fetching projects linked to a report " + error)
             return new Response(500,"FAILURE","Unknown error occured.",null)
    }

}

async function getAllReportsBasedOnDocumentType(projectId,screenId,req){

    const {limit,offset} = getLimitAndOffset(req)
    let alterQuery = null
    const isReviewer = req.user.is_reviewer
    if(isReviewer){
      alterQuery = `and r.reviewer_id='${req.user.userId}'`
    }
    
    let query = `select r.report_number , r.tags , r.comments as 'report_comments' , r.receiving_customer , r.reviewer_id , r.project_number , r.documents_uploaded,
    r.created_at as 'report_created_at' , d.file_id  , d.original_file_name , d.type as 'file_type' ,
     d.submitted_by as 'file_uploaded_by', dt.name as 'file_sub_type' , st.name as 'report_status' from report r inner join report_documents d 
    on r.report_number = d.report_id inner join document_type dt on d.sub_type = dt.id inner join status_type st on
    st.id = r.status_id where r.project_number=? and r.is_saved=? and d.sub_type in (?) ${isReviewer?alterQuery:''} limit ? offset ?`

    try{
        const result = await sequelize.query(query,
        {
            replacements:[projectId,true,screenId,parseInt(limit),parseInt(offset)],
            type:QueryTypes.SELECT,
            raw:true
        })
       
        return result

    }catch(err){
        console.log("Error in fetching reports and linked documents " + err )
    }

}


async function getReportsWithNoDocumentsUploaded(projectId,req){
       
    const {limit,offset} = getLimitAndOffset(req)

    try{

        let alterQuery = null
        const isReviewer = req.user.is_reviewer
        if(isReviewer){
          alterQuery = `and reviewer_id='${req.user.userId}'`
        }

        let query = `select report_number , tags , comments as 'report_comments' , receiving_customer , reviewer_id , project_number,
        documents_uploaded, created_at as 'report_created_at' from report  where project_number=? and is_saved=? 
        and documents_uploaded=? ${isReviewer?alterQuery:''} limit ? offset ?`

        const result = await sequelize.query(query,
            {
                replacements:[projectId,true,false,parseInt(limit),parseInt(offset)],
                type:QueryTypes.SELECT,
                raw:true
            })

       return result
    }catch(error){
      console.log("Error in fetching reports with no linked documents " + error)
    }
}


async function getDocumentBasedOnFileId(fileId){
    
    try{
        const result = await document.findByPk(fileId)
        return new Response(200,"SUCCESS","",result)
    }catch(error){
     console.log(error)
     return new Response(500,"FAILURE","Unknown error occured.",null)   
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
        limit:limit,
        offset:offset
    }
}

async function getDocumentBasedOnDocId(docId){

    try{
        const result = await document.findOne({
            where:{
                file_id:{[Op.eq]:docId}
            },
            raw:true,
            attributes:['file_id','storage_file_name','type','report_id']
        })

        return new Response(200,"SUCCESS","Document Metadata.",result)
    }catch(error){
        console.error("Error in fetching doc " + error)
        return new Response(500,"FAILURE","Unknown error occured.",null)  
    }
}


async function updateDocument(docId,fileName,subType){

    try{
        let query = `update report_documents set sub_type=? , original_file_name=?, updated_at=? where file_id=?`

        const result = await sequelize.query(query,{
            replacements:[+subType,fileName,new Date(),docId],
            raw:true,
            type:QueryTypes.UPDATE
        })

        return new Response(200,"SUCCESS","Document Updated.",result)
    }catch(error){
        console.error("Error in updating doc " + error)
        return new Response(500,"FAILURE","Unknown error occured.",null)  
    }

}


async function deleteDocument(docId,reportId){
    try{
         
        const result = await sequelize.transaction(async (t1)=>{
            
            const docResult = await document.destroy({
                where:{
                    file_id:{[Op.eq]:docId}
                }
            })
    
            let responseResult = null

            if(reportId){
               let query = `update report set documents_uploaded=? , updated_at=? where report_number=?`
               reportResult = await sequelize.query(query,{
                replacements:[false,new Date(),reportId],
                raw:true,
                type:QueryTypes.DELETE
               })
            }

             return {
                docResult:docResult,
                responseResult:responseResult
            }
        
        })
        return new Response(200,"SUCCESS",`Deleted doc with id ${docId}.`,result)
    }catch(error){
        console.error("Error in deleting doc " + error)
        return new Response(500,"FAILURE","Unknown error occured.",null) 
    }
}


async function getDocumentsCountRelatedToReport(reportId){

    try{
       const {count,rows} = await report.findAndCountAll({
        where:{
            report_number:{[Op.eq]:reportId}
        },
        raw:true,
        include:{
            model:document,
            as:'report_id_fk'
        }
       })

       const response = {
        count:count,
        rows:rows
       }
            
      return new Response(200,"SUCCESS",`Document count for the report ${reportId}.`,response) 
    }catch(error){
        console.error("Error in founding count of docs linked to report " + error)
        return new Response(500,"FAILURE","Unknown error occured.",null) 
    }
} 

module.exports = {saveReport,saveDocument,getReportsWithStatusCount,getProjectLinkedToReports,
    getAllReportsBasedOnDocumentType,getReportsWithNoDocumentsUploaded,getDocumentBasedOnFileId,
    getDocumentBasedOnDocId,updateDocument,deleteDocument,getDocumentsCountRelatedToReport}
