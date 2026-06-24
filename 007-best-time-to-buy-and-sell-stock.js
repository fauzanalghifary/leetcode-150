/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let buyPointer = 0;
  let sellPointer = 1;
  let maxProfit = 0;

  while (sellPointer < prices.length) {
    if (prices[sellPointer] > prices[buyPointer]) {
      maxProfit = Math.max(maxProfit, prices[sellPointer] - prices[buyPointer]);
    } else {
      buyPointer = sellPointer;
    }

    sellPointer++;
  }

  return maxProfit;
};

const { test } = require("node:test");
const assert = require("node:assert");

test("example 1: [7,1,5,3,6,4]", () => {
  assert.strictEqual(maxProfit([7, 1, 5, 3, 6, 4]), 5);
});

test("example 2: [7,6,4,3,1] (no profit)", () => {
  assert.strictEqual(maxProfit([7, 6, 4, 3, 1]), 0);
});

test("empty array", () => {
  assert.strictEqual(maxProfit([]), 0);
});

test("single day (cannot sell)", () => {
  assert.strictEqual(maxProfit([5]), 0);
});

test("monotonically increasing prices", () => {
  assert.strictEqual(maxProfit([1, 2, 3, 4, 5]), 4);
});

test("monotonically decreasing prices", () => {
  assert.strictEqual(maxProfit([5, 4, 3, 2, 1]), 0);
});

test("all prices equal", () => {
  assert.strictEqual(maxProfit([3, 3, 3, 3]), 0);
});

test("two days with profit", () => {
  assert.strictEqual(maxProfit([1, 5]), 4);
});

test("two days without profit", () => {
  assert.strictEqual(maxProfit([5, 1]), 0);
});

test("min price comes after the best sell day", () => {
  // best buy/sell is 1 -> 8 (profit 7); the later 0 cannot be used to sell
  assert.strictEqual(maxProfit([3, 1, 8, 2, 0]), 7);
});

test("profit found at the very end", () => {
  assert.strictEqual(maxProfit([2, 4, 1, 7]), 6);
});

test("handles larger swing in the middle", () => {
  assert.strictEqual(maxProfit([9, 2, 10, 1, 8]), 8);
});
