const server = require("./server");
const request = require("supertest");

let testServer = request(server);
//  {
//     title: 'Pacman', // required
//     genre: 'Arcade', // required
//     releaseYear: 1980 // not required
//   }
describe("server", () => {
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
          title: "Megaman",
          genre: "Action",
          releaseYear: 1990
        })
        .expect({
          title: "Megaman",
          genre: "Action",
          releaseYear: 1990,
          id: 1
        });
    });
    it("Returns the right status when a game is created", () => {
      return testServer
        .post("/games")
        .send({
          title: "Megaman",
          genre: "Action",
          releaseYear: 1990
        })
        .expect(201);
    });
  });
  it("resets the games", () => {
    return testServer.delete("/games").expect(200);
  });
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
      await testServer.post("/games").send(game);
      const res = await testServer.get("/games");
      const games = JSON.parse(res.text);
      expect(games.length).toBe(2);
    });
  });
});
