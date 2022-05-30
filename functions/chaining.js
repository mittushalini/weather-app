const temp = require('../functions/temp.js')
const geocode = require('../functions/geocode.js')

//const { timeStamp } = require('console')
const address = process.argv[2]
geocode(address, (error, data) => {
    if (error) {
        //console.log('Unable to connect')
        return console.log(error)
    }
    temp(data.latitude, data.longitude, (err, forecast_data) => {
        if (err) {
            //console.log('Unable to connect to temp function')
            console.log(err)
        }

        console.log(data.location)
        console.log(forecast_data)

    }
    )
})