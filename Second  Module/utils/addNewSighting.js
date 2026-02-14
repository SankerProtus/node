import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { v4 as uuidv4 } from "uuid";

export async function addNewSighting(data, newSighting) {
  const __dirname = import.meta.dirname;
  const baseDir = join(__dirname, "..", "database");
  const filePath = join(baseDir, "data.json");

  if (!Array.isArray(data)) {
    throw new Error("Data must be an array");
  }

  if (typeof newSighting !== "object" || newSighting === null) {
    throw new Error("New sighting must be a valid object");
  }
 
  writeFile(
    filePath,
    JSON.stringify([...data, { uuid: uuidv4(), ...newSighting }], null, 2),
    { encoding: "utf-8" }
)
    .then(() => {
      console.log("New sighting added successfully");
    })
    .catch((err) => {
      console.error("Error writing new sighting to file:", err);
    });
}
