const {Pool} = require('pg')
const dotenv = require('dotenv')

const pool = new Pool({
  host: dotenv.POSTGRESQL_HOST,
  port: dotenv.POSTGRESQL_PORT,
  user: dotenv.POSTGRESQL_USER,
  password: dotenv.POSTGRESQL_PASSWORD,
  database: dotenv.POSTGRESQL_DATABASE,
});

const getTeamMatches = async (req, res) => {
  const teamId = req.params.teamId;
  const response = await pool.query(
    "SELECT * FROM matches WHERE team_id = $1",
    [teamId]
  );
  res.status(200).json(response.rows);
};

const getTeamPlayers = async (req, res) => {
  const teamId = req.params.teamId;
  const response = await pool.query(
    "SELECT * FROM players WHERE team_id = $1",
    [teamId]
  );
  res.status(200).json(response.rows);
};

module.exports = {
  getTeamMatches,
  getTeamPlayers,
};
