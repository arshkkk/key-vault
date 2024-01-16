import { store, Store } from "./store";
import {
  IStoreKey,
  IPrimitiveValue,
  IStoreSetValue,
} from "../../../interfaces";

export class StoreSet {
  private readonly store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  getSetFromStore(key: IStoreKey) {
    try {
      const set = (this.store.get(key)?.value as IStoreSetValue) || new Set();

      return { value: set, success: true };
    } catch (e) {
      return { value: undefined, success: false };
    }
  }

  add(key: IStoreKey, value: IPrimitiveValue) {
    try {
      const { success, value: set } = this.getSetFromStore(key);
      if (!success || !set) throw new Error();

      set.add(value);
      this.store.set(key, set);

      return { success: true };
    } catch (e) {
      return { success: false };
    }
  }

  delete(key: IStoreKey, value: IPrimitiveValue) {
    try {
      const { success, value: set } = this.getSetFromStore(key);
      if (!success || !set) throw new Error();

      set.delete(value);

      if (set.size === 0) {
        this.store.delete(key);
      }

      return { success: true };
    } catch (e) {
      return { success: false };
    }
  }

  size(key: IStoreKey) {
    try {
      const { success, value: set } = this.getSetFromStore(key);
      if (!success || !set) throw new Error();

      return { success: true, size: set.size };
    } catch (e) {
      return { success: false };
    }
  }

  members(key: IStoreKey) {
    try {
      const { success, value: set } = this.getSetFromStore(key);
      if (!success || !set) throw new Error();

      return { success: true, members: Array.from(set) };
    } catch (e) {
      return { success: false };
    }
  }
}

export const setStore = new StoreSet(store);
