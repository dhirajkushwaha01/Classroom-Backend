const http = require("http");
const fs = require("fs");
const url = require("url"); 
const express = require("express");


//---------------Express--------------------------//

const app = express();

app.get("/", (req, res) => {
    return res.send("Hello From Home Page");
});

app.get("/about", (req, res) => {
    return res.send(`Hello ${req.query.name}`);
});

app.listen(8000, () => console.log("Server Started!"));


//-------------------Node js---------------------------//

// function myHandler(req, res) {
//     if (req.url === "/favicon.ico") return res.end();

//     const log = `${Date.now()}: ${req.method} ${req.url} New Req Received\n`;
//     const myUrl = url.parse(req.url, true);

//     console.log(myUrl);

//     fs.appendFile("log.txt", log, (err, data) => {
//         switch (myUrl.pathname) {
//             case "/":
//                 res.end("HomePage");
//                 break;

//             case "/about":
//                 const username = myUrl.query.myname;
//                 res.end(`Hi, ${username}`);
//                 break;

//             case "/search":
//                 const search = myUrl.query.search_query;
//                 res.end("Here are your results for " + search);
//                 break;
//             case "/signup":
//                 if (req.method === "GET")
//                     res.end("This is a signup Form");

//                 else if (req.method === "POST") {
//                     // DB Query
//                     res.end("Success");
//                 }

//                 break;
//             default:
//                 res.end("404 Not Found");
//         }

//     });
// }


// const myServer = http.createServer(app);

// myServer.listen(8000, () => console.log("Server Started!"));