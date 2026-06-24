/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
  const numberOfRotation = k % nums.length;
  const originalNums = [...nums];
  for (let i = 0; i < nums.length; i++) {
    nums[i] = originalNums[(nums.length - numberOfRotation + i) % nums.length];
  }
};
// var rotate = function (nums, k) {
//   const n = nums.length;
//   k = k % n;

//   reverse(nums, 0, n - 1); // reverse the whole array
//   reverse(nums, 0, k - 1); // reverse the first k
//   reverse(nums, k, n - 1); // reverse the rest
// };

// function reverse(arr, left, right) {
//   while (left < right) {
//     [arr[left], arr[right]] = [arr[right], arr[left]];
//     left++;
//     right--;
//   }
// }

const { test } = require("node:test");
const assert = require("node:assert");

test("example 1: [1..7] rotate by 3", () => {
  const nums = [1, 2, 3, 4, 5, 6, 7];
  rotate(nums, 3);
  assert.deepStrictEqual(nums, [5, 6, 7, 1, 2, 3, 4]);
});

test("example 2: [-1,-100,3,99] rotate by 2", () => {
  const nums = [-1, -100, 3, 99];
  rotate(nums, 2);
  assert.deepStrictEqual(nums, [3, 99, -1, -100]);
});

test("k = 0 leaves array unchanged", () => {
  const nums = [1, 2, 3];
  rotate(nums, 0);
  assert.deepStrictEqual(nums, [1, 2, 3]);
});

test("k equal to length leaves array unchanged", () => {
  const nums = [1, 2, 3, 4];
  rotate(nums, 4);
  assert.deepStrictEqual(nums, [1, 2, 3, 4]);
});

test("k greater than length wraps around", () => {
  const nums = [1, 2, 3, 4, 5];
  rotate(nums, 7); // equivalent to rotating by 2
  assert.deepStrictEqual(nums, [4, 5, 1, 2, 3]);
});

test("single element array", () => {
  const nums = [1];
  rotate(nums, 3);
  assert.deepStrictEqual(nums, [1]);
});

test("two element array, odd k", () => {
  const nums = [1, 2];
  rotate(nums, 1);
  assert.deepStrictEqual(nums, [2, 1]);
});

test("rotate by 1", () => {
  const nums = [1, 2, 3, 4, 5];
  rotate(nums, 1);
  assert.deepStrictEqual(nums, [5, 1, 2, 3, 4]);
});

test("k is an exact multiple of length", () => {
  const nums = [1, 2, 3];
  rotate(nums, 6);
  assert.deepStrictEqual(nums, [1, 2, 3]);
});

test("handles duplicate values", () => {
  const nums = [1, 1, 2, 2];
  rotate(nums, 2);
  assert.deepStrictEqual(nums, [2, 2, 1, 1]);
});

test("modifies in-place and returns undefined", () => {
  const nums = [1, 2, 3];
  const result = rotate(nums, 1);
  assert.strictEqual(result, undefined);
  assert.deepStrictEqual(nums, [3, 1, 2]);
});
