import path from "node:path";
import { readFile } from "node:fs/promises";

export async function getData() {
  const __dirname = import.meta.dirname;
  const baseDir = path.join(__dirname, "..", "database");
  const filePath = path.join(baseDir, "data.json");

  try {
    const content = await readFile(filePath, { encoding: "utf-8" });
    const parseData = JSON.parse(content);
    return parseData;
  } catch (err) {
    console.log(err.message);
    return [];
  }
}

