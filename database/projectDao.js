const project = require('../models/Project')
const userDao = require('./userDao')
const alphanumeric = require('alphanumeric-id')
const Response = require('../service/customResponse')
const sequelize = require('../database/DBConnection')
const { Op } = require("sequelize");
const User = require('../models/User')



async function saveProject(userId,body){

    var date = new Date()
    date.setMinutes(date.getMinutes()-date.getTimezoneOffset())
    
   try{
    
      const newProject = await sequelize.transaction(async (t) => {
           
       const newProject  = await project.create({
                lab_name : body.lab_name,
                receiving_customer:body.receiving_customer,
                project_type : body.project_type,
                project_number : (Math.floor(Math.random() * 900000) + (alphanumeric(4))).toUpperCase(),
                project_name:body.project_name,
                description:body.description,
                purchase_order_number:body.purchase_order_number,
                product_covered:body.product_covered,
                modals:body.modals,
                client_ready:new Date(body.client_ready),
                completion:new Date(body.client_ready),
                start_date:new Date(body.start_date),
                end_date:new Date(body.end_date),
                created_by:userId,
                transacting_customer:body.transacting_customer,
                created_at:date,
                updated_at:date
            })

            return newProject;

        })

        return new Response(200,"SUCCESS",`Project created successfully with id ${newProject.project_number}.`,{id:newProject.project_number})
   }catch(error){

    if(error.name === "SequelizeForeignKeyConstraintError"){
        return new Response(400,"FAILURE","Receiving Customer and/or Report Creator are invalid users or Manufacturer does not exist in the system.","")
    }
       console.log("ProjectDao || saveProject ==> " + JSON.stringify(error))
       return new Response(500,"FAILURE",`Unknown error occured.`,"")
   }
    
}

async function getProjectByName(name,id,userId){
    if(name){
        name = name.toLowerCase()
    }

   try{
    const projects = await project.findAll({
        where:{
           [Op.and] : [
                {created_by : {[Op.eq] : userId}},
                {
                    [Op.or] : [
                        {project_name:{[Op.like] : `${name}%`}},
                        {project_name:{[Op.like] : `%${name}%`}},
                        {project_name:{[Op.like] : `%${name}`}},
                        {project_number:{[Op.like]:`${id}%`}},
                        {project_number:{[Op.like]:`%${id}%`}},
                        {project_number:{[Op.like]:`%${id}`}}
                    ]
                }   
            ]
        },
        attributes : ['project_name','project_number']
    },{raw:true})
    
    return new Response(200,"SUCCESS",`Projects related to userId ${userId}.`,projects)
   }catch(error){
          console.log("ProjectDao || Error getting projects " + error)
          return new Response(500,"FAILURE",`Unknown error occured.`,null)
   }

}

async function getAllProjectInfo(id){

    try{
        const result = project.findByPk(id,{
            
        })
    }catch(error){

    }

}


module.exports = {saveProject,getProjectByName}

