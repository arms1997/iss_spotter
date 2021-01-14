const { nextISSTimesForMyLocation } = require('./iss')

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log(passTimes);
})