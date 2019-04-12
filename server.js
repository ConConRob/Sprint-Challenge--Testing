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
    if (games.find(game => game.title === title)) {
      res.sendStatus(405);
    } else {
      games.push({ title, genre, releaseYear, id });
      res.status(201).json(games.find(game => game.id === id));
      ++id;
    }
  }
});

server.get("/games", (req, res) => {
  res.status(200).json(games);
});

server.get("/games/:id", (req, res) => {
  const game = games.find(game => game.id === req.params.id * 1);
  if (game) {
    res.status(200).json(game);
  } else {
    res.sendStatus(404);
  }
});

server.delete("/games", (req, res) => {
  games.splice(0, games.length);
  res.sendStatus(200);
});

module.exports = server;
