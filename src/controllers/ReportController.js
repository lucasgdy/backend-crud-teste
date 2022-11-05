const Movement = require("../models/Movement");
const { Op, DataTypes } = require("sequelize");
const connection = require("../database");

module.exports = {
  async ReportByClientAndTypeMovement(req, res) {
    try {
      const report = await Movement.count({
        attributes: ["type"],
        group: ["type", "Container.Client.name"],
        include: [
          {
            association: "Container",
            attributes: ["id"],
            include: [
              {
                association: "Client",
                attributes: ["name"],
              },
            ],
          },
        ],
      });
      if (!report) {
        res.status(404).send({
          message: "Nenhum registro encontrado.",
        });
      } else {
        return res.status(200).json(report);
      }
    } catch (error) {
      res.status(400).send({
        message: "Erro ao consultar.",
      });
    }
  },
  async ReportByTypeOfContainer(req, res) {
    try {
      const report = await Movement.count({
        attributes: [],
        group: ["Container.category"],
        include: [
          {
            association: "Container",
            attributes: ["category"],
          },
        ],
      });
      if (!report) {
        res.status(404).send({
          message: "Nenhum registro encontrado.",
        });
      } else {
        return res.status(200).json(report);
      }
    } catch (error) {
      res.status(400).send({
        message: "Erro ao consultar.",
      });
    }
  },
};
