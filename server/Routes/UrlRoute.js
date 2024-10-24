const express = require("express");
const router = express.Router();
const { createShortUrl , getAllUrls  , getUrl } = require("../controllers/UrlController");

router.post("/create", createShortUrl);
router.get("/get", getUrl);
router.get("/allUrls", getAllUrls);



module.exports = router;