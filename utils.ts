import { readFileSync, stat, Stats } from "fs";

/*
	`doesFileExist` function refactored to accept `readFile()` as a parameter, allowing for injection of the dependency in tests 
*/
export function doesFileExist(
  targetFilePath: string,
  readFile: (
    path: string,
    options: { encoding: string }
  ) => ReturnType<typeof readFileSync> | void
) {
  try {
    const data = readFile(targetFilePath, { encoding: "utf8" });
    if (data) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}

/*
	Copied implemention of `checkIsDir` from color migration tool. `fs.stat` is mocked in tests using `mock-fs` 
*/
export const checkIsDir = async (path: string): Promise<Stats> =>
  new Promise((resolve, reject) => {
    stat(path, (err, stats) => {
      if (err) {
        reject(err);
      } else {
        resolve(stats);
      }
    });
  });
