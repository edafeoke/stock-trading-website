const { DataTypes } = require('sequelize');
const User = require('./User')
const sequelize = require('../config/database'); // Assuming you've set up a Sequelize instance

const Account = sequelize.define('Account', {
  accountNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

// Associations
Account.belongsTo(User);
User.hasMany(Account);



module.exports = Account;
