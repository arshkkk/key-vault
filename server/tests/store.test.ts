import { test, expect, beforeEach, beforeAll } from "bun:test";
import { store } from "../src/service";

beforeAll(() => store.clear());
beforeEach(() => {
  store.clear();
  store.set("key", "value");
});

test("store:set", () => {
  // basic set
  const val = store.set("key", "value");
  expect(val.success).toBe(true);

  // Overriding Values
  const val2 = store.set("key", "value1");
  expect(val2.success).toBe(true);
  expect(store.get("key").value).toBe("value1");
});

test("store:has", () => {
  // store.set("key", "value");
  const val = store.has("key");
  expect(val.success).toBe(true);
  expect(val.exists).toBe(true);

  const notExists = store.has("key-notExists");
  expect(notExists.success).toBe(true);
  expect(notExists.exists).toBe(false);
});

test("store:size", () => {
  // store.set("key", "value");
  const val = store.size();
  expect(val.success).toBe(true);
  expect(val.size).toBe(1);

  // Overriding shouldn't increase size
  store.set("key", "value1");
  const val1 = store.size();
  expect(val1.success).toBe(true);
  expect(val1.size).toBe(1);

  // more keys
  store.set("key1", "value1");
  const val2 = store.size();
  expect(val2.success).toBe(true);
  expect(val2.size).toBe(2);
});

test("store:get", () => {
  // store.set("key", "value");
  const val = store.get("key");
  expect(val.success).toBe(true);
  expect(val.value).toBe("value");

  const notExists = store.get("key-notExists");
  expect(notExists.success).toBe(true);
  expect(notExists.value).toBeUndefined();
});

test("store:clear", () => {
  expect(store.size().size).toBe(1);
  store.clear();
  expect(store.size().size).toBe(0);
});
