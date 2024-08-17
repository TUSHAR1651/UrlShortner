const shortid   = require('shortid');

const Url = require('../models/url');
const crypto = require('crypto');

const hashFunction = () => {
    const hash = crypto.randomBytes(3).toString('hex');
    console.log(hash);
    return hash.slice(0, 6);
}

async function handleGenerateNewShortUrl(req, res) {
    const { redirectUrl } = req.body;
    const shortId = hashFunction();
    while (await Url.findOne({ shortId: shortId })) {
        shortId = hashFunction();
    }
    const newUrl = new Url({
        shortId,
        redirectUrl
    });

    await newUrl.save();
    return res.status(200).json({
        shortId
    });


}
async function handleGetNewShortUrl(req, res) {
    const shortId = req.params.shortId;

    const entry = await Url.findOneAndUpdate({
        shortId: shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    });
    return res.redirect(entry.redirectUrl);

}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;

    const entry = await Url.findOne({
        shortId: shortId
    });

    return res.status(200).json({
        TotalClicks : entry.visitHistory.length,
        visitHistory: entry.visitHistory
    });
}
module.exports = {
    handleGenerateNewShortUrl,
    handleGetNewShortUrl,
    handleGetAnalytics
}
