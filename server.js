const express = require('express');
const postsRouter = require('./data/seeds/03-posts-router.js');

const server = express();

server.use(express.json());
server.use('/api/posts', postsRouter);

module.exports = server;