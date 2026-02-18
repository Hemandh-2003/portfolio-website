require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const helmet = require("helmet");
const app = express();
const rateLimit = require("express-rate-limit");

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "https://cdnjs.cloudflare.com",
          "https://cdn.jsdelivr.net",
          "https://unpkg.com"
        ],
        styleSrc: [
          "'self'",
          "https://fonts.googleapis.com",
          "https://cdn.jsdelivr.net",
          "https://unpkg.com",
          "'unsafe-inline'"
        ],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com"
        ],
        imgSrc: [
          "'self'",
          "data:"
        ]
      }
    }
  })
);
const indexRoutes = require("./routes/index");
app.use("/", indexRoutes);
app.use(limiter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

