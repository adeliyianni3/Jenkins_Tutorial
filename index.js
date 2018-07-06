const express = require('express')
const app = express();

app.get('/randomNumber', (req, res)=>{
    res.send(`${Math.random()}`);
})

const server = app.listen(8000, ()=>{
    console.log('app running...');
});

module.exports = server;
