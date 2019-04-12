const server = require("./server");
const request = require("supertest");

const testServer = request(server);
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
        .send({ title: "Megaman", releaseYear: 1990 })
        .expect(422);
    });
    it("posts and returns the new game when sent all required data", () => {
      return testServer
        .post("/games")
        .send({ title: "Megaman", genre: "Action", releaseYear: 1990 })
        .expect({
          title: "Megaman",
          genre: "Action",
          releaseYear: 1990,
          id: 1
        });
    });
  });
});
