const { Model, DataTypes } = require("sequelize");

class Client extends Model {
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
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
          validate: {
            len: [0, 100],
            notNull: true,
          },
        },
      },
      {
        sequelize,
        tableName: "tb_clients",
        freezeTableName: true,
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Container, {
      foreignKey: "idClient",
      as: "Container",
    });
  }
}

module.exports = Client;
