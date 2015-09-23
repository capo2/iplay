var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var secret = 'this is the secret secret secret 12356';

var app = express();

app.use('/api', expressJwt({secret: secret}));

app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/'));

app.use(function(err, req, res, next){
  if (err.constructor.name === 'UnauthorizedError') {
    res.status(401).send('Unauthorized');
  }
});

app.post('/authenticate', function (req, res) {
  //TODO validate req.body.username and req.body.password
   if (!(req.body.username === 'stefan.giegerich' && req.body.password === 'versata!')) {
    res.status(401).send('Wrong user or password');
    return;
  }

  var profile = {
    first_name: 'Stefan',
    last_name: 'Giegerich',
    email: 'giegerich@imperial.com',
    id: 123
  };

  var token = jwt.sign(profile, secret, { expiresInMinutes: 60*5 });

  res.json({ token: token });
});

app.get('/api/restricted', function (req, res) {
  console.log('user ' + req.user.email + ' is calling /api/restricted');
  res.json({
    name: 'Imperial Data...'
  });
});

app.listen(8080, function () {
  console.log('listening on http://localhost:8080');
});
