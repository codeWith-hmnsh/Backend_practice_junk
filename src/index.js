import dotenv from "dotenv"

dotenv.config({
path:"./.env",
});
let myusername=process.env.upyokta_naam
let mydatabase=process.env.jankari

console.log("value: ",myusername);
console.log("value: ",mydatabase);

console.log("hii hmnsh , welcome to backend");

// What it does: It automatically formats your code.
//  If you forget a semicolon, use messy indentation, 
// or mix single and double quotes, 
// Prettier snaps everything into a consistent style the moment you save.