import { testInput, realInput } from "./inputs";

type File = {
  name: string;
  size: number;
};

type Directory = {
  parent: Directory | null;
  name: string;
  files: File[];
  subdirectories: Directory[];
  size: number;
};

function getLines(input: string): string[] {
  return input.split("\n");
}

function parseDirectoryTree(lines: string[]): Directory {
  const rootDir: Directory = {
    parent: null,
    name: "/",
    files: [],
    subdirectories: [],
    size: 0,
  };
  let currentDir: Directory = rootDir;

  lines.forEach((line) => {
    const tokens = line.split(" ");

    if (tokens[0] === "$") {
      // Parse command
      switch (tokens[1]) {
        case "cd": {
          if (tokens[2] === "/") {
            console.error("Moving to root directory");
          } else if (tokens[2] === "..") {
            if (currentDir.parent === null) {
              console.error(
                "Warning: trying to move up a directory without parent"
              );
              return;
            } else {
              currentDir = currentDir.parent;
            }
          } else {
            const targetDir = currentDir.subdirectories.find(
              (subdirectory) => subdirectory.name === tokens[2]
            );
            if (targetDir !== undefined) {
              currentDir = targetDir;
            } else {
              console.error(
                "Warning: trying to move to an unknown subdirectory"
              );
            }
          }
          break;
        }

        case "ls": {
          return;
          break;
        }

        default: {
          console.error("Unknown command found!");
          break;
        }
      }
    } else {
      // Parse command output
      if (tokens[0] == "dir") {
        const newDir: Directory = {
          parent: currentDir,
          name: tokens[1],
          files: [],
          subdirectories: [],
          size: 0,
        };
        currentDir.subdirectories.push(newDir);
      } else {
        const newFile: File = {
          name: tokens[1],
          size: parseInt(tokens[0], 10),
        };
        currentDir.files.push(newFile);
      }
    }
  });

  return rootDir;
}

function printDirectoryTree(directory: Directory, depth: number) {
  const depthStr = " ".repeat(depth);
  console.log(`${depthStr}- ${directory.name} (dir, size=${directory.size})`);
  directory.files.forEach((file) =>
    console.log(`  ${depthStr}- ${file.name} (file, size=${file.size})`)
  );
  directory.subdirectories.forEach((subdirectory) =>
    printDirectoryTree(subdirectory, depth + 2)
  );
}

function populateSizes(directory: Directory) {
  directory.subdirectories.forEach((subdirectory) =>
    populateSizes(subdirectory)
  );
  const filesSize = directory.files.reduce(
    (accum, current) => accum + current.size,
    0
  );
  const subdirectoriesSize = directory.subdirectories.reduce(
    (accum, current) => accum + current.size,
    0
  );
  directory.size = filesSize + subdirectoriesSize;
}

function directorySizes(directory: Directory): number[] {
  const subdirectoriesSizes = directory.subdirectories
    .map((subdirectory) => directorySizes(subdirectory))
    .flat();
  return [directory.size, ...subdirectoriesSizes];
}

function part1(input: string): number {
  const directory = parseDirectoryTree(getLines(input));
  populateSizes(directory);
  const realDirectorySizes = directorySizes(directory);
  const realDirectorySizesAtMost100k = realDirectorySizes.filter(
    (size) => size <= 100000
  );
  const theSum = realDirectorySizesAtMost100k.reduce(
    (accum, current) => accum + current,
    0
  );
  return theSum;
}

console.log("Part 1 test:", part1(testInput));
console.log("Part 1 real:", part1(realInput));

function part2(input: string): number {
  const directory = parseDirectoryTree(getLines(input));
  populateSizes(directory);
  const realDirectorySizes = directorySizes(directory);
  realDirectorySizes.sort((a, b) => a - b);
  const totalAvailableSpace = 70000000;
  const totalUsedSpace = directory.size;
  const desiredSpace = 30000000;
  const freeSpace = totalAvailableSpace - totalUsedSpace;
  const remainingSpace = desiredSpace - freeSpace;
  for (let i = 0; i < realDirectorySizes.length; i++) {
    if (realDirectorySizes[i] >= remainingSpace) {
      return realDirectorySizes[i];
    }
  }
  return -1;
}

console.log("Part 2 test:", part2(testInput));
console.log("Part 2 real:", part2(realInput));
