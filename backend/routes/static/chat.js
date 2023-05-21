const express = require("express");
const router = express.Router();
const events = require("../../sockets/constants.js");
const Chat = require("../../db/chat.js");

router.post("/:id/", async (request, response) => {
  const io = request.app.get("io");
  const game_id = request.params.id;
  const { message } = request.body;
  const { username, id : user_id } = request.session.user;
  io.emit(events.CHAT_MESSAGE_RECEIVED, {
    game_id : game_id,
    id,
    message ,
    username,
    timestamp: Date.now(),
  });

  response.status(200);
});

module.exports = router;
