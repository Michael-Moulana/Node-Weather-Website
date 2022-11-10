const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=15d3e5855cbb9792b8214174266ce886&query=' + encodeURIComponent(address)

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            // js will return undefined by default anyway !
            callback('unable to connect to location services!', undefined)
        } else if (body.data.length === 0) {
            callback('unable to find location! try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
            })
            
        }
    })

}

module.exports = geocode