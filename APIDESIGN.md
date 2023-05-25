| Actions             | Inputs/Data                                                   | Pre Condition(s)                                                                                                     | Post Condition(s)                                                                                                                                                   | API Endpoint                                                                                                                             |
|---------------------|---------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| User Plays a card   | 1.user_id<br>2.game_id<br>3.color<br>4.value<br>5.specialcard | 1.user_id in game_users<br>2.it is user_id turn<br>3.user_id has the card in hand<br>4.user_id playing card is legal | 1.current_number, current_color is updated<br>2.next player's turn<br>3.current_game receives an update<br>4.players receive an emit if card is added to their hand | Post /play/:id <br><br>{game_id, user_id, card}<br><br>{game_id is provided and user_id is in session}                                   |
| User Creates a game | 1.user_id<br>2.game_id<br>3.created_at                        |                                                                                                                      | 1. A new game created (created a game_id)<br>2. User_id is set to the username<br>3. Player is redirected to the lobby waiting for other players                    | POST /create <br><br>{ id, username, is_alive, is_started, created_at }<br><br>{Creates a new game in game table}                        |
| User Logins         | 1.username<br>2.email<br>3.password                           | 1.User_id must match in Users<br>2.email must match in Users<br>3.password must match in Users                       | 1. Lobby page is now authenticated<br>2. Able to create a game                                                                                                      | GET /login <br><br>{ username, email, password }<br><br>{user_id is now in the session}                                                  |
| User Registers      | 1.username<br>2.email<br>3.password                           | 1. must not be logged in<br>2. must be a valid username,email<br>3. must have a minlength(8)                         | 1. User_id is now in Users<br>2. Sent to Lobby Page which is authenticated                                                                                          | POST /register <br><br>{ username, email, password }<br><br>{user_id is now in users}                                                    |
| User draws a card   | 1.user_id<br>2.game_id<br>3.card                              | 1. Be player's turn or have a special card done to player drawing<br>2. user_id is in game_users                     | 1. updates deck (takes away card drawn)<br>2. updated current state of the user<br>3. emits to the user                                                             | GET /:id/draw<br><br>{ user_id, game_id }                                                                                                |
| User starts game    | 1.user_id<br>2.game_id<br>3.is_started<br>4.is_alive          | 1. Must have another player in same game                                                                             | 1. Cards get shuffled and drawn out                                                                                                                                 | GET /:id/start<br><br>{ user_id, game_id }<br><br>{game and current game is created, username is set to user_id, is_started set to true} |
| User sends a chat   | 1.user_id<br>2.game_id<br>3.message [body]                    | 1. user_id must be in user table<br>2. user_id must be in a game table                                               | 1. updates const data with new id, username, timestamp<br>2. emits the chat_message recieved                                                                        | POST /:id<br><br>{ user_id, game_id, body}<br><br>{username provided in session}                                                         |
| User joins a game   | 1.user_id<br>2.game_id<br>3.is_alive<br>4.is_started          | 1. game_id must be a game <br>2. is_alive must be true<br>3. is_started must be false                                | 1. user_id is now in current_game                                                                                                                                   | GET /:id/join<br><br>{ user_id, game_id }<br><br>{user_id is now in current_game}                                                        |
| User exits a game   | 1.user_id<br>2.game_id                                        |                                                                                                                      | 1. if user_id is username then is_alive is set to false<br>2. user_id is no longer in game / current_game                                                           | POST /exit/:id<br><br>{ user_id, game_id }<br><br>{user_id is no longer in game / current_game}                                          |