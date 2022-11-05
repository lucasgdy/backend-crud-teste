"use strict";
const { Sequelize, DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tb_containers", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      idClient: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "tb_clients", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      name: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true,
      },
      type: {
        type: DataTypes.ENUM({
          values: ["20", "40"],
        }),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM({
          values: ["Vazio", "Cheio"],
        }),
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM({
          values: ["Importação", "Exportação"],
        }),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {},
};
