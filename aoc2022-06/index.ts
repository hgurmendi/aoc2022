import { testInputs, realInput } from "./inputs";

// A buffer is an array of single characters.
type Buffer = string[];

const START_OF_PACKET_MARKER_SIZE = 4;
const START_OF_MESSAGE_MARKER_SIZE = 14;

function parseLine(line: string): Buffer {
  return Array.from(line);
}

function isStartOfPacketMarker(buf: Buffer): boolean {
  return new Set(buf).size === START_OF_PACKET_MARKER_SIZE;
}

function isStartOfMessageMarker(buf: Buffer): boolean {
  return new Set(buf).size === START_OF_MESSAGE_MARKER_SIZE;
}

function getMarkerAt(
  buffer: Buffer,
  upToIndex: number,
  markerSize: number
): Buffer {
  const fromIndex = Math.max(upToIndex - markerSize + 1, 0);
  const toIndex = upToIndex + 1;

  return buffer.slice(fromIndex, toIndex);
}

function firstCharAfterMarker(
  buffer: Buffer,
  isMarker: (buf: Buffer) => boolean,
  markerSize: number
): number {
  for (let i = 0; i < buffer.length; i++) {
    if (isMarker(getMarkerAt(buffer, i, markerSize))) {
      return i + 1;
    }
  }

  // This shouldn't happen if all the buffers have at least one start of packet marker
  return -1;
}

function part1(input: string): number {
  return firstCharAfterMarker(
    parseLine(input),
    isStartOfPacketMarker,
    START_OF_PACKET_MARKER_SIZE
  );
}

function testPart1(inputs: string): number[] {
  return inputs.split("\n").map(part1);
}

console.log("test part 1");
console.log(testPart1(testInputs));
// Correct answer: [7, 5, 6, 10, 11]

console.log("part 1");
console.log(part1(realInput));
// Correct answer: 1896.

// part 2

function part2(input: string): number {
  return firstCharAfterMarker(
    parseLine(input),
    isStartOfMessageMarker,
    START_OF_MESSAGE_MARKER_SIZE
  );
}

function testPart2(inputs: string): number[] {
  return inputs.split("\n").map(part2);
}

console.log("test part 2");
console.log(testPart2(testInputs));
// Correct answer: [19, 23, 23, 29, 26]

console.log("part 2");
console.log(part2(realInput));
// Correct answer: 3452.
