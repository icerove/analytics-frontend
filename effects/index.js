// sign up
export async function signUp(userContext, setUsername, setError) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
  "username": userContext.username,
  "email": userContext.email,
  "password": userContext.password});
  
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("35.236.73.215/user/signup", requestOptions)
    .then(response => response.text())
    .then(result => {
      localStorage.setItem('token', result.token)
      setUsername(result.username)
    })
    .catch(error => {
      setError(error)
      console.log('error', error)});
}

// create project
export async function createProject(projectName,setProjectId, setError) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let token = localStorage.getItem('token')
  myHeaders.append("Authorization", "Bearer " + token);
  if(!token) {
    setError('No User found signup or login')
    return
  }
  
  let raw = JSON.stringify({
    "projectName": projectName
  });
  
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("35.236.73.215/project", requestOptions)
    .then(response => response.text())
    .then(result => setProjectId(result.project_id))
    .catch(error => {
      setError(error)
      console.log('error', error)});
}

// create query
export async function createQuery(queryContent,setQueryId, setError){
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let token = localStorage.getItem('token')
  myHeaders.append("Authorization", "Bearer " + token);
  if(!token) {
    setError('No User found signup or login')
    return
  }

  let raw = JSON.stringify({
    "title": queryContent.title,
    "query": queryContent.query,
    "chartType": queryContent.chartType,
    "projectId": queryContent.projectId
  });
  
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("35.236.73.215/query", requestOptions)
    .then(response => response.text())
    .then(result => setQueryId(result.query_id))
    .catch(error => {
      setError(error)
      console.log('error', error)});
}

//get query 
export async function getQuery(queryId, setQueryContent,setError) {
  let requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("35.236.73.215/query/"+queryId, requestOptions)
    .then(response => response.text())
    .then(result => setQueryContent(result))
    .catch(error => {
      setError(error)
      console.log('error', error)});
}