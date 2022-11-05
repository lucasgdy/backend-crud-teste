const { Model, DataTypes } = require("sequelize");

class Movement extends Model {
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
        idContainer: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: "tb_containers", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          validate: {
            isInt: true,
            notNull: true,
          },
        },
        type: {
          type: DataTypes.ENUM({
            values: [
              "Embarque",
              "Descarga",
              "Gate In",
              "Gate Out",
              "Reposicionamento",
              "Pesagem",
              "Scanner",
            ],
          }),
          allowNull: false,
          validate: {
            notNull: true,
          },
        },
        startDate: {
          type: DataTypes.DATE,
          allowNull: false,
          validate: {
            notNull: true,
          },
        },
        endDate: {
          type: DataTypes.DATE,
          allowNull: false,
          validate: {
            notNull: true,
          },
        },
      },
      {
        sequelize,
        tableName: "tb_movements",
        freezeTableName: true,
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Container, {
      foreignKey: "idContainer",
      as: "Container",
    });
  }
}

module.exports = Movement;
