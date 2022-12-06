import { testInputs, realInput } from "./inputs";

// A buffer is an array of single characters.
type Buffer = string[];

const MARKER_SIZE = 4;

function parseLine(line: string): Buffer {
  return Array.from(line);
}

function parseMultipleInputs(input: string): Buffer[] {
  return input.split("\n").map(parseLine);
}

function isStartOfPacketMarker(marker: Buffer): boolean {
  // const characters = new Set(Array.from(marker));
  // return 4 === characters.size;
  return new Set(marker).size === 4;
}

function getMarkerAt(buffer: Buffer, upToIndex: number): Buffer {
  const fromIndex = Math.max(upToIndex - MARKER_SIZE + 1, 0);
  const toIndex = upToIndex + 1;

  return buffer.slice(fromIndex, toIndex);
}

function firstCharAfterStartOfPacket(buffer: Buffer): number {
  for (let i = 0; i < buffer.length; i++) {
    if (isStartOfPacketMarker(getMarkerAt(buffer, i))) {
      return i + 1;
    }
  }

  // This shouldn't happen if all the buffers have at least one start of packet marker
  return -1;
}

function testPart1(inputs: string): number[] {
  const testBuffers = parseMultipleInputs(testInputs);

  return testBuffers.map(firstCharAfterStartOfPacket);
}

console.log('test part 1');
console.log(testPart1(testInputs));

function part1(input: string): number {
  return firstCharAfterStartOfPacket(parseLine(input));
}


console.log('part 1');
console.log(part1(realInput));
// Correct answer: 1896.