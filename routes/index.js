const express = require('express');
const router = express.Router();

// Homepage Route
router.get('/', (req, res) => {
  // Check if the user is logged in (you can customize this based on your session setup)
  const isLoggedIn = req.session.user !== undefined;

  // Render the homepage view with the user's login status
  res.render('index', { isLoggedIn });
});

router.get('/dashboard', (req, res) => {
    // Check if the user is logged in (you can customize this based on your session setup)
    const isLoggedIn = req.session.user !== undefined;
  
    // Render the homepage view with the user's login status
    res.render('dashboard', { isLoggedIn });
  });

module.exports = router;
