const request = require('request')

const geocode = function(address, callback) { // chamo a callback quando ja tenho long e lat
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoibWF1cmljaW9icmFuZGEiLCJhIjoiY2sxZm9sYWZmMDNvdTNtcGNxb3IxOWJlMiJ9.ChDqQHUgZnTsuuIj1ANlkw&limit=1"
    //console.log(url)
    request({ url: url, json: true }, function(error, response) {
        if (error){
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length ===0){
            callback('Unable to find the location! Try another one!', undefined)
        }
        else{
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
       }
    })
}

module.exports = geocode