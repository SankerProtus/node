import http from "node:http";
import { serveStaticFile } from "./utils/serverStatic.js";
import { handleGet } from "./handlers/routeHandlers.js";
import { handlePost } from "./handlers/routeHandlers.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4000;
const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {

  if (req.url === "/api") {
    if (req.method === "GET") {
      await handleGet(req, res);
    }

    if(req.method === "POST") {
      await handlePost(req, res);
    }

  } else if (!req.url.startsWith("/api")) {

      return await serveStaticFile(req, res, __dirname);

  } else {

    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");

  }
});
server.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
