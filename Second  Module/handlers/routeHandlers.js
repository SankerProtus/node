import { getData } from "../utils/getData.js";
import { sendResponse } from "../utils/sendResponse.js";
import { parseJSONBody } from "../utils/parseJSONBody.js";
import { addNewSighting } from "../utils/addNewSighting.js";

export async function handleGet(req, res) {
    const data = await getData();
    sendResponse(res, 200, data);
}

export async function handlePost(req, res) {

    let body = "";

    req.on("data", chunk => {
        body += chunk.toString();
    });

    req.on("end", async () => {
        const parsedBody = parseJSONBody(body);
        if (!parsedBody) {
            sendResponse(res, 400, { message: "Invalid JSON" });
            return;
        }
        const { location, timeStamp, text, title } = parsedBody;
        if (!location || !timeStamp || !text || !title) {
            sendResponse(res, 400, { message: "Missing required fields" });
            return;
        }
        const data = await getData();
        await addNewSighting(data, parsedBody);
        sendResponse(res, 201, { message: "New sighting added successfully" });
    });

}