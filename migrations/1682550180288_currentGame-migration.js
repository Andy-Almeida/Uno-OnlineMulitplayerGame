/* eslint-disable camelcase */

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.up = pgm => {
  pgm.createTable("currentgame", {
    game_id: {
      type: "int",
      notNull: true,
    },
    player_count: {
      type:"int",
      notNull:true,
    },
    lastupdated : {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    current_number: {
      type: "int",
      notNull: true,
    },
    current_color:{
      type:"varchar(256)",
      notNull:true,
    },
    current_direction:{
      type:"boolean",
      notNull:true,
    },
  });

};

/**
 * @param {import("node-pg-migrate/dist/types").MigrationBuilder} pgm
 */
exports.down = pgm => {
  pgm.dropTable("currentgame");
};