const bcrypt = require('bcrypt');
const { User } = require('../models/User'); // Adjust the path based on your file structure

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('a', 10);

    return queryInterface.bulkInsert('Users', [
      {
        username: 'a',
        fullname: 'John Doe',
        phone: '1234567890',
        country: 'USA',
        referralId: 'ref123',
        password: hashedPassword,
        email: 'john.doe@example.com',
        isAdmin: true,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'jane_doe',
        fullname: 'Jane Doe',
        phone: '9876543210',
        country: 'Canada',
        referralId: 'ref456',
        password: hashedPassword,
        email: 'jane.doe@example.com',
        isAdmin: false,
        status: 'inactive',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more users as needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all users
    return queryInterface.bulkDelete('Users', null, {});
  },
};
