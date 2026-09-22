const fs = require("fs");
const os = require("os");

console. log(os.cpus().length); 


// Sync...Blockuing Request....
// fs.writeFileSync("./test.txt", "Hello World");

//Async....Non-Blocking Req...
// fs.writeFile("./test.txt", "Hello World async", (err) => { });



//-------------------------------------------------------------------------//

// Blocking ... 
// console.log("1");

// const result = fs.readFileSync("contacts.txt", "utf-8");
// console.log(result);

// console.log("2");

//Result:
// 1
// Dhiraj kushwaha: +919756774354 
// Sumit kushwaha: +918837376367
// 2

//Non-Blocking----- 
// console.log("1");

// fs.readFile("contacts.txt", "utf-8", (err, result) => {
//     console.log(result);
// });

// console.log("2");

//Result:
// 1
// 2
// Dhiraj kushwaha: +919756774354
// Sumit kushwaha: +918837376367

//-----------------------------------------------------------------------------//



// Sync...
// const result = fs.readFileSync("./contacts.txt", "utf-8");
// console.log(result);

//Async....
// fs.readFile("./contacts.txt", "utf-8", (err, result) => {
//     if (err) {
//         console.log("Error", err);
//     } else {
//         console.log(result);
//     }
// });


// fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString());
// fs.appendFileSync("./test.txt", `${Date.now()}Hey There\n`);

// fs.cpSync("./test.txt", "./copy.txt");

// fs.unlinkSync("./copy.txt");

// console.log(fs.statSync("./test.txt"));

// fs.mkdirSync("my-docs");
// fs.mkdirSync("my-docss/a/b", { recursive: true });
