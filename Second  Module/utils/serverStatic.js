import { readFile } from "node:fs/promises";
import { sendResponse } from "./sendResponse.js";
import path from "node:path";
import { getContentType } from "./getContentType.js";

export async function serveStaticFile(req, res, baseDir) {
  const publicDir = path.join(baseDir, "public");
  const filePath = path.join(
    publicDir,
    req.url === "/" ? "index.html" : req.url
  );
  const ext = path.extname(filePath);
  const contentType = getContentType(ext);

  readFile(filePath)
    .then((contents) => {
      sendResponse(res, 200, contents, contentType);
    })
    .catch((err) => {
      console.error(err.message);
      if (err.code === "ENOENT") {
        const filePath = path.join(publicDir, "404.html");
        readFile(filePath)
          .then((contents) => {
            sendResponse(res, 404, contents, "text/html");
          })
          .catch(() => {
            sendResponse(res, 404, "404 Not Found", "text/plain");
          });
      } else {
        sendResponse(res, 500, { error: "Internal Server Error" });
      }
    });
}
