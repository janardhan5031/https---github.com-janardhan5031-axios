
var submit=document.getElementById('submit');

submit.addEventListener('click',(e)=>{
    e.preventDefault();
    //console.log('click');

    //getting all data from from
    var fname=document.getElementById('fname').value;   // first name
    var lname=document.getElementById('lname').value;   // last name
    var mail=document.getElementById('mail').value   // mail address
    
    
    let myobj={
        fname: fname,
        lname: lname,
        mail: mail
    }

    // storing the data in server
    axios.post('https://crudcrud.com/api/c35b84f121b8450ea88624fe61700a2e/appointements',myobj)
        .then((res)=>{console.log('submited')

         //displaying the data
            axios.get('https://crudcrud.com/api/c35b84f121b8450ea88624fe61700a2e/appointements')
            .then((res)=>{
                let name=res.data[res.data.length-1].fname;
                let id=res.data[res.data.length-1]._id;
                console.log(name,id);
                Elements(name,id);
                })
                .catch((err)=>{console.log(err)})
        })
        .catch(err=>{console.log(err)})
    

});


function Elements(fname,_id){

    let list=document.getElementById('list_of_users');
    //console.log(list);
    let ele=
    `<li id=${_id} class="list">${fname}
        <button onclick=deleteUser('${_id}') class="dlt_btn">Delete</button>
        <button onclick=EditUserDetails('${_id}') class="edt_btn">Edit</button>
    </li>`  
    list.innerHTML+=ele;
    
}   

//displaying the data from servert into page
axios.get('https://crudcrud.com/api/c35b84f121b8450ea88624fe61700a2e/appointements')
    .then((res)=>{
        res.data.forEach(element => {
            if(element.fname)
            {Elements(element.fname,element._id);}
        })  
    })
    .catch((err)=>{console.log(err)});

//

//deleting the data from the server
function deleteUser(_id){
    axios.delete(`https://crudcrud.com/api/c35b84f121b8450ea88624fe61700a2e/appointements/${_id}`)
    .then((res)=>{
        console.log('deleted successfully');
        deleteFromPage(_id);
    })
    .catch(err=>console.log(err));
}

//delete data from page
function deleteFromPage(_id) {
    let ele=document.getElementById(_id);
    let parentnode=document.getElementById('list_of_users');
    if(ele){
        parentnode.removeChild(ele);
    }
}

//edit user details
//function EditUserDetails(_id){
//    //getting all data from from
//    var fname=document.getElementById('fname').value;   // first name
//    var lname=document.getElementById('lname').value;   // last name
//    var mail=document.getElementById('mail').value   // mail address
//    //converting data into object
//    let myobj={
//        fname: fname,
//        lname: lname,
//        mail: mail
//    }
//
//    axios.patch(`https://crudcrud.com/api/c35b84f121b8450ea88624fe61700a2e/appointements/${_id}`,myobj)
//        .then((res) => console.log(res))
//        .catch(err=>console.log(err));
//
//}
//






