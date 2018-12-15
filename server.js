var express = require('express'); //express
var app = express();
var port =  5000;
var address =  '127.0.0.1';

app.set('port',port );
app.set('host', address);

app.get('/', function (req, res) {
      console.log("racine");
  
})
.listen(app.get('port'), address, () => {
  console.log("Server running on port 5000 s " +app.get('host') + ':' + app.get('port') );
});