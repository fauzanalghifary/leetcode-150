/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function (citations) {
  const sortedCitations = citations.sort((a, b) => a - b);

  for (let i = 0; i < sortedCitations.length; i++) {
    if (sortedCitations[i] >= sortedCitations.length - i) {
      return sortedCitations.length - i;
    }
  }

  return 0;
};

const { test } = require("node:test");
const assert = require("node:assert");

test("example 1: [3,0,6,1,5]", () => {
  assert.strictEqual(hIndex([3, 0, 6, 1, 5]), 3);
});

test("example 2: [1,3,1]", () => {
  assert.strictEqual(hIndex([1, 3, 1]), 1);
});

test("mixed values including two-digit: [6,6,4,8,4,3,3,10]", () => {
  // sorted: [3,3,4,4,6,6,8,10] -> 4 papers with >= 4 citations
  assert.strictEqual(hIndex([6, 6, 4, 8, 4, 3, 3, 10]), 4);
});

test("single paper with no citations", () => {
  assert.strictEqual(hIndex([0]), 0);
});

test("single paper with many citations", () => {
  assert.strictEqual(hIndex([100]), 1);
});

test("all papers uncited", () => {
  assert.strictEqual(hIndex([0, 0, 0]), 0);
});

test("all papers cited enough for full h-index", () => {
  // 4 papers each cited at least 4 times
  assert.strictEqual(hIndex([4, 4, 4, 4]), 4);
});

test("citations capped by paper count", () => {
  // only 3 papers, even though each is highly cited -> h can be at most 3
  assert.strictEqual(hIndex([10, 8, 5]), 3);
});

test("already sorted ascending", () => {
  assert.strictEqual(hIndex([0, 1, 3, 5, 6]), 3);
});

test("already sorted descending", () => {
  assert.strictEqual(hIndex([6, 5, 4, 1, 0]), 3);
});

test("all citations equal to length", () => {
  assert.strictEqual(hIndex([5, 5, 5, 5, 5]), 5);
});

test("all citations equal but below length", () => {
  // 5 papers each cited 2 times -> h-index is 2
  assert.strictEqual(hIndex([2, 2, 2, 2, 2]), 2);
});

test("one highly cited, rest zero", () => {
  assert.strictEqual(hIndex([0, 0, 0, 100]), 1);
});

test("h limited by threshold not count", () => {
  // 6 papers but only 3 have >= 3 citations
  assert.strictEqual(hIndex([1, 1, 2, 3, 3, 3]), 3);
});

test("duplicates around the boundary", () => {
  assert.strictEqual(hIndex([2, 2, 2]), 2);
});
