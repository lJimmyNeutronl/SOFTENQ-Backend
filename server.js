
const express = require('express');
const cors = require('cors');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();

const app = express();
app.use(cors());

app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.get("", (req,res)=>{
  res.send("Hell, its working...");
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.listen(3000, () => {
  console.log(`Server is running on port 3000.`);
});