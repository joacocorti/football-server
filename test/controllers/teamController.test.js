const chai = require("chai");
const expect = chai.expect;
const { getTeamMatches } = require("../../src/controllers/index.controller");

describe("Team Controller", () => {
  describe("getTeamMatches", () => {
    it("should retrieve matches for a given team", async () => {
      const req = { params: { teamId: "80" } };
      const res = {
        json: function (response) {
          expect(response).to.be.an("array");
        },
        status: function (statusCode) {
          this.statusCode = statusCode;
          return this;
        },
      };

      await getTeamMatches(req, res);
      expect(res.statusCode).to.equal(200);
    });
  });
});
