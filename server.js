// dependencies for Express Server
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// set up listener, Port 5000
app.listen(port, () => { console.log("Listening on port 5000") });


// Format 
function getYelpData (callBack) {
    function handleResponse(error, response, body) {
        console.log('------------------------------------------------------------Results--------------------------------------------------------------');
        console.log(' ');
        console.log(body);
        console.log(' ');
        console.log('------------------------------------------------------------End Results--------------------------------------------------------------');
        callBack(body);
    };
    
    let options = {
        // term should equal "restaurant", "food" or "beer" -- anything keyword you want to search
        // location can be anywhere
        // limit is a param that specifies the number of results to return.
        url: 'https://api.yelp.com/v3/businesses/search?term=restaurants&location=Malibu&limit=1',
        headers: {
            'Authorization': 'Bearer 4FphwD6tGKVKOyAcxCMxlrhlXEYAPHOQmdQ1q36R8hjaReA7L_Na6lGdZQyV3jJkZHqW0ejiDp5t0LgojC5Cj34nPNcKKJIS2hwYmYkUO1bjq0Pi2zOYRDRx-A0yXnYx'
        }
    };
    
    // setting GET request to YELP API
    const request = require('request');


    // Make API request
    request(options, handleResponse);
}



// Send API results to "localhost:50000/results"
app.get('/results', function (req, res) {

    getYelpData(function(data) {
        res.json( {data: data} );
    });
});