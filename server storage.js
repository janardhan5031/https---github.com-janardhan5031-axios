
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
    axios.post('https://crudcrud.com/api/6d01b85f883346a287e964b1b13556d9/appointements',myobj)
        .then((res)=>{Elements(res.data.fname)})
        .catch(err=>{console.log(err)})

        
    //displaydata(key);

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


function Elements(data){
    let ele=
    `<ul>
        <li class="list">${data}<button id="dlt_btn">X</button>
        </li>
    </ul>`

    new_div.innerHTML+=ele;
}

Elements('jani')

axios.get('https://crudcrud.com/api/6d01b85f883346a287e964b1b13556d9/appointements')
    .then((res)=>{
        res.data.forEach(element => {
            Elements(element.fname);
        });
    })
    .catch((err)=>{console.error(err)});



