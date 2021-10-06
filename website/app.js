// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Global Variables */

const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=f08b9fab98287ca8a22d4dfdc9ae285a&units=metric';


document.getElementById('generate').addEventListener('click', ()=>{
    getInfo(baseURL,apiKey)
    .then(function(data){
        postData({info1:d, info2: data.main.temp-273, info3: document.getElementById('feelings').value});
    }).then(retrieveInfo);
});



/* GET request to the weather info API*/
const getInfo = async(baseURL,apiKey )=>{
  const zipCode= document.getElementById('zip').value;
    const res = await fetch(baseURL + zipCode + apiKey)
    try{
        const data =await res.json();
        console.log(data)
        document.getElementById('temp').innerHTML += 'Temp is ' + data.main.temp;
        return data;
     }  catch(error) {
       console.log("error", error);

     }
}

// Async POST
const postData = async(data = {})=>{
  const res = await fetch('/postData',{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try{
      const newData =await res.json();
       return newData;
  }catch(error) {
  console.log("error", error);
  }
}


const retrieveInfo = async()=>{
    const res = await fetch('/all')
    try{
        const retrieveData =await res.json();
        console.log(retrieveData)
        document.getElementById('date').innerHTML += 'Date is ' + d;
        document.getElementById('content').innerHTML += 'You are  ' + document.getElementById('feelings').value;
     }  catch(error) {
       console.log("error", error);

     }
}
