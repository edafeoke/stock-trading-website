const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares');

const {isLoggedIn} = middlewares
// Homepage Route
router.get('/', (req, res) => {
  // Check if the user is logged in (you can customize this based on your session setup)
  const isLoggedIn = req.session.user !== undefined;

  // Render the homepage view with the user's login status
  res.render('index', { isLoggedIn });
});

router.get('/dashboard', isLoggedIn, (req, res) => {
    // Check if the user is logged in (you can customize this based on your session setup)
    const user = req.session.user;
    
    const redirectPath = user?.isAdmin ? "admin" : "dashboard";
    res.render(redirectPath, {user});  
  });

module.exports = router;
