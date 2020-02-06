// dependencies for Express Server & query string parsing
const express = require('express');
const app = express();
var url = require('url');
const apiURL = 'https://api.yelp.com/v3/businesses/search?term=restaurants&location=Malibu&limit=1';

// setting GET request to YELP API
const request = require('request');

// search term vars
let final_term = '';
let final_location = '';
let final_sort_by = '';

// set up listener, Port 5000
app.listen(5000, () => {
    console.log("Listening on port 5000");
});

// This helps bypass any cross origin issues
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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
        url: 'https://api.yelp.com/v3/businesses/search?' + 'term=' + final_term + '&location=' + final_location + '&sort_by=' + final_sort_by,
        headers: {
            'Authorization': 'Bearer 4FphwD6tGKVKOyAcxCMxlrhlXEYAPHOQmdQ1q36R8hjaReA7L_Na6lGdZQyV3jJkZHqW0ejiDp5t0LgojC5Cj34nPNcKKJIS2hwYmYkUO1bjq0Pi2zOYRDRx-A0yXnYx'
        }
    };

    request(options, handleResponse);
}

app.get('/results', function (request, response) {
    
    console.log(response.req.query.term);
    console.log(response.req.query.location);
    console.log(response.req.query.sort_by);

    final_term = response.req.query.term;
    final_location = response.req.query.location;
    final_sort_by = response.req.query.sort_by;

    getYelpData(function(data) {
        response.send(data);
    });
});