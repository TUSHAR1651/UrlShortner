const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require("./models/user");
const UserRoute = require("./Routes/UserRoute");
const UrlRoute = require("./Routes/UrlRoute");

app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/Urls")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log(err);
    })


app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use("/user", UserRoute);
app.use("/url", UrlRoute);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});

