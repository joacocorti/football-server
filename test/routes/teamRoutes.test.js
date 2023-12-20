const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../src/index");
const expect = chai.expect;
const supertest = require("supertest");

chai.use(chaiHttp);

const requester = supertest("http://localhost:4000");

describe("Team Routes", () => {
  //  /teams Test
  describe("GET /teams", () => {
    it("should respond with status 200", async () => {
      const response = await requester.get("/teams");
      expect(response.statusCode).to.equal(200);
      expect(response.ok).to.be.true;
      expect(response.body).to.be.an("array");
    });
  });

  //  /teams/:teamId/matches Test
  describe("GET /teams/:teamId/matches", () => {
    it("should respond with status 200 for a valid team ID", async () => {
      const teamId = 80; 
      const response = await requester.get(`/teams/${teamId}/matches`);
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.be.an("array");
    });
  });

  //  /teams/:teamId/players Test
  describe("GET /teams/:teamId/players", () => {
    it("should respond with status 200 for a valid team ID", async () => {
      const teamId = 80; 
      const response = await requester.get(`/teams/${teamId}/players`);
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.be.an("array");
    });
  });

  //  /teams/:teamId/ Test
  describe("GET /teams/:teamId/", () => {
    it("should respond with status 200 for a valid team ID", async () => {
      const teamId = 80; 
      const response = await requester.get(`/teams/${teamId}`);
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.be.an("array");
    });
  });
});