const express = require('express');
const socket = require('socket.io');
const http= require('http');
const path= require('path')
const {generateMsg} = require('./utils/helpers');

const app = express();
const server=http.createServer(app);
const io=socket(server);

const port =process.env.PORT || 9000
const publicPath=path.join(__dirname,'/client');
app.use(express.static(publicPath));


io.on('connection', (client) => {
   console.log('A new user is connected');
   client.emit('newMsg', generateMsg('Admin', "Welcome to Chat-UCD"));
   client.broadcast.emit('newMsg', generateMsg('Admin', "A new User has Joined.."))

   client.on('createMsg', (msg, callback) => {
      console.log('messgae created \n', msg);
      io.emit('newMsg', generateMsg(msg.from, msg.text));
      callback();

   });


   client.on('disconnect', () => {
      client.broadcast.emit('newMsg', generateMsg('Admin', "A User has left.."))
   });

});

server.listen(port,()=>{
   console.log('server is running on port '+port);
})