import dotenv from "dotenv"
// import express from "express"
import connectDB from "./db/index.js"

import app from "./app.js"

dotenv.config({
path:"./.env",
});

// const app = express()
const port = process.env.PORT || 3000
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error", err);
    process.exit(1);
  });


// app.get('/', (req, res) => {
//   res.send('Hello hmnsh , this is backend !')
// })

// app.get("/instagram", (req, res) => {
//   res.send("this is an instagram page");
// });




// let myusername=process.env.upyokta_naam
// let mydatabase=process.env.jankari

// console.log("value: ",myusername);
// console.log("value: ",mydatabase);

// console.log("hii hmnsh , welcome to backend");



// What it does: It automatically formats your code.
//  If you forget a semicolon, use messy indentation, 
// or mix single and double quotes, 
// Prettier snaps everything into a consistent style the moment you save.