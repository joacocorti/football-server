require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.POSTGRESQL_HOST,
  port: process.env.POSTGRESQL_PORT,
  user: process.env.POSTGRESQL_USER,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRESQL_DATABASE,
});

const getTeamMatches = async (req, res) => {
  const teamId = req.params.teamId;
  const response = await pool.query(
    "SELECT * FROM matches m LEFT JOIN teams t ON m.match_awayteam_id = t.team_key OR m.match_hometeam_id = t.team_key WHERE t.team_key =  $1",
    [teamId]
  );
  res.status(200).json(response.rows);
};

const getTeamPlayers = async (req, res) => {
  const teamId = req.params.teamId;
  const response = await pool.query(
    "SELECT * FROM team_players p LEFT JOIN teams t ON p.team_id = t.team_key WHERE t.team_key = $1",
    [teamId]
  );
  res.status(200).json(response.rows);
};

const getTeam = async (req, res) => {
  const teamId = req.params.teamId;
  const response = await pool.query(
    "SELECT * FROM teams WHERE team_key = $1",
    [teamId]
  );
  res.status(200).json(response.rows);
};
const getTeams = async (req, res) => {
  const response = await pool.query(
    "SELECT * FROM teams"
  );
  res.status(200).json(response.rows);
};
const setTeams = async (req, res) => {
  const { teamKey, teamName, teamCountry, teamFounded, teamBadge } = req.body;
  try {
    const response = await pool.query(
      "INSERT INTO teams (team_key, team_name, team_country, team_founded, team_badge) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (team_key) DO UPDATE SET team_name = EXCLUDED.team_name, team_country = EXCLUDED.team_country, team_founded = EXCLUDED.team_founded, team_badge = EXCLUDED.team_badge",
      [teamKey, teamName, teamCountry, teamFounded, teamBadge]
    );

    res.status(200).json(response.rows);
  } catch (error) {
    console.error("Error saving team data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const setTeamPlayers = async (req, res) => {
  const {
    teamId,
    player_id,
    player_image,
    player_name,
    player_number,
    player_type,
  } = req.body;
  try {
    const response = await pool.query(
      "INSERT INTO team_players (team_id, player_id, player_image, player_name, player_number, player_type) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (team_id, player_id) DO UPDATE SET player_image = EXCLUDED.player_image, player_name = EXCLUDED.player_name, player_number = EXCLUDED.player_number, player_type = EXCLUDED.player_type",
      [teamId, player_id, player_image, player_name, player_number, player_type]
    );

    res.status(200).json(response.rows);
  } catch (error) {
    console.error("Error saving team player data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const setMatches = async (req, res) => {
  const {
    matchId,
    matchDate,
    matchHomeTeamId,
    matchHomeTeamName,
    matchHomeTeamScore,
    teamHomeBadge,
    matchAwayTeamId,
    matchAwayTeamName,
    matchAwayTeamScore,
    teamAwayBadge,
  } = req.body;

  const response = await pool.query(
    `INSERT INTO matches (match_id, match_date, match_hometeam_id, match_hometeam_name, match_hometeam_score, team_home_badge, match_awayteam_id, match_awayteam_name, match_awayteam_score, team_away_badge)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     ON CONFLICT (match_id) 
     DO UPDATE SET
       match_date = EXCLUDED.match_date,
       match_hometeam_id = EXCLUDED.match_hometeam_id,
       match_hometeam_name = EXCLUDED.match_hometeam_name,
       match_hometeam_score = EXCLUDED.match_hometeam_score,
       team_home_badge = EXCLUDED.team_home_badge,
       match_awayteam_id = EXCLUDED.match_awayteam_id,
       match_awayteam_name = EXCLUDED.match_awayteam_name,
       match_awayteam_score = EXCLUDED.match_awayteam_score,
       team_away_badge = EXCLUDED.team_away_badge`,
    [
      matchId,
      matchDate,
      matchHomeTeamId,
      matchHomeTeamName,
      matchHomeTeamScore,
      teamHomeBadge,
      matchAwayTeamId,
      matchAwayTeamName,
      matchAwayTeamScore,
      teamAwayBadge,
    ]
  );

  res.status(200).json(response.rows);
};

module.exports = {
  getTeamMatches,
  getTeamPlayers,
  getTeam,
  getTeams,
  setTeams,
  setTeamPlayers,
  setMatches,
};
