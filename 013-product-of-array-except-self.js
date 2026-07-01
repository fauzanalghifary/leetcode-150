/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  let result = [];

  let prefix = 1;
  for (let i = 0; i < nums.length; i++) {
    result[i] = prefix;
    prefix *= nums[i];
  }

  let suffix = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] *= suffix;
    if (result[i] === -0) result[i] = 0;
    suffix *= nums[i];
  }

  return result;
};

const { test } = require("node:test");
const assert = require("node:assert");

test("example 1: [1,2,3,4]", () => {
  assert.deepStrictEqual(productExceptSelf([1, 2, 3, 4]), [24, 12, 8, 6]);
});

test("example 2: [-1,1,0,-3,3] (single zero)", () => {
  assert.deepStrictEqual(productExceptSelf([-1, 1, 0, -3, 3]), [0, 0, 9, 0, 0]);
});

test("two elements", () => {
  assert.deepStrictEqual(productExceptSelf([2, 3]), [3, 2]);
});

test("contains one zero -> only that index is nonzero", () => {
  assert.deepStrictEqual(productExceptSelf([4, 5, 0, 8]), [0, 0, 160, 0]);
});

test("contains two zeros -> all zeros", () => {
  assert.deepStrictEqual(productExceptSelf([0, 4, 0, 8]), [0, 0, 0, 0]);
});

test("negative numbers", () => {
  assert.deepStrictEqual(
    productExceptSelf([-1, -2, -3, -4]),
    [-24, -12, -8, -6],
  );
});

test("mixed signs affect result sign", () => {
  assert.deepStrictEqual(productExceptSelf([2, -3, 4]), [-12, 8, -6]);
});

test("all ones", () => {
  assert.deepStrictEqual(productExceptSelf([1, 1, 1, 1]), [1, 1, 1, 1]);
});

test("contains ones among other values", () => {
  assert.deepStrictEqual(productExceptSelf([1, 2, 1, 3]), [6, 3, 6, 2]);
});

test("does not use division (safe with zeros)", () => {
  // if implemented with total-product / nums[i], this would throw or produce NaN/Infinity
  const result = productExceptSelf([0, 0]);
  assert.deepStrictEqual(result, [0, 0]);
});

test("does not mutate the input array", () => {
  const input = [1, 2, 3, 4];
  productExceptSelf(input);
  assert.deepStrictEqual(input, [1, 2, 3, 4]);
});
