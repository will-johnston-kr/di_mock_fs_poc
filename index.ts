import { readFileSync } from "fs";
import { doesFileExist, checkIsDir } from "./utils";

// @ts-expect-error
console.log(doesFileExist("HelloWorld.txt", readFileSync));

async function checkForTheDir() {
  try {
    const stats = await checkIsDir("./node_modules");
    console.log(stats);
  } catch (error) {
    console.error("Directory not found.");
  }
}

checkForTheDir();
