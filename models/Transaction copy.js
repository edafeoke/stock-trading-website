const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Loan = sequelize.define('Loan', {
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    allowNull: false,
  },
});

// Associations
Loan.belongsTo(User);
User.hasMany(Loan);


module.exports = Loan;
