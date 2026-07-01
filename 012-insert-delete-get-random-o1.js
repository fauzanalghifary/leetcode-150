var RandomizedSet = function () {
  this.values = []; // array of current elements
  this.indices = new Map(); // val -> index in this.values
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (val) {
  if (this.indices.has(val)) return false;
  this.indices.set(val, this.values.length);
  this.values.push(val);
  return true;
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (val) {
  if (!this.indices.has(val)) return false;

  const idx = this.indices.get(val);
  const lastVal = this.values[this.values.length - 1];

  // Move the last element into the slot being vacated, then pop.
  this.values[idx] = lastVal;
  this.indices.set(lastVal, idx);

  this.values.pop();
  this.indices.delete(val);
  return true;
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
  const randomIdx = Math.floor(Math.random() * this.values.length);
  return this.values[randomIdx];
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */

const { test } = require("node:test");
const assert = require("node:assert");

test("example 1: full operation sequence", () => {
  const set = new RandomizedSet();
  assert.strictEqual(set.insert(1), true); // inserted
  assert.strictEqual(set.remove(2), false); // not present
  assert.strictEqual(set.insert(2), true); // inserted -> [1,2]
  assert.ok([1, 2].includes(set.getRandom()));
  assert.strictEqual(set.remove(1), true); // removed -> [2]
  assert.strictEqual(set.insert(2), false); // already present
  assert.strictEqual(set.getRandom(), 2); // only element
});

test("insert returns true only when value is new", () => {
  const set = new RandomizedSet();
  assert.strictEqual(set.insert(5), true);
  assert.strictEqual(set.insert(5), false);
  assert.strictEqual(set.insert(5), false);
});

test("remove returns false for absent value", () => {
  const set = new RandomizedSet();
  assert.strictEqual(set.remove(42), false);
});

test("remove returns true then false on repeat", () => {
  const set = new RandomizedSet();
  set.insert(7);
  assert.strictEqual(set.remove(7), true);
  assert.strictEqual(set.remove(7), false);
});

test("re-insert after removal succeeds", () => {
  const set = new RandomizedSet();
  set.insert(3);
  set.remove(3);
  assert.strictEqual(set.insert(3), true);
  assert.strictEqual(set.getRandom(), 3);
});

test("getRandom on single element always returns it", () => {
  const set = new RandomizedSet();
  set.insert(99);
  for (let i = 0; i < 20; i++) {
    assert.strictEqual(set.getRandom(), 99);
  }
});

test("getRandom only returns current members", () => {
  const set = new RandomizedSet();
  set.insert(10);
  set.insert(20);
  set.insert(30);
  set.remove(20); // set now {10, 30}
  const allowed = new Set([10, 30]);
  for (let i = 0; i < 50; i++) {
    assert.ok(allowed.has(set.getRandom()));
  }
});

test("removing the last-inserted element (swap-with-last edge case)", () => {
  const set = new RandomizedSet();
  set.insert(1);
  set.insert(2);
  set.insert(3);
  assert.strictEqual(set.remove(3), true); // removing the tail element
  const allowed = new Set([1, 2]);
  for (let i = 0; i < 20; i++) {
    assert.ok(allowed.has(set.getRandom()));
  }
});

test("removing a middle element keeps the rest intact", () => {
  const set = new RandomizedSet();
  set.insert(1);
  set.insert(2);
  set.insert(3);
  assert.strictEqual(set.remove(1), true); // removing a non-tail element
  const seen = new Set();
  for (let i = 0; i < 100; i++) {
    seen.add(set.getRandom());
  }
  assert.ok(!seen.has(1));
  assert.deepStrictEqual(
    [...seen].sort((a, b) => a - b),
    [2, 3],
  );
});

test("handles zero and negative values", () => {
  const set = new RandomizedSet();
  assert.strictEqual(set.insert(0), true);
  assert.strictEqual(set.insert(-5), true);
  assert.strictEqual(set.remove(0), true);
  assert.strictEqual(set.getRandom(), -5);
});

test("getRandom is roughly uniform over members", () => {
  const set = new RandomizedSet();
  const values = [1, 2, 3, 4];
  values.forEach((v) => set.insert(v));

  const counts = new Map(values.map((v) => [v, 0]));
  const trials = 40000;
  for (let i = 0; i < trials; i++) {
    const picked = set.getRandom();
    counts.set(picked, counts.get(picked) + 1);
  }

  const expected = trials / values.length;
  for (const v of values) {
    // allow generous tolerance to avoid flakiness
    assert.ok(
      Math.abs(counts.get(v) - expected) < expected * 0.2,
      `value ${v} count ${counts.get(v)} deviated too far from ${expected}`,
    );
  }
});
