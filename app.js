var express = require('express');

// Load cors modulle
var cors = require('cors');

// Load boady-parser
var bodyParser = require('body-parser')

// Load terms and definitions via JSON file
var skierTerms = require('./dict.json');

var fs = require('fs');

var app = express();

// for each request the ".use" will be invoked

// Middleware for body-parsing og JSON data
app.use(bodyParser.json());

// Form URL encoding. Note: For large nested data use exteded: true option
app.use(bodyParser.urlencoded({ extended: false }))

// Middleware
app.use(function(req, res, next){
    console.log(`${req.method} for ${req.url} Body: ${JSON.stringify(req.body)}`);
    
    // This will move to next operation
    next();
})

// serve static files
app.use(express.static('./public'));

// Enable cors for this app
app.use(cors());

// Custom GET Route
app.get('/dictionary-api', function(req, res){
    res.json(skierTerms);
});

app.post('/', function(req, res){

    skierTerms.push(JSON.parse(JSON.stringify(req.body)));
    
    fs.writeFile('./dict.json', JSON.stringify(skierTerms, null, 2), function(err){
        if (err) {
            throw err
        }
        console.log('New data successfully added!');
    });

    res.json(skierTerms);
});

app.delete('/delete/:term', function(req, res){
    skierTerms = skierTerms.filter(function(item){
        return item.term.toLowerCase() !== req.params.term.toLowerCase()
    });
    fs.writeFile('./dict.json', JSON.stringify(skierTerms, null, 2), function(err){
        if (err) {
            throw err;
        }
    });
    res.json(skierTerms);
})

app.listen(9000);

console.log('Express app running on port 9000');

module.exports = app;