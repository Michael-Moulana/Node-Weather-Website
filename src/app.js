const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//template engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Michael Moulana'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Michael Moulana'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'this is a help message',
        name: 'Michael Moulana'
    })
})

app.get('/weather', (req, res) => {
    // url: localhost:3000/weather?address=london
    if (!req.query.address) {
        return res.send({
            error: 'you must provide a search term'
        })
    }

    forecast(req.query.address, (error, { city, region, country, latitude, longitude, localtime, weather_descriptions, temperature, feelslike, humidity, wind_speed } = {}) => {
        if (error) {
            return res.send({
                //error: error
                error
            })
        }
        res.send({
            city, 
            region, 
            country, 
            latitude, 
            longitude, 
            localtime, 
            weather_descriptions, 
            temperature, 
            feelslike, 
            humidity, 
            wind_speed
        })
    })


    // geocode(req.query.address, (error, {latitude, longitude} = {} ) => {
    //     if (error) {
    //         return res.send({
    //             //error: error
    //             error
    //         })
    //     }

    // })
})


app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }

    res.send({
        product: []
    })
})


// match anything after /help
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Michael Moulana',
        errorMessage: 'help article not found !'
    })
})

// '*' match anything that hasn't been matched so far
// this route handler comes last
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Michael Moulana',
        errorMessage: 'page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
})