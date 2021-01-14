const { fetchMyIP } = require('./fetchMyIP')

fetchMyIP((error, IP) => {
  if(error){
    console.log('Error it didnt work: ' + error);
    return;
  }

  console.log('It worked, your IP is: ' + IP)
})