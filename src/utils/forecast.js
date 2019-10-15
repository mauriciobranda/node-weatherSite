const request = require('request')

const forecast = function(lat, long, callback) { // chamo a callback quando ja tenho a lat e long
    //const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoibWF1cmljaW9icmFuZGEiLCJhIjoiY2sxZm9sYWZmMDNvdTNtcGNxb3IxOWJlMiJ9.ChDqQHUgZnTsuuIj1ANlkw&limit=1"
    const url = 'https://api.darksky.net/forecast/282e364ef153a08cc7fb28c6d9dbb521/'+lat+','+long+'?units=si'

    request({ url: url, json: true }, function(error, response) {
        if (error){
            console.log("Can't connect to the service !")
        } else if (response.body.error)
        {
            console.log("Unable to find location !")
        }
        else{
           callback(undefined, {
                forecast: response.body.currently.temperature
            })

        }
            
    })
}

module.exports = forecast