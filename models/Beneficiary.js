const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you've set up a Sequelize instance

const Beneficiary = sequelize.define('Beneficiary', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

// Associations
Beneficiary.belongsTo(User);
User.hasMany(Beneficiary);


module.exports = Beneficiary;
