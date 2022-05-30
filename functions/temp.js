const { builtinModules } = require('module');
const request = require('request');
//const lat = process.argv[2]
//const long = process.argv[3]


const temp = (lat, long, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=4affd6b7b70d1f16a8a8c17450d70252&query=' + lat + ',' + long;
    //console.log(url)
    request({ url: url, json: true }, (err, res) => {
        if (err) {
            callback('Unable to connect :(', undefined)
        }
        else if (res.body.error) {
            callback('please provide correct URL for temp function', undefined)
        }
        else {
            callback(undefined, res.body.current.temperature)
        }
    }
    )
}

module.exports = temp

//const url = 'http://api.weatherstack.com/current?access_key=4affd6b7b70d1f16a8a8c17450d70252&query=37.8267,-122.4233'
//temp(lat, long, function (data) {
//    console.log(data)
//})
