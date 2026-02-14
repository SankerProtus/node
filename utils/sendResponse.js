export function sendResponse(res, statusCode, data, contentType = "application/json") {
  res.writeHead(statusCode, { "Content-Type": contentType });
  res.end(contentType === "application/json" ? JSON.stringify(data) : data);
}