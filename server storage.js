
var submit=document.getElementById('submit');

submit.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log('click');

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
    axios.post('https://crudcrud.com/api/386d35a43aad449f9126cba239cfa094/appointements',myobj)
        .then((res)=>{console.log(res)})
        .catch(err=>{console.log(err)})

        
    //displaydata(key);

});


// testing local storage
//localStorage.setItem('name','jani');
//var item=localStorage.getItem('obj1');
//console.log(JSON.parse(item));

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

    new_div.innerHTML=ele;
}

Elements('jani');

//var ul=document.createElement('ul');
//var li=document.createElement('li');
//li.className='list';
//var text=document.createTextNode("jani");
//var delete_btn=document.createElement('button');
//delete_btn.id="dlt_btn";
//delete_btn.appendChild(document.createTextNode('X'));
//li.appendChild(text);
//li.appendChild(delete_btn);
//ul.appendChild(li);
//new_div.appendChild(ul);

Object.keys(localStorage).forEach((key) => {
    var data=JSON.parse(localStorage.getItem(key));
    //console.log(data);
    txt=data.fname+" "+data.lname+" "+data.mail;
    var li=document.createElement('li');
    li.className='list';
    var delete_btn=document.createElement('button');
    delete_btn.id="dlt_btn";
    delete_btn.appendChild(document.createTextNode('X'));
    var text=document.createTextNode(txt);

    li.appendChild(text);
    li.appendChild(delete_btn);
    ul.appendChild(li);
});

//console.log(keynum);


function displaydata(key){
    var obj=JSON.parse(localStorage.getItem(key));
    var li_text=obj.fname+" "+obj.lname+"  "+obj.mail;

    var li=document.createElement('li');
    li.className='list';
    var delete_btn=document.createElement('button');
    delete_btn.id="dlt_btn";
    delete_btn.appendChild(document.createTextNode('X'));
    var text=document.createTextNode(li_text);

    li.appendChild(text);
    li.appendChild(delete_btn);
    ul.appendChild(li);

    //console.log(li);
}

console.log(Object.call())