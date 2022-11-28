import { hasDependency, doesFileExist, checkIsDir } from "./utils";

import mock from "mock-fs";

describe("hasDependency unit tests", () => {
  it("Should return the target string", () => {
    function returnsTarget(targetString: string) {
      return targetString;
    }

    expect(hasDependency("Foo", returnsTarget)).toBe("Foo");
  });
});

describe("doesFileExist unit tests", () => {
  it("Should return true when the file exists", () => {
    function readFile(path: string, { encoding: string }) {
      return "Hello world!";
    }

    expect(doesFileExist("HelloWorld.txt", readFile)).toBe(true);
  });

  it("Should return false when the file does not exist", () => {
    function readFile(path: string, { encoding: string }) {
      return undefined;
    }

    expect(doesFileExist("GoodbyeWorld.txt", readFile)).toBe(false);
  });

  it("Should return false when an error is thrown", () => {
    function readFile(path: string, { encoding: string }) {
      throw new Error("File not found...");
    }
    expect(doesFileExist("GoodbyeWorld.txt", readFile)).toBe(false);
  });

  describe("checkIsDir unit test", () => {
    afterEach(() => {
      mock.restore();
    });

    it("Should return the correct stats when the directory exists", async () => {
      const testPath = "./foo";
      const knownStats = {
        dev: 8675309,
        mode: 16895,
        nlink: 2,
        uid: 502,
        gid: 20,
        rdev: 0,
        blksize: 4096,
        ino: 13,
        size: 1,
        blocks: 1,
        atimeMs: 530510400000,
        mtimeMs: 530510400000,
        ctimeMs: 530510400000,
        birthtimeMs: 530510400000,
        atime: new Date("10/24/1986"),
        mtime: new Date("10/24/1986"),
        ctime: new Date("10/24/1986"),
        birthtime: new Date("10/24/1986"),
      };

      mock({
        foo: mock.directory({
          atime: new Date("10/24/1986"),
          ctime: new Date("10/24/1986"),
          mtime: new Date("10/24/1986"),
          birthtime: new Date("10/24/1986"),
        }),
      });
      expect(await checkIsDir(testPath)).toEqual(knownStats);
    });
  });
});
