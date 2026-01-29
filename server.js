// const http=require("http");
// const fs=require("fs");
// const path=require("path")
// const port=3000;
// const server=http.createServer((req,response)=>{
//    const filepath= path.join(__dirname,req.url=='/'?"index.html":req.url)
//   const extname= string(path.extname(filepath)).toLowerCase()
//   const mimetypes={
//     '.html':'text/html',
//         '.css':'text/css',
//     '.js':'text/javascript',
//     '.png':'text/png',
//   }
//  const contentType= mimetypes[extname] || 'aplication/octet-stream'

//  fs.readfile(filepath,(err,content)=>{
//     if(err){
//         if(err.code==="ENOENT"){
//             res.writeHead(404,{"Content-type":'text/html'})
//             res.end('404 : File Not Found bhai')
//         }


//     }else{
//         res.writeHead(200,{"content-type": contentType})
//         res.end(content,"utf-8")
//     }
//  })
// });
// server.listen(port,()=>{
//     console.log(`server is listening on ${port}`)
// }); 
const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3000;

const server = http.createServer((req, res) => {
  const filepath = path.join(
    __dirname,
    req.url === "/" ? "index.html" : req.url
  );

  const extname = path.extname(filepath).toLowerCase();

  const mimetypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
  };

  const contentType =
    mimetypes[extname] || "application/octet-stream";

  fs.readFile(filepath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("404 : File Not Found bhai");
      } else {
        res.writeHead(500);
        res.end("Server Error");
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    }
  });
});

server.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
