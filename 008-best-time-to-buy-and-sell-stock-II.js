/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let profit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1];
    }
  }
  return profit;
};
// var maxProfit = function (prices) {
//   let maxProfit = 0;
//   let cumulativeProfit = 0;
//   let buyPointer = 0;
//   let sellPointer = 1;

//   while (sellPointer < prices.length) {
//     if (prices[sellPointer] > prices[sellPointer - 1]) {
//       maxProfit = Math.max(maxProfit, prices[sellPointer] - prices[buyPointer]);
//     } else {
//       buyPointer = sellPointer;
//       cumulativeProfit += maxProfit;
//       maxProfit = 0;
//     }

//     sellPointer++;
//     if (sellPointer === prices.length) cumulativeProfit += maxProfit;
//   }

//   return cumulativeProfit;
// };

const { test } = require("node:test");
const assert = require("node:assert");

test("example 1: [7,1,5,3,6,4]", () => {
  assert.strictEqual(maxProfit([7, 1, 5, 3, 6, 4]), 7);
});

test("example 2: [1,2,3,4,5] (monotonic increase)", () => {
  assert.strictEqual(maxProfit([1, 2, 3, 4, 5]), 4);
});

test("example 3: [7,6,4,3,1] (no profit)", () => {
  assert.strictEqual(maxProfit([7, 6, 4, 3, 1]), 0);
});

test("empty array", () => {
  assert.strictEqual(maxProfit([]), 0);
});

test("single day", () => {
  assert.strictEqual(maxProfit([5]), 0);
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

test("captures every upward step (zigzag)", () => {
  // gains: 1->5 (4), 3->6 (3) = 7
  assert.strictEqual(maxProfit([7, 1, 5, 3, 6, 4]), 7);
});

test("multiple separate climbs", () => {
  // 1->5 (4) then 2->8 (6) = 10
  assert.strictEqual(maxProfit([1, 5, 2, 8]), 10);
});

test("sum of consecutive increases equals total climb", () => {
  // 3->8 in steps: 3,4,7,8 -> (1)+(3)+(1) = 5
  assert.strictEqual(maxProfit([3, 4, 7, 8]), 5);
});

test("dips between peaks are not counted as losses", () => {
  // 2->6 (4), 1->9 (8) = 12; the drop 6->1 is skipped, not subtracted
  assert.strictEqual(maxProfit([2, 6, 1, 9]), 12);
});
