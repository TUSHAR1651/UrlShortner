const mongo = require("mongoose");
const UrlModel = require("../models/url");
const crypto = require("crypto");

const createShortUrl = async (req, res) => {
    const { userId, redirectUrl } = req.body;
    //  i want to hash the string
    const hash = crypto.createHash("sha256").update(redirectUrl).digest("hex");

    const shortUrl = hash.slice(0, 7);

    try {
        const url = new UrlModel({
            userId,
            redirectUrl,
            shortUrl,
        });

        await url.save();
        res.status(201).json({
            message: "Url Created Successfully",
            Url: url,
        });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

module.exports = {createShortUrl}




