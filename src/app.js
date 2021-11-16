// node core module called path to work with path
const path = require('path')
// load in hbs for partials
const hbs = require('hbs')
// import two functions from utils folder
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//load the npm express library for set up server
const express = require('express')

//a single express function to create a new express app
const app = express() // no argument as we can configure server using other methods

// set up custom path for views location
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath) // skip this if you use default that Express expect
// default is all hbs files under views folder not template folder


// set up path for partials
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handlebars engine and views location
// in case we use express to render template not static page. We tell express which templating engine installed, pass in the engine name and the name of the module
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// define path for Express configuration
// to tell express server the directory called public to be served up
// use join function to create a new path pointing to public folder
const publicDirectoryPath = path.join(__dirname, '../public')
// express.static function return the value that takes the path to the folder to be served up
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => 

{
    res.render('index', {
        title: 'Weather App',
        name: 'Iris'
    }) // use render method and pass in the name of the page index.hbs
})

// another request for help route
app.get('/help', (req, res) =>
{
    //res.send('Help page')
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text',
        name: 'Iris'
    })
})

// request for about route
app.get('/about', (req, res) => 

{
    //res.send('About page') // view in browser
    //res.send('<h1>About</h1>')
    res.render('about', {
        title: 'About Me',
        name: 'Iris'
    })
})

app.get('/weather', (req, res) => 

{   if (!req.query.address)
    {
        res.send({error: 'You must provide an address!'})
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>
    {
        if (error)
        {
            return res.send({ error: 'No such address found'})
        }
        forecast(latitude, longitude, (error, forecastData) =>
        {
            if (error)
            {
                return res.send({ error})
            }
            res.send({
                forecast: forecastData,
                location, // location is accessible because passing from the outer function
                address: req.query.address
            })
        })
    })
})
   
// set up route for anything after /help not found
app.get('/help/*', (req, res) => 

{
    res.render('404', {
        title: '404',
        name: 'Iris',
        errorMessage: 'Help article not found'
    }) 
}) 

// set up route for anything not match the above route handler
app.get('*', (req, res) => 

{
    res.render('404', {
        title: '404',
        name: 'Iris',
        errorMessage: 'Page not found'
    }) 
}) 

// start serve up and use the following only one time in our app
// listen to specific port (dev port but not a default)
// 1st argu is port number and 2nd is callback function as it's asychrnonous call
app.listen(3000, () =>
{
  console.log('Server is up!')
})

// server stay up to listen and process future request.
// to stop the server, use control + C
// if add something new to the code, restart the server