const request = require('request');

const fetchMyIP = function (callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(null, JSON.parse(body).ip);
  });
};

const fetchCoordsByIP = function (ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response ${body}`;
      callback(Error(msg), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body);

    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function (coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response ${body}`;
      callback(Error(msg), null);
      return;
    }

    const responseArr = JSON.parse(body).response;

    callback(null, responseArr);
  });
};

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, IP) => {
    if (error) {
      callback('Error it didnt work: ' + error);
      return;
    }

    fetchCoordsByIP(IP, (error, coords) => {
      if (error) {
        callback('Error it didnt work: ' + error);
        return;
      }

      fetchISSFlyOverTimes(coords, (error, info) => {
        if (error) {
          callback('Error it didnt work: ' + error);
          return;
        }

        for (let data of info) {
          callback(null, `Next pass at ${new Date(data.risetime)} for ${data.duration} seconds`);
        }

      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };