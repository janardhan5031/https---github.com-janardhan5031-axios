
var submit=document.getElementById('submit');

function addData(e){
    e.preventDefault();
    //console.log('click');

    //getting all data from from
    var fname=document.getElementById('name').value;   // first name
    var lname=document.getElementById('lname').value;   // last name
    var mail=document.getElementById('email').value   // mail address
    
    
    let myobj={
        name: fname,
        lname: lname,
        email: mail
    }
    //console.log(myobj);
    // storing the data in server
    axios.post(`http://localhost:5000/post_data`,myobj)
        .then((res)=>{console.log('submited')
            console.log(res);

         //displaying the data
           axios.get('http://localhost:5000/get-data')
           .then((res)=>{
               let name=res.data[res.data.length-1].name;
               let id=res.data[res.data.length-1].id;
               //console.log(res);
               Elements(name,id);
               })
            .catch((err)=>{console.log(err)})
        })
        .catch(err=>{console.log(err)})
    

}


function Elements(fname,_id){
    //console.log(fname,_id);

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
axios.get('http://localhost:5000/get-data')
   .then((res)=>{
        console.log(res.data);
       res.data.forEach(element => {
           if(element.name)
           {Elements(element.name,element.id);}
       })  
   })
   .catch((err)=>{console.log(err)});
//
//
//deleting the data from the server
function deleteUser(_id){
    axios.get(`http://localhost:5000/delete-user-data/${_id}`)
    .then((res)=>{
        console.log('deleted successfully');
        deleteFromPage(_id);
    })
    .catch(err=>console.log(err));
}


//delete data from page
function deleteFromPage(_id) {
    console.log(_id);
    let ele=document.getElementById(_id);
    let parentnode=document.getElementById('list_of_users');
    if(ele){
        parentnode.removeChild(ele);
    }
}

//edit user details
function EditUserDetails(_id){
    //calling the server for data with id
    axios.get(`http://localhost:5000/get-singleData/${_id}`)
        .then((res) => {
            console.log(res.data);
            const name=res.data.name;
            const email=res.data.email;

            // displaying the data from server in form fields
            document.getElementById('name').value=name;
            document.getElementById('email').value=email;
            //deleteUser(_id);
            const edit=document.getElementById('submit');

            edit.addEventListener('click',(e)=>{
                e.preventDefault();
                //getting all data from from
                const fname=document.getElementById('name').value;   // first name
                const lname=document.getElementById('lname').value;   // last name
                const mail=document.getElementById('email').value   // mail address
                //converting data into object
                let myobj={
                    id:_id,
                    name: fname,
                    lname: lname,
                    email: mail
                }
                axios.post(`http://localhost:5000/post-edit-data`,myobj)
                    .then((res) =>{ console.log('updated the data')
                    deleteFromPage(_id);
                    Elements(fname,_id);
                    })
                    .catch(err=>console.log(err));
            })
        })
        .catch((err) => console.log(err));
    //axios ended here

}

