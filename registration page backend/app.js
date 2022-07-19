
const express=require('express');   //importing express module class

const cors=require('cors');     //importing cross origin ref

const bodyParser=require('body-parser');    //importing body-parser module
const sequelize=require('./util/database');   //importing database
const User=require('./model/user'); //importing user table in database

const userdata=require('./controller/users');   // user controller function

const app=express();       //creating express app

app.set('view engine', 'ejs');
app.set('views','views');

app.use(cors());


app.use(bodyParser.json());   //to parse data form req url into json formate

app.get('/get-data',userdata.getAllUsers);
app.get('/get-singleData/:userId',userdata.getSingleData);
app.post('/post_data',userdata.postUsers);    //posting user details
app.post('/post-edit-data',userdata.updateData);  //updating user details
app.get('/delete-user-data/:userId',userdata.deleteData);  //deleting user details


sequelize.sync()
.then((result)=>{
    //console.log(result);
    app.listen(5000);
})
.catch(err=>console.log(err));
