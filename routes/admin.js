const express = require('express');
const router = express.Router();

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  // Assuming you have a way to identify admin users in your User model
  const isAdminUser = req.session.user && req.session.user.isAdmin;

  if (!isAdminUser) {
    // User is an admin, proceed to the next middleware or route handler
    next();
  } else {
    // User is not an admin, redirect to a non-admin page or show an error
    res.status(403).send('Permission denied. You are not an admin.');
  }
};

// Admin Dashboard
router.get('/', isAdmin, (req, res) => {
  // Render the admin dashboard view
  res.render('admin/dashboard');
});

// Admin Settings
router.get('/admin/settings', isAdmin, (req, res) => {
  // Render the admin settings view
  res.render('admin/settings');
});

// Add more admin routes as needed

module.exports = router;
