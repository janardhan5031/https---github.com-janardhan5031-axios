const User=require('../model/user');

exports.getAllUsers =(req,res,next)=>{
    User.findAll()
    .then((rows)=>{
        //console.log(result);
        //const [rows] =result;
        res.json(rows);
    })
    .catch(err=>console.log(err));
}

exports.getSingleData=(req,res,next)=>{
    //gettting id from request body
    const userid=req.params.userId;
    console.log(userid);
    //seachind the element that matches with id
    //and send it as json
    User.findByPk(userid)
    .then((user)=>{
        //console.log(user);
        res.json(user);
    })
    .catch(err=>console.log(err));
}

exports.postUsers= (req,res,next)=> {
    console.log(req.body.name,req.body.email);
    const name=req.body.name;
    const email=req.body.email;
    User.create({
        name:name,
        email:email
    })
    .then((result)=>{
        //console.log(result);
        res.json({name:name,email:email});
    })
    .catch(err=>console.log(err));
}

exports.updateData = (req,res,next)=>{
    // accessing the data from request
    const userid=req.body.id;
    const name=req.body.name;
    const email=req.body.email;
    //search the element which matches with id from User table
    //update that element with updated data
    User.update({name:name,email:email},{
        where:{id:userid}
    })
    .then(result=>{
        res.json(result);
    })
    .catch(err=>console.log(err));
}

exports.deleteData =(req,res,next) =>{
    //accessing id from request
    const userid= req.params.userId;
    //  2console.log(userid);
    //delete element in table which matches id
    User.destroy({
        where:{id:userid}
    })
    .then((result) =>{
        res.json({});
    })
    .catch(err=>console.log(err));

}