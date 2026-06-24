/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  let candidate = null;
  let count = 0;

  for (const num of nums) {
    if (count === 0) candidate = num;
    count += num === candidate ? 1 : -1;
  }

  return candidate;
};
// var majorityElement = function (nums) {
//   const threshold = nums.length / 2;
//   const members = new Map();

//   for (let i = 0; i < nums.length; i++) {
//     members.set(nums[i], (members.get(nums[i]) || 0) + 1);

//     if (members.get(nums[i]) >= threshold) {
//       return nums[i];
//     }
//   }

//   return null;
// };

const { test } = require("node:test");
const assert = require("node:assert");

test("example 1: [3,2,3]", () => {
  assert.strictEqual(majorityElement([3, 2, 3]), 3);
});

test("example 2: [2,2,1,1,1,2,2]", () => {
  assert.strictEqual(majorityElement([2, 2, 1, 1, 1, 2, 2]), 2);
});

test("single element", () => {
  assert.strictEqual(majorityElement([1]), 1);
});

test("all elements identical", () => {
  assert.strictEqual(majorityElement([7, 7, 7, 7]), 7);
});

test("majority element appears exactly floor(n/2)+1 times", () => {
  assert.strictEqual(majorityElement([1, 2, 1, 2, 1]), 1);
});

test("majority is the smaller value", () => {
  assert.strictEqual(majorityElement([5, 5, 5, 9, 9]), 5);
});

test("handles negative numbers", () => {
  assert.strictEqual(majorityElement([-1, -1, -1, 2, 3]), -1);
});

test("majority clustered at the start", () => {
  assert.strictEqual(majorityElement([4, 4, 4, 4, 1, 2, 3]), 4);
});

test("majority clustered at the end", () => {
  assert.strictEqual(majorityElement([1, 2, 3, 6, 6, 6, 6]), 6);
});

test("zero as the majority element", () => {
  assert.strictEqual(majorityElement([0, 0, 0, 1, 2]), 0);
});

test("majority interleaved with distinct minority values", () => {
  assert.strictEqual(majorityElement([8, 1, 8, 2, 8, 3, 8]), 8);
});
