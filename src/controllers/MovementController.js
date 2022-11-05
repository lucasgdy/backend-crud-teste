const Movement = require("../models/Movement");
const { Op, DataTypes } = require("sequelize");
const connection = require("../database");

module.exports = {
  async showById(req, res) {
    try {
      const { id } = req.params;
      const movements = await Movement.findByPk(id, {
        include: [
          {
            required: false,
            right: true,
            association: "Container",
            include: [{ association: "Client" }],
          },
        ],
      });
      if (!movements) {
        res.status(404).send({
          message: "Nenhum registro encontrado.",
        });
      } else {
        return res.status(200).json(movements);
      }
    } catch (error) {
      res.status(400).send({
        message: "Erro ao consultar.",
      });
    }
  },
  async index(req, res) {
    try {
      const movements = await Movement.findAll({
        include: [
          {
            required: true,
            right: true,
            association: "Container",
            include: [
              {
                required: true,
                right: true,
                association: "Client",
              },
            ],
          },
        ],
      });
      if (!movements) {
        res.status(404).send({
          message: "Nenhum registro encontrado.",
        });
      } else {
        return res.status(200).json(movements);
      }
    } catch (error) {
      res.status(400).send({
        message: "Erro ao consultar.",
      });
    }
  },
  async store(req, res) {
    try {
      const { idContainer, type, startDate, endDate } = req.body;
      console.log(idContainer);
      const movements = await Movement.create({
        idContainer,
        type,
        startDate,
        endDate,
      });
      return res.status(201).json(movements);
    } catch (error) {
      res.status(400).send({
        message: "Erro ao cadastrar.",
      });
    }
  },
  async save(req, res) {
    try {
      const { idContainer, type, startDate, endDate } = req.body;
      const { id } = req.params;
      const ifExist = await Movement.findByPk(id);
      if (!ifExist) {
        res.status(404).send({
          message: "Nenhum registro encontrado.",
        });
      } else {
        const movements = await Movement.update(
          { idContainer, type, startDate, endDate },
          { where: { id } }
        );
        return res.status(200).json(movements);
      }
    } catch (error) {
      res.status(400).send({
        message: "Erro ao atualizar.",
      });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const ifExist = await Movement.findByPk(id);
      if (!ifExist) {
        res.status(404).send({
          message: "Nenhum registro encontrado.",
        });
      } else {
        await Movement.destroy({ where: { id } });
        return res.status(204).json();
      }
    } catch (error) {
      res.status(400).send({
        message: "Erro ao excluir.",
      });
    }
  },
};
