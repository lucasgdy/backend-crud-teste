const Client = require("../models/Client");
const { Op, DataTypes } = require("sequelize");
const connection = require("../database");

module.exports = {
  async showById(req, res) {
    try {
      const { id } = req.params;
      const clients = await Client.findByPk(id);
      if (!clients) {
        res.status(404).send({
          message: "Nenhum registro encontrado.",
        });
      } else {
        return res.status(200).json(clients);
      }
    } catch (error) {
      res.status(400).send({
        message: "Erro ao consultar.",
      });
    }
  },
  async showByLike(req, res) {
    try {
      const { name } = req.body;
      const clients = await Client.findAll({
        where: {
          name: { [Op.like]: "%" + name + "%" },
        },
        order: ["name"],
      });
      if (!clients) {
        res.status(404).send({
          message: "Nenhum registro encontrado.",
        });
      } else {
        return res.status(200).json(clients);
      }
    } catch (error) {
      res.status(400).send({
        message: "Erro ao consultar.",
      });
    }
  },
  async show(req, res) {
    try {
      const { name } = req.body;
      const clients = await Client.findOne({
        where: {
          name: { [Op.eq]: name },
        },
        order: ["name"],
      });
      if (!clients) {
        res.status(404).send({
          message: "Nenhum registro encontrado.",
        });
      } else {
        return res.status(200).json(clients);
      }
    } catch (error) {
      res.status(400).send({
        message: "Erro ao consultar.",
      });
    }
  },
  async index(req, res) {
    try {
      const clients = await Client.findAll({ order: ["name"] });
      if (!clients) {
        res.status(404).send({
          message: "Nenhum registro encontrado.",
        });
      } else {
        return res.status(200).json(clients);
      }
    } catch (error) {
      res.status(400).send({
        message: "Erro ao consultar.",
      });
    }
  },
  async store(req, res) {
    try {
      const { name } = req.body;
      const ifExist = await Client.findOne({
        where: { name: { [Op.eq]: name } },
      });
      if (ifExist != null) {
        res.status(409).send({
          message: "Cliente já cadastrado.",
        });
      } else {
        const client = await Client.create({ name });
        return res.status(201).json(client);
      }
    } catch (error) {
      res.status(400).send({
        message: "Erro ao cadastrar.",
      });
    }
  },
  async save(req, res) {
    try {
      const { name } = req.body;
      const { id } = req.params;
      const ifExist = await Client.findByPk(id);
      if (!ifExist) {
        res.status(404).send({
          message: "Nenhum registro encontrado.",
        });
      } else {
        const client = await Client.update({ name }, { where: { id } });
        return res.status(200).json(client);
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
      const ifExist = await Client.findByPk(id);
      if (!ifExist) {
        res.status(404).send({
          message: "Nenhum registro encontrado.",
        });
      } else {
        await Client.destroy({ where: { id } });
        return res.status(204).json();
      }
    } catch (error) {
      res.status(400).send({
        message: "Erro ao excluir.",
      });
    }
  },
};
