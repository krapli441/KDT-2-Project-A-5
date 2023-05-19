import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
const root = path.join(__dirName, "../../");
console.log("루트 경로입니다 :  " + root );
const server = http.createServer((req, res)=> {
  try {
  if(req.method === 'GET') {
    if(req.url === '/') {
      // ! 호출 할 파일이 없어서 임시로 해 놓음
      res.writeHead(200, {'Content-Type' : 'text/html'});
      res.write("Hello World");
      res.end();
    }
    // html파일 요청
    if(req.url.endsWith('.html')) {
      res.writeHead(200, {'Content-Type' : 'text/html'});
      res.write(
        fs.readFileSync(path.join(root, req.url),"utf-8")
      );
      res.end();
    }
    // css파일 요청
    if(req.url.endsWith('.css')) {
      res.writeHead(200, {'Content-Type' : 'text/css'});
      fs.readFileSync(path.join(root, req.url),"utf-8")
      res.end();
    }
    // js파일 요청
    if(req.url.endsWith('.js')) {
      res.writeHead(200, {'Content-Type' : 'text/javascript'});
      res.write(fs.readFileSync(path.join(root, req.url)));
      // res.write(
      //   fs.readFileSync(path.join(root, "utils", "all-mighty-editor.js"),"utf-8")
      // );
      res.end();
    }
    // png 파일 요청
    if(req.url.endsWith('.png')) {
      res.writeHead(200, {'Content-Type' : 'image/png'});
      res.write(
        fs.readFileSync(path.join(root, req.url))
      )
      res.end();
    }

  }
  if(req.method === 'POST') {
  }} catch (err) {
    console.log(err);
  }
});
server.listen(8080,(err)=> {
  if(err) {
    console.log(err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.write('서버 연결이 원할하지 않습니다');
    res.end();
  }
  console.log("서버가 정상 연결 됐습니다");
})