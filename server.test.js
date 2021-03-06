const server = require("./server");
const request = require("supertest");

let testServer = request(server);

describe("server", () => {
  beforeEach(async () => {
    await testServer.delete("/games");
  });
  afterEach(async () => {
    await testServer.delete("/games");
  });

  describe("POST /games endpoint", () => {
    it("returns a 422 when the body does not have all required data", () => {
      return testServer
        .post("/games")
        .send({
          title: "Megaman",
          releaseYear: 1990
        })
        .expect(422);
    });
    it("posts and returns the new game when sent all required data", () => {
      return testServer
        .post("/games")
        .send({
          title: "Megaman1",
          genre: "Action",
          releaseYear: 1990
        })
        .expect({
          title: "Megaman1",
          genre: "Action",
          releaseYear: 1990,
          id: 1
        });
    });
    it("Returns the right status when a game is created", () => {
      return testServer
        .post("/games")
        .send({
          title: "Megaman2",
          genre: "Action",
          releaseYear: 1990
        })
        .expect(201);
    });
    it("if game title is not unique returns status 405", async () => {
      const game = {
        title: "Megaman3",
        genre: "Action",
        releaseYear: 1990
      };
      await testServer.post("/games").send(game);
      return testServer
        .post("/games")
        .send(game)
        .expect(405);
    });
  });

  // it("resets the games", () => {
  //   return testServer.delete("/games").expect(200);
  // });

  describe("GET /games endpoint", () => {
    it("returns a status of 200", () => {
      return testServer.get("/games").expect(200);
    });
    it("Returns a array that should be length 0", async () => {
      const res = await testServer.get("/games");
      const games = JSON.parse(res.text);
      expect(games.length).toBe(0);
      expect(Array.isArray(games)).toBe(true);
    });
    it("Returns array of length 2 after 2 successful post requests", async () => {
      const game = {
        title: "Megaman",
        genre: "Action",
        releaseYear: 1990
      };
      await testServer.post("/games").send(game);
      await testServer.post("/games").send({ ...game, title: "Megaman2" });
      const res = await testServer.get("/games");
      const games = JSON.parse(res.text);
      expect(games.length).toBe(2);
    });
  });

  describe("GET /games/:id endpoint", () => {
    it("If game not found returns status 404", () => {
      return testServer.get("/games/10").expect(404);
    });
    it("if game found return the game", async () => {
      const game = {
        title: "Megaman",
        genre: "Action",
        releaseYear: 1990
      };
      const res = await testServer.post("/games").send(game);
      const newGame = JSON.parse(res.text);
      return testServer.get(`/games/${newGame.id}`).expect(newGame);
    });
  });

  describe("DELETE /games/:id endpoint", () => {
    it("If game not found returns status 404", () => {
      return testServer.get("/games/10").expect(404);
    });
    it("If game found return 204 and delete the game", async () => {
      const game = {
        title: "Megaman",
        genre: "Action",
        releaseYear: 1990
      };
      const res = await testServer.post("/games").send(game);
      const newGame = JSON.parse(res.text);

      const delRes = await testServer.delete(`/games/${newGame.id}`);
      expect(delRes.status).toBe(204);

      const resGet = await testServer.get("/games");
      const games = JSON.parse(resGet.text);
      expect(games.length).toBe(0);
    });
  });
});
