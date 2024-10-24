const mongo = require("mongoose");
const UrlModel = require("../models/url");
const crypto = require("crypto");

const createShortUrl = async (req, res) => {
    console.log(req.body);
    const { userId, Url } = req.body;
    //  i want to hash the string
    const hash = crypto.createHash("sha256").update(Url).digest("hex");
    // const hash  = "";
    

    const shortUrl = hash.slice(0, 7);

    // console.log(shortUrl);
    while(await UrlModel.findOne({ shortUrl })) {
        shortUrl = crypto.createHash("sha256").update(Url).digest("hex").slice(0, 7);
    }

    try {
        const url = new UrlModel({
            userId,
            redirectUrl: Url,
            shortUrl,
        });
        // console.log(url);
        await url.save();
        res.status(201).json({
            message: "Url Created Successfully",
            Url: url,
        });
    } catch (error) {
        // console.log(error);
        res.status(409).json({ message: error.message });
    }
}

const getAllUrls = async (req, res) => {
    console.log(req.query);
    const userId  = req.query.userId;
    // console.log(userId);

    try {
        const urls = await UrlModel.find({ userId: userId });
        res.status(200).json({ urls : urls });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getUrl = async (req, res) => {
    console.log(req.query);
    const shortId = req.query.shortUrl;
    // console.log("id" , shortId);
    try {
        const url = await UrlModel.findOne({
            shortUrl: shortId
        })
        // console.log(url);
        res.status(200).json({ url: url });
    }
    catch {
        res.status(404).json({ message: "Url not found" });
    }
}

module.exports = {createShortUrl , getAllUrls , getUrl};




