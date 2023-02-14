const sequelize = require('../database/DBConnection')
const {DataTypes} = require('sequelize')
const user = require('./User')
const report = require('./Report')

const document = sequelize.define('report_documents',{
    file_id:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false
    },
    original_file_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    storage_file_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    created_at:{
        type:DataTypes.DATE
    },
    updated_at:{
        type:DataTypes.DATE
    },
    type:{
        type:DataTypes.STRING
    },
    sub_type:{
        type:DataTypes.STRING
    }   
},{
    tableName:'report_documents',
    timestamps:false
})

document.belongsTo(user,{
    as:'submitted_by_fk',
    foreignKey:{
        name:"submitted_by",
        allowNull:false
    },
    onDelete:'CASCADE'
})

document.belongsTo(report,{
    as:'report_id_fk',
    foreignKey:{
        name:'report_id',
        allowNull:false
    },
    onDelete:'CASCADE'
})


document.sync()

module.exports = document