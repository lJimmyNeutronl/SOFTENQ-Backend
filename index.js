const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get("/getData",(req,res)=>{
  res.send("It is over...");
});

app.listen(3000, () => console.log('App is running!'));