// GET REQUEST
function getTodos() {
  //console.log('GET Request');
  //axios({
  //  url:'https://jsonplaceholder.typicode.com/todos',
  //  params:{
  //    _limit:5
  //  }
  //}).then(res=>showOutput(res))
  //  .catch(err=>console.log(err));

  axios
    .get('https://jsonplaceholder.typicode.com/todos?_limit=5')
    .then(res=>showOutput(res))
    .catch(err=>console.log(err));

}

// POST REQUEST
function addTodo() {              //to post the data into the server
  //console.log('POST Request');
  axios.post('https://jsonplaceholder.typicode.com/todos?_limit=5',{
  title:'jani',
  completed:false
  }).then(res=>showOutput(res))
    .catch(err=>console.log(err));



}

// PUT/PATCH REQUEST
function updateTodo() {
  //console.log('PUT/PATCH Request');
  //axios.patch('https://jsonplaceholder.typicode.com/todos/1',{
  //title:'jani',
  //completed:false
  //}).then(res=>showOutput(res))
  //.catch(err=>console.log(err));

  axios.patch('https://jsonplaceholder.typicode.com/todos/1',{
  title:'jani',
  completed:false
}).then(res=>showOutput(res))
.catch(err=>console.log(err));


}

// DELETE REQUEST
function removeTodo() {
 // console.log('DELETE Request');
 axios.delete('https://jsonplaceholder.typicode.com/todos/1')
 .then(res=>showOutput(res))
.catch(err=>console.log(err));
}

// SIMULTANEOUS DATA
function getData() {
  //console.log('Simultaneous Request');
  //axios.all([               //this method is used to do the multiple requests at a time
  //  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
  //  axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
  //])
  //  .then((res)=>{
  //    console.log(res[0]);
  //    console.log(res[1]);
  //    //showOutput(res[0]);
  //    showOutput(res[1]);
  //  })
  //  .catch(err=>console.log(err));

  axios.all([               //this method is used to do the multiple requests at a time
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
  axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
  ])
  .then(axios.spread((todos,posts) => {showOutput(posts)}))
  .catch(err=>console.log(err));


}

// CUSTOM HEADERS
function customHeaders() {
  //console.log('Custom Headers');
  const config={
    headers:{
      'content-type': 'application/json',
      authorization:'jani'
    }
  }

  axios.post('https://jsonplaceholder.typicode.com/todos?_limit=5',{
    title:'jani5031',
    completed:false
  },config)
  .then(res=>showOutput(res))
  .catch(err=>console.log(err));

}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  //console.log('Transform Response');
  const options={
    method:'post',
    url:'https://jsonplaceholder.typicode.com/todos?_limit=5',
    data:{
      //the below code is not working
      title:'hello world'
    },
    transformResponse:axios.defaults.transformResponse.concat(data=>{
      data.title=data.title.toUpperCase();
      return data;
    })

    //transformResponse:[(data)=>{
    //  data.title=data.title.toUpperCase();
    //  return data;
    //}]
  };

  axios(options).then(res=>showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
  //console.log('Error Handling');
  axios
  .get('https://jsonplaceholder.typicode.com/todos?_limit=5')
  .then(res=>showOutput(res))
  .catch(err=>{
    if(err.response){
      //server responded with other than range 200 status
      // i.e success response
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);

      if(err.response.status==400){
        //if any unwanted error occured that will be alerted
        alert('Error: page not found');
      }
      else if(err.request){
        //request was made no responses
        console.error(err.request);
      }else{
        console.error(err.message);
      }
    }
  });
}

// CANCEL TOKEN
function cancelToken() {
 // console.log('Cancel Token');
  const source=axios.CancelToken.source();

  axios
  .get('https://jsonplaceholder.typicode.com/todos',{
    cancelToken:source.token
  })
  .then(res=>showOutput(res))
  .catch(thrown=>{
    if(axios.isCancel(thrown)){
      console.log('request cancelled',thrown.message)
    }
  });
  if(true){
    source.cancel('request cancelled!')
  }
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(config=>{
   console.log(`${config.method.toUpperCase()} request sent to 
    ${config.url} at ${(new Date().getTime())}`);
   return config;
},error=>{
  return Promise.reject(error);
});


// AXIOS INSTANCES
const axiosInstances =axios.create({
  baseURL:'https://jsonplaceholder.typicode.com'
})

//axiosInstances.get('/comments').then(res=>{showOutput(res)});

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
