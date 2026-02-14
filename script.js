import http from "node:http";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from the second module!");
});


server.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});