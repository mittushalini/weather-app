const request = require('request');

const geocode = (address, callback) => {
    geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2JoYXR0YSIsImEiOiJjbDJsazdvMGswZTZsM2ptdXY4bW4wbjFpIn0.iKTH4JR0OLPA7TEYz5p8XQ&limit=1'

    request({ url: geocodeUrl, json: true }, (err, res) => {
        if (err) {
            callback('Unable to connect to geocode :(', undefined)
        }
        else if (res.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }
        else {

            callback(undefined, {
                latitude: res.body.features[0].center[1],
                longitude: res.body.features[0].center[0],
                location: res.body.features[0].place_name
            })

        }
    })


}

module.exports = geocode

//geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic2JoYXR0YSIsImEiOiJjbDJsazdvMGswZTZsM2ptdXY4bW4wbjFpIn0.iKTH4JR0OLPA7TEYz5p8XQ&limit=1'
//geocode(geocodeUrl, (data) => {
//    console.log(data)
//})