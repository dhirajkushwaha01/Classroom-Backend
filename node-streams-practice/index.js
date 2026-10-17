const express = require("express");
const fs = require("fs");
const zlib = require("zlib");
const status = require("express-status-monitor");

const app = express();
const PORT = 8000;

app.use(status());

// sample.txt padho -> zip se compress karo -> sample.zip mein likho
fs.createReadStream("./sample.txt")
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream("./sample.zip"));

app.get("/", (req, res) => {
    const stream = fs.createReadStream("./sample.txt", "utf-8");
    stream.pipe(res);
});

app.listen(PORT, () => console.log(`Server Started at http://localhost:${PORT}`));