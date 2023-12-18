// src/models/stock.js
module.exports = (sequelize, DataTypes) => {
    const Stock = sequelize.define('Stock', {
      symbol: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Add other fields as needed
    });
  
    return Stock;
  };
  