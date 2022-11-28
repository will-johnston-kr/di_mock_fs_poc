import { readFileSync, stat, Stats } from "fs";
export function hasDependency(
  target: string,
  dependency: (target: string) => string
): string {
  return dependency(target);
}

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
