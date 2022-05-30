const path = require('path')
const express = require('express')
const hbs = require('hbs')
const temp = require('../functions/temp.js')
const geocode = require('../functions/geocode.js')
const { response } = require('express')
require('http')

const app = express()
const port = process.env.PORT || 3000
const PublicDirPath = path.join(__dirname, '/public')
const ViewsDirPath = path.join(__dirname, '/public/views')
const PartialsDirPath = path.join(__dirname, '/public/partials')

app.use(express.static(PublicDirPath))
app.set('view engine', 'hbs')
app.set('views', ViewsDirPath)
hbs.registerPartials(PartialsDirPath)


app.get('', (req, res) => {
    res.render('index', {
        title: 'CheckWeatherHere!',
        name: 'Shalini'

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Needed?',
        description: 'Check if you have entered valid country name',
        name: 'Shalini'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        status: 'This is a weather checking page.',
        name: 'Shalini'
    })
})

//app.get('/weather', (req, res) => {
//    res.render('weather', {
//        title: 'Weather Checking',
//        status: 'Hot',
//        name: 'Shalini Bhattacharya'
//    })
//})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send('Please provide an address')
    }
    geocode(req.query.address, (error, response) => {
        if (error) {
            res.send({ error: error })

        }
        else {
            temp(response.latitude, response.longitude, (error, forecastData) => {
                if (error) {
                    res.send({ error: error })
                }
                else {
                    res.send({
                        latitude: response.latitude,
                        longitude: response.longitude,
                        location: response.location,
                        temperature: forecastData

                    })


                }
            })
        }
    })
})

app.get('/pp', (req, res) => {
    res.render('pp', {
        title: 'Privacy Policy',
        name: 'Shalini'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'ERROR:404',

    })
})
app.listen(port, () => {
    console.log('server is up on' + port)
})