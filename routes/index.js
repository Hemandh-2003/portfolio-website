const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const Message = require("../models/Message");

router.get("/", (req, res) => {
    res.render("index");
});

router.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;
    await Message.create({ name, email, message });
    res.redirect("/");
});

router.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;

    await Message.create({ name, email, message });

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: email,
        to: process.env.EMAIL_USER,
        subject: `Portfolio Message from ${name}`,
        text: message
    });

    res.redirect("/");
});

module.exports = router;
