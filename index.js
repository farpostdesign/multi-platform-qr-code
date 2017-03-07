var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('OK')
})

app.listen(3000, function () {
  console.log('Express app listening on port 3000')
})