const express = require("express");
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect");
const URL = require("./models/url");
const path = require("path");
const staticRoute = require("./routes/staticRoute");

const app = express();
const PORT = 8001;


// MongoDB Connection
connectToMongoDB("mongodb://localhost:27017/short-url")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("MongoDB Connection Error:", err));


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// URL creation route
app.use("/url", urlRoute);
app.use("/", staticRoute);

// Redirect short URL
app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        {
            shortId: shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );

    if (!entry) {
        return res.status(404).json({
            error: "Short URL not found",
        });
    }

    res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
    console.log(`Server Started at PORT: ${PORT}`);
});