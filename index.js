const express = require('express')
const app = express();

app.get('/randomNumber', (req, res)=>{
    res.send(`${Math.random()*10}`);
})

const server = app.listen(8000, ()=>{
    console.log('app running...');
});

module.exports = server;
