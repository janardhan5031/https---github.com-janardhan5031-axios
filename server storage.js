
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
    axios.post('https://crudcrud.com/api/438dcc9242444033be3322dea897279b/appointements',myobj)
        .then((res)=>{console.log(res.data.fname)
        
            //displaydata
            axios.get('https://crudcrud.com/api/438dcc9242444033be3322dea897279b/appointements')
                .then((res)=>{
                    let name=res.data[res.data.length-1].fname;
                    let id=res.data[res.data.length-1]._id;
                    console.log(name,id);
                    Elements(name,id);
                })
                .catch((err)=>{console.log(err)})
        
        })
        .catch(err=>{console.log(err)})

        
    //axios.get('https://crudcrud.com/api/438dcc9242444033be3322dea897279b/appointements')
    //    .then((res)=>{
    //        let name=res.data[res.data.length-1].fname;
    //        let id=res.data[res.data.length-1]._id;
    //        console.log(name,id);
    //        Elements(name,id);
    //    })
    //    .catch((err)=>{console.log(err)})

});



var body=document.getElementById('body');
var new_div=document.createElement('div');
new_div.className='new_div_class';
body.appendChild(new_div);

var header=document.createElement('h3');
header.style.textAlign='center';
var txt=document.createTextNode('The data stored is');
header.appendChild(txt);
new_div.appendChild(header);


function Elements(fname,_id){

    let ele=
    `<ul id="list_of_users">
        <li id=${_id} class="list">${fname}
            <button onclick=deleteUser('${_id}') class="dlt_btn">Delete</button>
        </li>
    </ul>`  

    new_div.innerHTML+=ele;
    
}   

//displaying the data from servert into page
axios.get('https://crudcrud.com/api/438dcc9242444033be3322dea897279b/appointements')
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
    console.log('clicked');
    axios.delete(`https://crudcrud.com/api/438dcc9242444033be3322dea897279b/appointements/${_id}`)
    .then((res)=>{
        deleteFromPage(_id);
    })
    .catch(err=>console.log(err));
}

//delete data from page
function deleteFromPage(_id) {
    let ele=document.getElementById(_id);
    let parentnode=document.getElementById('list_of_users');
    
    parentnode.removeChild(ele);
    
    
}








