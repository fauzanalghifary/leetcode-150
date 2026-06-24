/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let numsFreq = new Map(); // track numbers count
  let slowPointer = 0; // last "unique" numbers
  let fastPointer = 0; // find replacement

  while (fastPointer < nums.length) {
    const currentNumber = nums[slowPointer];
    const currentNumberFreq = numsFreq.get(currentNumber) || 0;

    const replacement = nums[fastPointer];
    const replacementFreq = numsFreq.get(replacement) || 0;

    if (currentNumberFreq < 2) {
      numsFreq.set(currentNumber, currentNumberFreq + 1);
      slowPointer++;
    } else if (replacement !== currentNumber && replacementFreq < 2) {
      const temp = nums[slowPointer];
      nums[slowPointer] = nums[fastPointer];
      nums[fastPointer] = temp;
      numsFreq.set(replacement, replacementFreq + 1);
      slowPointer++;
    }

    fastPointer++;
  }

  return slowPointer;
};
// var removeDuplicates = function (nums) {
//   let k = 0; // next write position / final length
//   for (let i = 0; i < nums.length; i++) {
//     // keep nums[i] if we have < 2 kept yet, OR it differs from 2-back
//     if (k < 2 || nums[i] !== nums[k - 2]) {
//       nums[k] = nums[i];
//       k++;
//     }
//   }
//   return k;
// };

const { test } = require("node:test");
const assert = require("node:assert");

// The judge checks the first k elements in order.
function assertFirstK(nums, k, expected) {
  assert.strictEqual(k, expected.length);
  assert.deepStrictEqual(nums.slice(0, k), expected);
}

test("example 1: [1,1,1,2,2,3]", () => {
  const nums = [1, 1, 1, 2, 2, 3];
  // 1 1 1 2 2 3 (slow = 2, fast = 3)
  // 1 1 2 1 2 3 (after swap, slow = 3, fast = 4)
  // 1 1 2 2 1 3 (after swap, slow 4)
  const k = removeDuplicates(nums);
  assertFirstK(nums, k, [1, 1, 2, 2, 3]);
});

test("example 2: [0,0,1,1,1,1,2,3,3]", () => {
  const nums = [0, 0, 1, 1, 1, 1, 2, 3, 3];
  const k = removeDuplicates(nums);
  assertFirstK(nums, k, [0, 0, 1, 1, 2, 3, 3]);
});

test("handles empty array", () => {
  const nums = [];
  const k = removeDuplicates(nums);
  assertFirstK(nums, k, []);
});

test("single element", () => {
  const nums = [5];
  const k = removeDuplicates(nums);
  assertFirstK(nums, k, [5]);
});

test("two identical elements are both kept", () => {
  const nums = [2, 2];
  const k = removeDuplicates(nums);
  assertFirstK(nums, k, [2, 2]);
});

test("array shorter than 3 is unchanged", () => {
  const nums = [1, 2];
  const k = removeDuplicates(nums);
  assertFirstK(nums, k, [1, 2]);
});

test("no duplicates", () => {
  const nums = [1, 2, 3, 4, 5];
  const k = removeDuplicates(nums);
  assertFirstK(nums, k, [1, 2, 3, 4, 5]);
});

test("all elements identical keeps exactly two", () => {
  const nums = [3, 3, 3, 3, 3];
  const k = removeDuplicates(nums);
  assertFirstK(nums, k, [3, 3]);
});

test("each element appears exactly twice (unchanged)", () => {
  const nums = [1, 1, 2, 2, 3, 3];
  const k = removeDuplicates(nums);
  assertFirstK(nums, k, [1, 1, 2, 2, 3, 3]);
});

test("triples are trimmed to pairs", () => {
  const nums = [1, 1, 1, 2, 2, 2, 3, 3, 3];
  const k = removeDuplicates(nums);
  assertFirstK(nums, k, [1, 1, 2, 2, 3, 3]);
});

test("handles negative numbers", () => {
  const nums = [-2, -2, -2, -1, 0, 0, 0];
  const k = removeDuplicates(nums);
  assertFirstK(nums, k, [-2, -2, -1, 0, 0]);
});

test("long run of one value then singles", () => {
  const nums = [1, 1, 1, 1, 1, 2, 3];
  const k = removeDuplicates(nums);
  assertFirstK(nums, k, [1, 1, 2, 3]);
});
