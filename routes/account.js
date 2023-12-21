const express = require('express');
const router = express.Router();
const account = require('../models/Account')

console.log(account);

// Homepage Route
router.get('/', (req, res) => {
  // Check if the user is logged in (you can customize this based on your session setup)
  const isLoggedIn = req.session.user !== undefined;

  // Render the homepage view with the user's login status
  res.render('index', { isLoggedIn });
});

router.get('/dashboard', (req, res) => {
    // Check if the user is logged in (you can customize this based on your session setup)
    const user = req.session.user;
    if (!user) {
      // Redirect based on user role
      res.redirect('auth/login');
    }
    const redirectPath = user?.isAdmin ? "admin" : "dashboard";
    res.render(redirectPath, {user});  
  });

module.exports = router;
