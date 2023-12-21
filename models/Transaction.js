const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you've set up a Sequelize instance

const Transaction = sequelize.define('Transaction', {
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('debit', 'credit'),
    allowNull: false,
  },
});

// Associations
Transaction.belongsTo(Account, { as: 'sourceAccount' });
Transaction.belongsTo(Account, { as: 'destinationAccount' });

module.exports = Transaction;
