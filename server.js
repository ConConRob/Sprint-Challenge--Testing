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

server.get("/games", (req, res) => {
  res.status(200).json(games);
});

server.delete("/games", (req, res) => {
  games.splice(0, games.length);
  res.sendStatus(200);
});

module.exports = server;
