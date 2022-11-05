const Container = require("../models/Container");
const { Op, DataTypes } = require("sequelize");
const connection = require("../database");

module.exports = {
  async showById(req, res) {
    try {
      const { id } = req.params;
      const containers = await Container.findByPk(id, {
        include: [{ association: "Client" }],
      });
      if (!containers) {
        res.status(404).send({
          message: "Nenhum registro encontrado.",
        });
      } else {
        return res.status(200).json(containers);
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
      const containers = await Container.findAll({
        where: {
          name: { [Op.like]: "%" + name + "%" },
          order: ["name"],
        },
        include: [{ association: "Client" }],
      });
      if (!containers) {
        res.status(404).send({
          message: "Nenhum registro encontrado.",
        });
      } else {
        return res.status(200).json(containers);
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
      const containers = await Container.findOne({
        where: {
          name: { [Op.eq]: name },
        },
        order: ["name"],
      });
      if (!containers) {
        res.status(404).send({
          message: "Nenhum registro encontrado.",
        });
      } else {
        return res.status(200).json(containers);
      }
    } catch (error) {
      res.status(400).send({
        message: "Erro ao consultar.",
      });
    }
  },
  async index(req, res) {
    try {
      const containers = await Container.findAll({
        include: [{ association: "Client" }],
        order: ["name"],
      });
      if (!containers) {
        res.status(404).send({
          message: "Nenhum registro encontrado.",
        });
      } else {
        return res.status(200).json(containers);
      }
    } catch (error) {
      res.status(400).send({
        message: "Erro ao consultar.",
      });
    }
  },
  async store(req, res) {
    try {
      const { idClient, name, type, status, category } = req.body;
      const ifExist = await Container.findOne({
        where: { name: { [Op.eq]: name } },
      });
      if (ifExist != null) {
        res.status(409).send({
          message: "Container já cadastrado.",
        });
      } else {
        const container = await Container.create({
          idClient,
          name,
          type,
          status,
          category,
        });
        return res.status(201).json(container);
      }
    } catch (error) {
      res.status(400).send({
        message: "Erro ao cadastrar.",
      });
    }
  },
  async save(req, res) {
    try {
      const { idClient, type, status, category } = req.body;
      const { id } = req.params;
      const ifExist = await Container.findByPk(id);
      if (!ifExist) {
        res.status(404).send({
          message: "Nenhum registro encontrado.",
        });
      } else {
        const container = await Container.update(
          { idClient, type, status, category },
          { where: { id } }
        );
        return res.status(200).json(container);
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
      const ifExist = await Container.findByPk(id);
      if (!ifExist) {
        res.status(404).send({
          message: "Nenhum registro encontrado.",
        });
      } else {
        await Container.destroy({ where: { id } });
        return res.status(204).json();
      }
    } catch (error) {
      res.status(400).send({
        message: "Erro ao excluir.",
      });
    }
  },
};
