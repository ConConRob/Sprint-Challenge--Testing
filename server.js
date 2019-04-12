const express = require("express");
const server = express();
server.use(express.json());

const games = [];
const id = 1;
server.post("/games", (req, res) => {
  const { title, genre, releaseYear } = req.body;
  if (!title || !genre) {
    res.sendStatus(422);
  } else {
    games.push({ title, genre, releaseYear, id });
    res.status(201).json(games.find(game => game.id === id));
    ++id;
  }
});

module.exports = server;
