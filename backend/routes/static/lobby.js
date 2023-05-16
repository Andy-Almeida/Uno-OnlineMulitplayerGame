const express = require("express");
const Games = require("../../db/games.js");

const router = express.Router();

router.get("/", async (request, response) => {
  const { id: user_id } = request.session.user;

  const availableGames = await Games.getAvailableGames(user_id); //Games that the user is not in that is_running = false
  const reJoinGames = await Games.getGames(user_id); //Games that the user is in that is_running = true
  const runningGames = await Games.getRunningGames(user_id);

  response.render("lobby", {
    title: "Team X term project",
    availableGames: availableGames,
    reJoinGames: reJoinGames,
    runningGames: runningGames,
  });
});

module.exports = router;
