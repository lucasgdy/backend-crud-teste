const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Client = require("../models/Client");
const Container = require("../models/Container");
const Movement = require("../models/Movement");

const connection = new Sequelize(dbConfig);

Client.init(connection);
Container.init(connection);
Movement.init(connection);

Movement.associate(connection.models);
Container.associate(connection.models);
Client.associate(connection.models);

module.exports = connection;
