const express = require("express");

const {
    handleGenerateNewShortURL,
    handleGetAnalytics,
} = require("../controllers/url");

const { checkAuth } = require("../middlewares/auth");

const router = express.Router();

router.post("/", checkAuth, handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;