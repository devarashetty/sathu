var express = require('express');
var app = express();

app.listen(3000);

app.get('/bundle.js',function(req,res){
  console.log(__dirname+'/bundle/main.js');
  res.sendFile(__dirname+'/bundle/main.js')
})

app.get('*',function(req,res){
  res.sendFile(__dirname+'/index.html')
})

