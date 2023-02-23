const report = require('../models/Report')
const alphanumeric = require('alphanumeric-id')
const Response = require('../service/customResponse')
const document = require('../models/Document')
const sequelize = require('../database/DBConnection')
const { QueryTypes } = require('sequelize');
const {Op} = require('sequelize')
const project = require('../models/Project')

async function saveReport(body,userId){

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
        project_number : body.project_number
    })

    //console.log(result)
    return new Response(200,"SUCCESS",`Report created successfully with id ${result.report_number}.`,{id:result.report_number})
   }catch(error){
            console.log("Error in saving the report ===> " + error)
            return new Response(500,"FAILURE",`Unknown error occured.`,"")
   }
}



async function saveDocument(userId,reportId,type,blobName,originalName){

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
            sub_type:type,
            submitted_by:userId,
            report_id:reportId
        })

    
        return new Response(200,"SUCCESS",`Document created successfully with id ${result.file_id}.`,{id:result.file_id})

    }catch(error){
        console.log("Error in saving the report documents ===> " + error)
        return new Response(500,"FAILURE",`Unknown error occured.`,"")
    } 
}

async function getReportsWithStatusCount(){
    try{
        const users = await sequelize.query("select count(*) as 'count' , r.status_id as 'statusId' , s.name as 'statusName'" + 
        "from report r inner join status_type s on r.status_id = s.id group by status_id", { type: QueryTypes.SELECT , raw:true });

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
                    ]}
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


module.exports = {saveReport,saveDocument,getReportsWithStatusCount,getProjectLinkedToReports}
