const express = require('express');
const socket = require('socket.io');
const http = require('http');
const path = require('path')
// const functions= require('firebase-functions');
const { generateMsg } = require('./utils/helpers');
const publicPath = path.join(__dirname,'dist');
const port = process.env.PORT || 9000


const app = express();
app.use(express.static(publicPath));
const server = http.createServer(app).listen(port);
const io = socket(server);



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

