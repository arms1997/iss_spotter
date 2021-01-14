const { fetchMyIP } = require('./fetchMyIP')
const { fetchCoordsByIP } = require('./iss')

fetchMyIP((error, IP) => {
  if(error){
    console.log('Error it didnt work: ' + error);
    return;
  }

  fetchCoordsByIP(IP, (error, obj) => {
    console.log(obj)
  })
})