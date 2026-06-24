/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
const merge = function (nums1, m, nums2, n) {
  let i = m - 1;
  let j = n - 1;
  let k = m + n - 1;

  while (j >= 0) {
    if (i >= 0 && nums1[i] > nums2[j]) {
      nums1[k] = nums1[i];
      i--;
    } else {
      nums1[k] = nums2[j];
      j--;
    }

    k--;
  }
};

const { test } = require("node:test");
const assert = require("node:assert");

test("merges two non-empty sorted arrays in-place (example 1)", () => {
  const nums1 = [1, 2, 3, 0, 0, 0];
  merge(nums1, 3, [2, 5, 6], 3);
  assert.deepStrictEqual(nums1, [1, 2, 2, 3, 5, 6]);
});

test("handles empty nums2 (example 2)", () => {
  const nums1 = [1];
  merge(nums1, 1, [], 0);
  assert.deepStrictEqual(nums1, [1]);
});

test("handles empty nums1 (example 3)", () => {
  const nums1 = [0];
  merge(nums1, 0, [1], 1);
  assert.deepStrictEqual(nums1, [1]);
});

test("handles both arrays empty", () => {
  const nums1 = [];
  merge(nums1, 0, [], 0);
  assert.deepStrictEqual(nums1, []);
});

test("all elements of nums2 are smaller than nums1", () => {
  const nums1 = [4, 5, 6, 0, 0, 0];
  merge(nums1, 3, [1, 2, 3], 3);
  assert.deepStrictEqual(nums1, [1, 2, 3, 4, 5, 6]);
});

test("all elements of nums2 are larger than nums1", () => {
  const nums1 = [1, 2, 3, 0, 0, 0];
  merge(nums1, 3, [4, 5, 6], 3);
  assert.deepStrictEqual(nums1, [1, 2, 3, 4, 5, 6]);
});

test("interleaves elements from both arrays", () => {
  const nums1 = [1, 3, 5, 0, 0, 0];
  merge(nums1, 3, [2, 4, 6], 3);
  assert.deepStrictEqual(nums1, [1, 2, 3, 4, 5, 6]);
});

test("handles duplicate values across both arrays", () => {
  const nums1 = [2, 2, 2, 0, 0, 0];
  merge(nums1, 3, [2, 2, 2], 3);
  assert.deepStrictEqual(nums1, [2, 2, 2, 2, 2, 2]);
});

test("handles negative numbers", () => {
  const nums1 = [-5, -2, 0, 0, 0, 0];
  merge(nums1, 3, [-3, -1, 4], 3);
  assert.deepStrictEqual(nums1, [-5, -3, -2, -1, 0, 4]);
});

test("handles single element in each array", () => {
  const nums1 = [2, 0];
  merge(nums1, 1, [1], 1);
  assert.deepStrictEqual(nums1, [1, 2]);
});

test("does not return a value (modifies in-place)", () => {
  const nums1 = [1, 0];
  const result = merge(nums1, 1, [2], 1);
  assert.strictEqual(result, undefined);
});
