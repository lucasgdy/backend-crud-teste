const { Model, DataTypes } = require("sequelize");

class Container extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
          validate: {
            isInt: true,
            notNull: true,
          },
        },
        idClient: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: "tb_clients", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "RESTRICT",
          validate: {
            isInt: true,
            notNull: true,
          },
        },
        name: {
          type: DataTypes.STRING(11),
          allowNull: false,
          unique: true,
          validate: {
            len: [0, 11],
            notNull: true,
          },
        },
        type: {
          type: DataTypes.ENUM({
            values: ["20", "40"],
          }),
          allowNull: false,
          validate: {
            notNull: true,
          },
        },
        status: {
          type: DataTypes.ENUM({
            values: ["Vazio", "Cheio"],
          }),
          allowNull: false,
          validate: {
            notNull: true,
          },
        },
        category: {
          type: DataTypes.ENUM({
            values: ["Importação", "Exportação"],
          }),
          allowNull: false,
          validate: {
            notNull: true,
          },
        },
      },
      {
        sequelize,
        tableName: "tb_containers",
        freezeTableName: true,
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Client, {
      foreignKey: "idClient",
      as: "Client",
    });
    this.hasMany(models.Movement, {
      foreignKey: "idContainer",
      as: "Movement",
    });
  }
}

module.exports = Container;
