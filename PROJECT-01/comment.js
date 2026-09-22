// const express = require("express");
// const fs = require("fs");

// const app = express();
// const PORT = 8000;


// // MIDDLEWARE

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));


// // READ USERS FROM JSON FILE

// const users = require("./MOCK_DATA.json");


// // GET ALL USERS

// app.get("/api/users", (req, res) => {

//     return res.json(users);

// });


// // GET USER BY ID

// app.get("/api/users/:id", (req, res) => {

//     const id = Number(req.params.id);

//     const user = users.find((user) => user.id === id);

//     if (!user) {
//         return res.status(404).json({
//             status: "error",
//             message: "User not found"
//         });
//     }

//     return res.json(user);

// });


// // CREATE USER

// app.post("/api/users", (req, res) => {

//     const body = req.body;

//     if (
//         !body ||
//         !body.first_name ||
//         !body.last_name ||
//         !body.email ||
//         !body.gender ||
//         !body.job_title
//     ) {
//         return res.status(400).json({
//             status: "error",
//             message: "All fields are required"
//         });
//     }


//     const newUser = {
//         id: users.length + 1,
//         first_name: body.first_name,
//         last_name: body.last_name,
//         email: body.email,
//         gender: body.gender,
//         job_title: body.job_title
//     };


//     users.push(newUser);


//     fs.writeFile(
//         "./MOCK_DATA.json",
//         JSON.stringify(users, null, 2),
//         (err) => {

//             if (err) {
//                 return res.status(500).json({
//                     status: "error",
//                     message: "Failed to create user"
//                 });
//             }

//             return res.status(201).json({
//                 status: "success",
//                 message: "User created successfully",
//                 data: newUser
//             });

//         }
//     );

// });


// // UPDATE USER

// app.patch("/api/users/:id", (req, res) => {

//     const id = Number(req.params.id);

//     const user = users.find((user) => user.id === id);


//     if (!user) {
//         return res.status(404).json({
//             status: "error",
//             message: "User not found"
//         });
//     }


//     // UPDATE USER

//     Object.assign(user, req.body);


//     fs.writeFile(
//         "./MOCK_DATA.json",
//         JSON.stringify(users, null, 2),
//         (err) => {

//             if (err) {
//                 return res.status(500).json({
//                     status: "error",
//                     message: "Failed to update user"
//                 });
//             }

//             return res.json({
//                 status: "success",
//                 message: "User updated successfully",
//                 data: user
//             });

//         }
//     );

// });


// // DELETE USER

// app.delete("/api/users/:id", (req, res) => {

//     const id = Number(req.params.id);

//     const userIndex = users.findIndex(
//         (user) => user.id === id
//     );


//     if (userIndex === -1) {
//         return res.status(404).json({
//             status: "error",
//             message: "User not found"
//         });
//     }


//     // DELETE USER

//     const deletedUser = users.splice(userIndex, 1);


//     fs.writeFile(
//         "./MOCK_DATA.json",
//         JSON.stringify(users, null, 2),
//         (err) => {

//             if (err) {
//                 return res.status(500).json({
//                     status: "error",
//                     message: "Failed to delete user"
//                 });
//             }

//             return res.json({
//                 status: "success",
//                 message: "User deleted successfully",
//                 data: deletedUser[0]
//             });

//         }
//     );

// });


// // SERVER

// app.listen(PORT, () => {
//     console.log(`Server Started at PORT: ${PORT}`);
// });