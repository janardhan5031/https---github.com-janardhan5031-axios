const Sequelize=require('sequelize');   //importing sequelise to map sql with js

const sequelize=require('../util/database');    //importing the databse we created in util folder

const Users = sequelize.define('user',{   //creating the table in database
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true

    },
    name:Sequelize.STRING,
    email:Sequelize.STRING
});

module.exports=Users;