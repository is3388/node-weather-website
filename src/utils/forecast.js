const request = require('request')

const forecast = (longitude, latitude, callback)=>
{
    const url = 'http://api.weatherstack.com/current?access_key=33d3aa965e13ebd36a15ef5a34093c8d&query=' + latitude + ',' + longitude + '&units=f'
    request( { url: url, json: true}, ( error, response ) =>
{
    if (error)
    {   // low level network connection error
        callback('Unable to connect to the weather service!', undefined)
    }
    else if (response.body.error) //input error
    {
        callback('Unable to find location.', undefined)
    }
    else
    {
    callback( undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out.'
    + 'It feels like ' +  response.body.current.feelslike + ' degrees out.')// look up weatherstack.com 
}
})
}

module.exports = forecast
