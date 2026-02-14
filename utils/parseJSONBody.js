export function parseJSONBody(body) {
    try {
        if(typeof body !== 'string') {
            throw new Error("Body must be a string");
        }

        if(body.trim() === "") {
            throw new Error("Body is empty");
        }

        return JSON.parse(body);
    } catch (error) {
        console.error("Failed to parse JSON body:", error);
        return null;
    }
}