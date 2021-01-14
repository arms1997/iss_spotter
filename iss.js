const request = require('request')

const fetchCoordsByIP = function (ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if(error){
      callback(error, null);
      return;
    }

    if(response.statusCode !== 200){
      const msg = `Status code ${response.statusCode} when fetching IP. Response ${body}`;
      callback(Error(msg), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body) 

    callback(null, {latitude, longitude})
  })
};

module.exports = { fetchCoordsByIP }