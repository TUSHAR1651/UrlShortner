const mongo = require("mongoose");


const urlSchema = new mongo.Schema({
    userId: {
        type: mongo.Schema.Types.ObjectId,
        required: true
    },
    redirectUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    },
    TimeStamp: {
        type: [],
        default: [Date.now()]
    }

})


const Url = mongo.model("Url", urlSchema);
module.exports = Url
