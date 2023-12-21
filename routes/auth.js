const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const Account = require("../models/Account");

const router = express.Router();

// Register
router.get("/register", (req, res) => {
  // Check if the user is logged in (you can customize this based on your session setup)
  const isLoggedIn = req.session.user !== undefined;
  if (isLoggedIn) {
    // Redirect based on user role
    const redirectPath = user.isAdmin ? "/admin" : "/dashboard";
    res.redirect(redirectPath);
  }

  // Render the register view with the user's login status
  res.render("register");
});

router.post("/register", async (req, res) => {
  try {
    const { username, password, email, country, referralId, fullname, phone } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      country,
      referralId,
      fullname,
      phone,
    });
    let message = "";
    if (user) {
      message = "Register successfully!";
    }

    res.redirect("/auth/login");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Login
router.get("/login", (req, res) => {
  // Render the login view with the user's login status
  let successMessages = req.flash("success");
  let errorMessages = req.flash("error");
  console.log(errorMessages);
  res.render("login", {
    successMessage:
      successMessages.length > 0 ? successMessages.toString() : "",
    errorMessage: errorMessages.length > 0 ? errorMessages.toString() : "",
  });
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (user) {
      // Check password first
      if (await bcrypt.compare(password, user.password)) {
        // Check user status after confirming the correct password
        if (user.status === "active") {
          req.session.userId = user.id;
          req.session.user = user;
          // Redirect based on user role
          const redirectPath = user.isAdmin ? "/admin" : "/dashboard";

          res.redirect(redirectPath);
        } else {
          // User status is not active
          req.flash(
            "error",
            "Your account is not active. Please contact support."
          );
          res.redirect("/auth/login");
        }
      } else {
        // Incorrect password
        req.flash("error", "Incorrect password");
        res.redirect("/auth/login");
      }
    } else {
      // User not found
      req.flash("error", "No user found with that username!");
      res.redirect("/auth/login");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Forgot Password
router.get("/forgot-password", (req, res) => {
  // Render the forgot-password view
  res.render("forgot-password");
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    // Generate a random token
    const token = crypto.randomBytes(20).toString("hex");

    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (user) {
      // Update user's resetPasswordToken and resetPasswordExpires
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      await user.save();

      // Send email with the reset link
      const transporter = nodemailer.createTransport({
        // configure your email service here
        // See nodemailer documentation for options: https://nodemailer.com/about/
      });

      const mailOptions = {
        from: "admin@localhost",
        to: user.email,
        subject: "Password Reset",
        text:
          `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
          `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
          `http://${req.headers.host}/reset-password/${token}\n\n` +
          `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
      };

      await transporter.sendMail(mailOptions);

      // Redirect to a page indicating that a reset link has been sent
      res.redirect("/password-reset-sent?t=" + token);
    } else {
      // Redirect to a page indicating that the email is not registered
      res.redirect("/email-not-found");
    }
  } catch (error) {
    console.error("Error sending reset email:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Logout
router.get("/logout", (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).send("Internal Server Error");
    } else {
      // Redirect to the login page after logout
      res.redirect("/auth/login");
    }
  });
});

module.exports = router;
