const express = require('./node_modules/express')
const port = process.env.PORT || 8081
const path = require('./node_modules/path')
const compression = require('compression')

const app = express();

app.use(compression());

app.use(express.static(path.join(__dirname, 'public')));

var bodyParser = require('./node_modules/body-parser');
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({extended:false}));

// we are only sending the index.html for all routes 
app.get('*', function (req, res){
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

var server = app.listen(port, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Server listening at http://%s:%s', host, port);

})
