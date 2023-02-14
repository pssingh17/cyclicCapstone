const user = require('../models/User')
const alphanumeric = require('alphanumeric-id')
const bcrypt = require('bcrypt')
const manufacturer = require('../models/Manufacturer')
const Response = require('../service/customResponse')
const sequelize = require('../database/DBConnection')


async function saveUser(body){

   const savedUser = await sequelize.transaction(async (t) => {

         const savedUser = await user.create({
            id:alphanumeric(5)+Math.floor(Math.random() * 1000000)+alphanumeric(5),
            name:body.name,
            email:body.email,
            password:bcrypt.hashSync(body.password,10),
            phone_number:body.phone_number,
            is_engineer:body.is_engineer,
            is_reviewer:body.is_reviewer,
            agency_id:body.agency_id,
            lab_id:body.lab_id
        })

        return savedUser
   })

    return savedUser ? savedUser.id : null; 
}

async function getUserById(userId){
    return await user.findByPk(userId)
}

async function saveManufacturer(body){
    
    try{
        
        console.log(await manufacturer.findAll({raw:true}))
        var date = new Date()
        date.setMinutes(date.getMinutes()-date.getTimezoneOffset())
       
        const newMerchant = await sequelize.transaction(async (t) => {
            
            const newMerchant = await manufacturer.create({
                id:alphanumeric(3)+Math.floor(Math.random() * 8000000)+alphanumeric(6),
                name:body.name,
                company_name:body.company_name,
                email:body.email,
                phone_number:body.phone_number,
                created_at:date
            })

            return newMerchant
        })

        return new Response(200,"SUCCESS",`Manufacturer created successfully with id ${newMerchant.id}.`,{id:newMerchant.id})

    }catch(error){
        console.log("Saving Manufacturer || error is ==> " + JSON.stringify(error));
        return new Response(500,"FAILURE",'Error Occured while saving manufacturer.',"") 
    }
}

module.exports = {saveUser,getUserById,saveManufacturer}