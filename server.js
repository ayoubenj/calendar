var express = require('express'); //express
var app = express();

app.get('/', function (req, res) {
      console.log("racine");
  
})
.listen(5000, () => {
  console.log("Server running on port 5000");
});