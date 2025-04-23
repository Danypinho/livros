const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite" 
  });

  const Livro = sequelize.define("Livro", {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    autor: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  sequelize.sync();

module.exports = { Livro, sequelize };
  