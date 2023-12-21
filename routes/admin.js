// admin.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const middlewares = require('../middlewares');

const { isLoggedIn, isAdmin } = middlewares;

// Admin Dashboard
router.get('/', isLoggedIn, isAdmin, async (req, res) => {
  // Render the admin dashboard view
  const currentRoute = '/admin';
  const user = req.session.user;
  const users = await User.findAll();
  res.render('admin/dashboard', { user, currentRoute, users });
});

// Admin Settings
router.get('/settings', isLoggedIn, isAdmin, (req, res) => {
  // Render the admin settings view
  res.render('admin/settings');
});

// Admin Users - Render all users
router.get('/users', isLoggedIn, isAdmin, async (req, res) => {
  const currentRoute = '/admin/users';
  try {
    // Fetch all users from the database
    const allUsers = await User.findAll();
    const user = req.session.user;

    // Render the admin users view with the list of users
    res.render('admin/users', { users: allUsers, user, currentRoute });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Add more admin routes as needed

module.exports = router;
