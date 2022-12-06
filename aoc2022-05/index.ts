import { realStacks, realMoves, testStacks, testMoves } from "./inputs";

type Stack = string[];
type Stacks = Stack[];
type Move = {
  amount: number;
  from: number;
  to: number;
};
type Moves = Move[];

function parseStacks(input: string): Stack[] {
  return input.split("\n").map((elem) => elem.split(""));
}

function parseMove(movePhrase: string): Move {
  const tokens = movePhrase.split(" ");
  return {
    amount: parseInt(tokens[1], 10),
    from: parseInt(tokens[3], 10),
    to: parseInt(tokens[5], 10),
  };
}

function parseMoves(input: string): Moves {
  return input.split("\n").map(parseMove);
}

function performMove(
  stacks: Stacks,
  move: Move,
  moveTransform: (crates: string[]) => string[]
): Stacks {
  const { amount, from, to } = move;
  const indexFrom = from - 1;
  const indexTo = to - 1;
  const newStacks = [...stacks];
  const cratesToMove = moveTransform(newStacks[indexFrom].splice(-amount));
  newStacks[indexTo].push(...cratesToMove);
  return newStacks;
}

function part1(stacksInput: string, movesInput: string): string {
  const stacks = parseStacks(stacksInput);
  const moves = parseMoves(movesInput);
  const crateMover9000 = (crates) => crates.reverse();

  const resultStacks = moves.reduce(
    (accum, current) => performMove(accum, current, crateMover9000),
    stacks
  );
  return resultStacks.map((stack) => stack[stack.length - 1]).join("");
}

function part2(stacksInput: string, movesInput: string): string {
  const stacks = parseStacks(stacksInput);
  const moves = parseMoves(movesInput);
  const crateMover9001 = (crates) => crates;

  const resultStacks = moves.reduce(
    (accum, current) => performMove(accum, current, crateMover9001),
    stacks
  );
  return resultStacks.map((stack) => stack[stack.length - 1]).join("");
}

console.log("part1");
console.log("top of test stacks:", part1(testStacks, testMoves));
console.log("top of real stacks:", part1(realStacks, realMoves));

console.log("part2");
console.log("top of test stacks:", part2(testStacks, testMoves));
console.log("top of real stacks:", part2(realStacks, realMoves));
