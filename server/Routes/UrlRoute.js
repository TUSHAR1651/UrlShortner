const express = require("express");
const router = express.Router();
const { createShortUrl } = require("../controllers/UrlController");

router.post("/createShortUrl", createShortUrl);



module.exports = router;