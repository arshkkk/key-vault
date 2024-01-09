import { store, Store } from "./store.ts";
import {
  IStoreKey,
  IPrimitiveValue,
  IStoreDeleteConfig,
  IStoreValueConfig,
} from "../../interfaces";

type IIncrementConfig = { incrementBy?: number };

class StorePrimitive {
  private readonly store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  increment(key: IStoreKey, { incrementBy = 1 }: IIncrementConfig = {}) {
    try {
      const { value = 0, success } = this.store.get(key);
      if (!success) {
        throw new Error();
      }

      let updatedValue = undefined;

      if (typeof value === "number") {
        updatedValue = value + 1;
      } else if (typeof value === "string" && !isNaN(Number(value))) {
        updatedValue = Number(value) + 1;
      }

      if (updatedValue) {
        this.store.set(key, updatedValue);
        return { success: true, updatedValue };
      } else {
        throw new Error();
      }
    } catch (e) {
      return { success: false };
    }
  }
}

export const primitiveStore = new StorePrimitive(store);
