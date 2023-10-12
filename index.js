
const express = require('express');
const cors = require('cors');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();

const app = express();
app.use(cors());

app.get("/getData",(req,res)=>{
  res.send("Hell, its working...");
});

app.listen(3000, () => console.log('App is running!'));

