// use mapbox.com's geocoding API to get your address (city) and convert it to lat, long

const request = require('request')
const geocode = (address, callback) =>
{
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiaXJpczM2NzciLCJhIjoiY2t2cHZmZ3JnMmlpcDJvbXQ4bTdqaXlhZCJ9.ZWMO2eMiIwTPSQWRIBjY6Q&limit=1'
   
    // or you can destructure response and become {body}
    request({ url: url, json: true}, (error, response) =>
    {
        if(error)
        {
            callback('Unable to connect to location service.', undefined)
        }
        else if(response.body.features === undefined || response.body.features.length === 0)
        {
            callback('Unable to find location. Try another search', undefined)
        }
        else
        {
            const data = { latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name,
            }
            callback(undefined, data)
        }
    }
    )
}

module.exports = geocode