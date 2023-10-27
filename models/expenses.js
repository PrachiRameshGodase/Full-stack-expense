const Sequelize=require('sequelize')


const sequelize=require('../util/database')

const Booking = sequelize.define('expenses', {
    id:{
        type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
    },
    epense:Sequelize.STRING,

    amount:{
        type:Sequelize.INTEGER,
        allowNull:false,
        
    },

    description:{
        type:Sequelize.STRING,
        allowNull:false,
        
    }
})

module.exports=Booking;