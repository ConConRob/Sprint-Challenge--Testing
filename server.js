const express = require("express");
const server = express();
server.use(express.json());

server.post("/games", (req, res) => {
  const { title, genre, releaseYear } = req.body;
  if (!title || !genre) {
    res.sendStatus(422);
  }
});

module.exports = server;
