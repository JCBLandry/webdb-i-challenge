const express = require('express');

const db = require('./data/dbConfig.js');

const AccountRouter = require('./accounts/account-router.js')

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountRouter)


server.get('/', (req, res) => {
  res.send('<h1>API Running</h1>')
})

module.exports = server;