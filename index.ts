import { readFileSync } from "fs";
import { doesFileExist, checkIsDir } from "./utils";

// innjectino of `readFileSync` dependency
// @ts-expect-error
doesFileExist("HelloWorld.txt", readFileSync);

async function checkForTheDir() {
  try {
    const stats = await checkIsDir("./node_modules");
  } catch (error) {
    console.error("Directory not found.");
  }
}

checkForTheDir();
