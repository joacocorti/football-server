const {
  setMatches,
  setTeamPlayers,
  setTeams,
} = require("../controllers/index.controller");
require("dotenv").config();
const axios = require("axios");



const fetchAndSaveData = async (from, to, leagueId) => {
  const apiKey = process.env.API_KEY;
  const url_events = `https://apiv3.apifootball.com/?action=get_events&from=${from}&to=${to}&league_id=${leagueId}&APIkey=${apiKey}`;
  const url_teams = `https://apiv3.apifootball.com/?action=get_teams&league_id=${leagueId}&APIkey=${apiKey}`;
  try {
    const response_teams = await axios.get(url_teams, { timeout: 100000 });
    const teams = response_teams.data;
    const response_events = await axios.get(url_events, { timeout: 100000 });
    const events = response_events.data;

    events.forEach(async (event) => {
      const matchData = {
        matchId: event.match_id,
        matchDate: event.match_date,
        matchHomeTeamId: event.match_hometeam_id,
        matchHomeTeamName: event.match_hometeam_name,
        matchHomeTeamScore: event.match_hometeam_score,
        teamHomeBadge: event.team_home_badge,
        matchAwayTeamId: event.match_awayteam_id,
        matchAwayTeamName: event.match_awayteam_name,
        matchAwayTeamScore: event.match_awayteam_score,
        teamAwayBadge: event.team_away_badge,
      };
      await saveMatchData(matchData);
    });
    teams.forEach(async (team) => {
      const teamId = team.team_key;
      const matchTeamData = {
        teamKey: teamId,
        teamName: team.team_name,
        teamCountry: team.team_country,
        teamFounded: team.team_founded,
        teamBadge: team.team_badge,
      };
      await saveTeamsData(matchTeamData);

      team.players.forEach(async (player) => {
        const matchTeamPLayersData = {
          teamId: teamId,
          player_id: player.player_id,
          player_image: player.player_image,
          player_name: player.player_name,
          player_number: player.player_number,
          player_type: player.player_type,
        };
        await saveTeamPlayerData(matchTeamPLayersData);
      });
    });
  } catch (error) {
     console.error("Error fetching or saving data:", error);
  }
};
const saveMatchData = async (matchData) => {
  try {
    const req = { body: matchData };
    const res = {
      status: function (statusCode) {
        this.statusCode = statusCode;
        return this;
      },
      json: function (data) {
        console.log("Response:", this.statusCode, data);
      },
    };
    await setMatches(req, res);
  } catch (error) {
    console.error("Error saving match data:", error);
  }
};
const saveTeamsData = async (matchTeamData) => {
  try {
    const req = { body: matchTeamData };
    const res = {
      status: function (statusCode) {
        this.statusCode = statusCode;
        return this;
      },
      json: function (data) {
        console.log("Response:", this.statusCode, data);
      },
    };
    await setTeams(req, res);
  } catch (error) {
    console.error("Error saving match data:", error);
  }
};
const saveTeamPlayerData = async (matchTeamPLayersData) => {
  try {
    const req = { body: matchTeamPLayersData };
    const res = {
      status: function (statusCode) {
        this.statusCode = statusCode;
        return this;
      },
      json: function (data) {
        console.log("Response:", this.statusCode, data);
      },
    };
    await setTeamPlayers(req, res);
  } catch (error) {
    console.error("Error saving match data:", error);
  }
};

module.exports = {
  fetchAndSaveData,
  saveMatchData,
  saveTeamsData,
  saveTeamPlayerData,
};