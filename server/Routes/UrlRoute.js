const express = require("express");
const router = express.Router();
const { createShortUrl , getAllUrls  , getUrl , deleteUrl } = require("../controllers/UrlController");

router.post("/create", createShortUrl);
router.get("/get", getUrl);
router.get("/allUrls", getAllUrls);
router.delete("/delete/:id", deleteUrl);



module.exports = router;