import { Lazy } from "../src/Lazy.js";
import { describe, expect, test } from "@jest/globals";

describe("Lazy evaluation", () => {
  test("applies a single function correctly", () => {
    const lazy = new Lazy();
    lazy.add(Math.sqrt);
    expect(lazy.evaluate([4, 9, 16])).toEqual([2, 3, 4]);
  });

  test("applies multiple functions correctly", () => {
    const lazy = new Lazy();
    lazy.add((x) => x * 2).add((x, y) => x + y, 1);
    expect(lazy.evaluate([1, 2, 3])).toEqual([3, 5, 7]);
  });

  test("handles empty target array", () => {
    const lazy = new Lazy();
    lazy.add((x) => x * 2);
    expect(lazy.evaluate([])).toEqual([]);
  });

  test("handles mixed data types", () => {
    const lazy = new Lazy();
    lazy.add((x) => typeof x);
    expect(lazy.evaluate([1, "hello", true])).toEqual([
      "number",
      "string",
      "boolean",
    ]);
  });
});
