
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
    axios.post(`http://localhost:5000/post_data/:myobj`,myobj)
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
    console.log(fname,_id);

    let list=document.getElementById('list_of_users');
    //console.log(list);
    let ele=
    `<li id=${_id} class="list">${fname}
        <button onclick=deleteUser('${_id}') class="dlt_btn">Delete</button>
        <button onclick=EditUserDetails('${_id}') class="edt_btn">Edit</button>
    </li>`  
    list.innerHTML+=ele;
    
}   

//isplaying the data from servert into page
axios.get('http://localhost:5000/get-data')
   .then((res)=>{
        //console.log(res);
       res.data.forEach(element => {
           if(element.name)
           {Elements(element.name,element.id);}
       })  
   })
   .catch((err)=>{console.log(err)});
//
//

/*deleting the data from the server
function deleteUser(_id){
    axios.delete(`https://crudcrud.com/api/db79e5d2890b4ac6ba25ba1be2653dba/appointements/${_id}`)
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
function EditUserDetails(_id){
    //calling the server for data with id
    axios.get(`https://crudcrud.com/api/db79e5d2890b4ac6ba25ba1be2653dba/appointements/${_id}`)
        .then((res) => {
            var name=res.data.fname;

            // displaying the data from server in form fields
            document.getElementById('fname').value=name;
            //deleteUser(_id);
            let edit=document.getElementById('submit');

            edit.addEventListener('click',(e)=>{
                e.preventDefault();
                //getting all data from from
                var fname=document.getElementById('fname').value;   // first name
                var lname=document.getElementById('lname').value;   // last name
                var mail=document.getElementById('mail').value   // mail address
                //converting data into object
                let myobj={
                    fname: fname,
                    lname: lname,
                    mail: mail
                }
                axios.put(`https://crudcrud.com/api/db79e5d2890b4ac6ba25ba1be2653dba/appointements/${_id}`,myobj)
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
*/
