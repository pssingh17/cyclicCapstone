const sequelize = require('../database/DBConnection')
const {DataTypes} = require('sequelize')
const user = require('./User')
const project = require('./Project')


const report = sequelize.define('report',{
    report_number:{
       type:DataTypes.STRING,
       primaryKey:true,
       allowNull:false
    },
    issued_at:{
        type:DataTypes.DATEONLY
    },
    tags:{
        type:DataTypes.STRING
    },
    comments:{
        type:DataTypes.TEXT
    },
    products_covered:{
        type:DataTypes.TEXT
    },
    models:{
        type:DataTypes.STRING
    },
    is_saved:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    created_at:{
        type:DataTypes.DATE
    },
    updated_at:{
        type:DataTypes.DATE
    },
    status:{
        type:DataTypes.STRING
    },
    is_active:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
},{
    tableName:'report',
    timestamps:false
})

report.belongsTo(user,{
    as:'receiving_customer_fk',
    foreignKey:{
        name:'receiving_customer',
        allowNull:false
    },
    onDelete:'CASCADE'
})

report.belongsTo(user,{
    as:'reviewer_id_fk',
    foreignKey:{
        name:'reviewer_id',
        allowNull:false
    },
    onDelete:'CASCADE'
})

report.belongsTo(user,{
    as:'created_by_fk',
    foreignKey:{
        name:'created_by',
        allowNull:false
    },
    onDelete:'CASCADE'
})

report.belongsTo(project,{
    as:'project_number_fk',
    foreignKey:{
        name:'project_number',
        allowNull:false
    },
    onDelete:'CASCADE'
})

report.sync()

module.exports = report

