const Sequelize=require('sequelize');

const sequelize =new Sequelize('users-data','root','MySql@1234',{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;