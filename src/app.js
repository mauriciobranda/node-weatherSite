const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public') //caminho da pasta public ... static directory para TODAS as paginas
const viewsPath = path.join(__dirname, '../templates/views')
const partialsviewsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine Views Location
app.set('view engine', 'hbs')//to setup handlebars !
app.set('views', viewsPath)

hbs.registerPartials(partialsviewsPath)

// Setup static directory
app.use(express.static(publicDirectoryPath))

app.get('', function(req, res){ //o que acontece se alguem visitar essa pagina
    res.render('index',{
        name:'Mauricio',
        title: 'The Weather Page'
    })
})

app.get('/about', function(req, res){ //o que acontece se alguem visitar essa pagina
    res.render('about',{
        name:'Mauricio',
        title: 'The About Page'
    })
})

app.get('/help', function(req, res){ //o que acontece se alguem visitar essa pagina
    res.render('help',{
        name:'Mauricio',
        title: 'The HELP Page'
    })
})

app.get('/weather', function(req, res){ //o que acontece se alguem visitar essa pagina
    
    if (!req.query.search){
        return res.send({ //uma vez que retornou, já desaloca a funcao
            error:"Please, provide a search term!"
        })
    }else
    {

        const address = req.query.search;

        geocode(address, function(error, {latitude, longitude, location}){ // parametros e o callback
            if (error){
                return res.send({error})
            }
            forecast(latitude, longitude, function(error, forecastData){
                    if (error){
                        return res.send({error})
                    }

                    res.send({
                        forecast: forecastData,
                        location,
                        address
                    })
            })
        })
    }
})

app.get('/products', function(req, res){ //o que acontece se alguem visitar essa pagina
    if (!req.query.search){
        return res.send({ //uma vez que retornou, já desaloca a funcao
            error:"Please, provide a search term!"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
        
    })
})

app.get('/help/*', function(req, res){
    //res.status(404).send('Help Article not FOUND !');
    if (res.statusCode=404) {
        res.render('helparticle',{
            name:'Mauricio',
            title: 'Help Article not FOUND!'
        })
    }
  });

//Handling Errors
app.get('*', function(req, res){
    //res.status(404).send('Error 404');
    if (res.statusCode=404) {
        res.render('error404',{
            name:'Mauricio',
            title: 'The Weather SubPage'
        })
    }
  });

app.listen(3000, function(){
    console.log('Running the app!')
})


