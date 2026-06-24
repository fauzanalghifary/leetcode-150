/**
 * @param {number[]} nums
 * @return {number}
 */
const removeDuplicates = function (nums) {
  if (nums.length === 0) return 0;
  let slowPointer = 0;
  let fastPointer = 1;

  while (fastPointer < nums.length) {
    if (nums[fastPointer] !== nums[slowPointer]) {
      nums[slowPointer + 1] = nums[fastPointer];
      slowPointer++;
      fastPointer++;
    } else {
      fastPointer++;
    }
  }

  return slowPointer + 1;
};
// const removeDuplicates = function (nums) {
//   let slowPointer = 0;
//   let fastPointer = 0;
//   let uniqueNums = new Set();

//   while (fastPointer < nums.length) {
//     if (!uniqueNums.has(nums[slowPointer])) {
//       uniqueNums.add(nums[slowPointer]);
//       slowPointer++;
//       fastPointer++;
//     } else {
//       while (uniqueNums.has(nums[fastPointer])) {
//         fastPointer++;
//       }
//       nums[slowPointer] = nums[fastPointer];
//     }
//   }

//   return uniqueNums.size;
// };

const { test } = require("node:test");
const assert = require("node:assert");

// The judge checks the first k elements in order.
function assertFirstK(nums, k, expected) {
  assert.strictEqual(k, expected.length);
  assert.deepStrictEqual(nums.slice(0, k), expected);
}

test("example 1: [1,1,2]", () => {
  const nums = [1, 1, 2];
  const k = removeDuplicates(nums);
  assertFirstK(nums, k, [1, 2]);
});

test("example 2: [0,0,1,1,1,2,2,3,3,4]", () => {
  const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
  const k = removeDuplicates(nums);
  assertFirstK(nums, k, [0, 1, 2, 3, 4]);
});

test("handles empty array", () => {
  const nums = [];
  const k = removeDuplicates(nums);
  assertFirstK(nums, k, []);
});

test("single element", () => {
  const nums = [7];
  const k = removeDuplicates(nums);
  assertFirstK(nums, k, [7]);
});

test("no duplicates", () => {
  const nums = [1, 2, 3, 4, 5];
  const k = removeDuplicates(nums);
  assertFirstK(nums, k, [1, 2, 3, 4, 5]);
});

test("all elements identical", () => {
  const nums = [3, 3, 3, 3];
  const k = removeDuplicates(nums);
  assertFirstK(nums, k, [3]);
});

test("two distinct elements", () => {
  const nums = [1, 2];
  const k = removeDuplicates(nums);
  assertFirstK(nums, k, [1, 2]);
});

test("duplicates only at the end", () => {
  const nums = [1, 2, 3, 3, 3];
  const k = removeDuplicates(nums);
  assertFirstK(nums, k, [1, 2, 3]);
});

test("duplicates only at the beginning", () => {
  const nums = [1, 1, 1, 2, 3];
  const k = removeDuplicates(nums);
  assertFirstK(nums, k, [1, 2, 3]);
});

test("handles negative numbers", () => {
  const nums = [-3, -3, -1, 0, 0, 2];
  const k = removeDuplicates(nums);
  assertFirstK(nums, k, [-3, -1, 0, 2]);
});

test("preserves sorted order of unique elements", () => {
  const nums = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
  const k = removeDuplicates(nums);
  assertFirstK(nums, k, [1, 2, 3, 4, 5]);
});
