// middlewares.js

const isLoggedIn = (req, res, next) => {
    const isUserLoggedIn = req.session.user !== undefined;
  
    if (isUserLoggedIn) {
      // User is logged in, proceed to the next middleware or route handler
      next();
    } else {
      // User is not logged in, redirect to the login page or show an error
      res.redirect('/auth/login');
    }
  };
  
  const isAdmin = (req, res, next) => {
    const isAdminUser = req.session.user && req.session.user.isAdmin;
  
    if (isAdminUser) {
      // User is an admin, proceed to the next middleware or route handler
      next();
    } else {
      // User is not an admin, redirect to a non-admin page or show an error
      res.status(403).send('Permission denied. You are not an admin.');
    }
  };
  
  module.exports = {
    isLoggedIn,
    isAdmin,
  };
  