const request = require('request')

const forecast = (address, callback) => {
    const url = ('http://api.weatherstack.com/current?access_key=b8ae3f7f6c48863339b9c50e4a5a54de&query=' + encodeURIComponent(address))

    request({url, json: true}, (error, { body }) => {
        if (error) {
            // js will return undefined by default anyway !
            callback('unable to connect to location services!', undefined)
        } else if (body.success === false) {
            callback('unable to find location! try another search.', undefined)
        } else {
            callback(undefined, {
                city: body.location.name,
                region: body.location.region,
                country: body.location.country,
                latitude: body.location.lat,
                longitude: body.location.lon,
                localtime: body.location.localtime,
                weather_descriptions: body.current.weather_descriptions,
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                humidity: body.current.humidity,
                wind_speed: body.current.wind_speed

            })
        }
    })
}

module.exports = forecast