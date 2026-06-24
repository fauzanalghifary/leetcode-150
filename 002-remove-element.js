/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
const removeElement = function (nums, val) {
  let n = nums.length;
  let i = 0;
  while (i < n) {
    if (nums[i] === val) {
      nums[i] = nums[n - 1];
      n--;
    } else {
      i++;
    }
  }
  return n;
};
// const removeElement = function (nums, val) {
//   let frontPointer = 0;
//   let backPointer = nums.length - 1;
//   let targetFound = 0;

//   while (frontPointer <= backPointer) {
//     if (nums[frontPointer] === val) {
//       targetFound++;
//       while (nums[backPointer] === val && frontPointer < backPointer) {
//         backPointer--;
//         targetFound++;
//       }
//       const temp = nums[frontPointer];
//       nums[frontPointer] = nums[backPointer];
//       nums[backPointer] = temp;
//       backPointer--;
//     }
//     frontPointer++;
//   }

//   return nums.length - targetFound;
// };

const { test } = require("node:test");
const assert = require("node:assert");

// The judge only cares about the first k elements (order-independent),
// so we sort the first k elements before comparing.
function assertFirstK(nums, k, expected) {
  assert.strictEqual(k, expected.length);
  const firstK = nums.slice(0, k).sort((a, b) => a - b);
  assert.deepStrictEqual(
    firstK,
    [...expected].sort((a, b) => a - b),
  );
}

test("example 1: removes all occurrences of val", () => {
  const nums = [3, 2, 2, 3];
  const k = removeElement(nums, 3);
  assertFirstK(nums, k, [2, 2]);
});

test("example 2: removes val from a larger array", () => {
  const nums = [0, 1, 2, 2, 3, 0, 4, 2];
  const k = removeElement(nums, 2);
  assertFirstK(nums, k, [0, 1, 4, 0, 3]);
});

test("handles empty array", () => {
  const nums = [];
  const k = removeElement(nums, 1);
  assertFirstK(nums, k, []);
});

test("val not present leaves all elements", () => {
  const nums = [1, 2, 3, 4];
  const k = removeElement(nums, 9);
  assertFirstK(nums, k, [1, 2, 3, 4]);
});

test("all elements equal val", () => {
  const nums = [5, 5, 5, 5];
  const k = removeElement(nums, 5);
  assertFirstK(nums, k, []);
});

test("single element equal to val", () => {
  const nums = [7];
  const k = removeElement(nums, 7);
  assertFirstK(nums, k, []);
});

test("single element not equal to val", () => {
  const nums = [7];
  const k = removeElement(nums, 3);
  assertFirstK(nums, k, [7]);
});

test("val at the beginning", () => {
  const nums = [4, 1, 2, 3];
  const k = removeElement(nums, 4);
  assertFirstK(nums, k, [1, 2, 3]);
});

test("val at the end", () => {
  const nums = [1, 2, 3, 4];
  const k = removeElement(nums, 4);
  assertFirstK(nums, k, [1, 2, 3]);
});

test("handles duplicates of non-val values", () => {
  const nums = [2, 2, 3, 3, 3];
  const k = removeElement(nums, 3);
  assertFirstK(nums, k, [2, 2]);
});
