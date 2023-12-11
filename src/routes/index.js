const {Router } = require('express');
const { getUsers } = require('../controllers/index.controller');
const router = Router();
const controller = require("../controllers/index.controller");

router.get('/users', getUsers);
router.get("/teams/:teamId/matches", controller.getTeamMatches);
router.get("/teams/:teamId/players", controller.getTeamPlayers);




module.exports = router;