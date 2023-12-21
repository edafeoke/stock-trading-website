const path = require("path");
const express = require("express");
const flash = require("connect-flash");
const session = require("express-session");
const sequelize = require("./config/database");
const authRoutes = require("./routes/auth");
const indexRoutes = require("./routes/index");
const adminRoutes = require("./routes/admin");

const app = express();

// Set the view engine and the views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views/pages"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(
  session({ secret: "your-secret-key", resave: false, saveUninitialized: true })
);
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/auth", authRoutes);
app.use("/", indexRoutes);
app.use("/admin", adminRoutes);

// Database synchronization
sequelize.sync({alter:false}).then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
