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
