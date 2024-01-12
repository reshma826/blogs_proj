const { Sequelize } = require("sequelize");

const config = require("../config/config");

const sequelize = new Sequelize({
  dialect: config.sql_config.DIALECT,
  host: config.sql_config.HOST,
  username: config.sql_config.USER,
  password: config.sql_config.PASSWORD,
  database: config.sql_config.DB,
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.blogDetails = require("./blogDetails.model")(sequelize, Sequelize);

module.exports = db;
