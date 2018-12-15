var express = require('express'); //express
var app = express();
var port =   process.env.PORT || 3000;
var address =  '192.168.1.46' || 'localhost';

app.set('port',port );
app.set('host', address);

app.get('/', function (req, res) {
      console.log("racine");
  
})
.listen(app.get('port'), address, () => {
  console.log("Server running on port 3000 s " +app.get('host') + ':' + app.get('port') );
});