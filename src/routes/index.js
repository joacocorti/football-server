const {Router } = require('express');
const router = Router();
const controller = require("../controllers/index.controller");

router.get("/teams/:teamId/matches", controller.getTeamMatches);
router.get("/teams/:teamId/players", controller.getTeamPlayers);
router.get("/teams/:teamId/", controller.getTeam);
router.get("/teams", controller.getTeams);




module.exports = router;