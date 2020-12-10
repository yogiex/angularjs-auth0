var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var cors = require('cors')
var port = process.env.PORT || 8080;
require('dotenv').config()

var jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: process.env.jwksUri
    }),
    audience: process.env.audience,
    issuer: process.env.issuer,
    algorithms: ['RS256']
});
app.use(cors());
app.use(jwtCheck);

app.get('/authorized', function (req, res) {
    res.json({message: 'this is secured endpoint'});
});

app.listen(port);
console.log('server running on localhost 8080')

// rest client unix $curl -i http://localhost:8080/authorized -H "Authorization: Bearer nomertoken123123"