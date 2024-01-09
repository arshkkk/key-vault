import {
  IStoreDeleteConfig,
  IStoreKey,
  IStoreSetValueConfig,
  IStoreValue,
  IStoreValueItem,
} from "../../interfaces";
import dayjs from "dayjs";

export class Store {
  private readonly map: Map<string, IStoreValueItem>;
  constructor() {
    this.map = new Map<string, IStoreValueItem>();
  }

  private isExpired(value: IStoreValueItem) {
    const expiresAt = value?.c?.expiresAt;
    if (!expiresAt) return false;

    return dayjs().isAfter(dayjs(expiresAt));
  }

  get(key: IStoreKey) {
    try {
      const storeItem = this.map.get(key);
      if (storeItem && this.isExpired(storeItem)) {
        this.map.delete(key);
        return { value: undefined, success: true };
      }

      return { value: storeItem?.v, success: true };
    } catch (e) {
      return { success: false, value: undefined };
    }
  }

  has(key: IStoreKey) {
    try {
      const exists = this.map.has(key);
      return { exists, success: true };
    } catch (e) {
      return { success: false, exists: undefined };
    }
  }

  set(key: IStoreKey, value: IStoreValue, config?: IStoreSetValueConfig) {
    try {
      let { expiresAt, expiresIn } = config || {};

      if (expiresIn) {
        expiresAt = dayjs().add(expiresIn.value, expiresIn.unit).valueOf();
      }

      this.map.set(key, { v: value, c: { expiresAt } });
      return { success: true };
    } catch (e) {
      return { success: false };
    }
  }

  delete(key: IStoreKey, config?: IStoreDeleteConfig) {
    try {
      let value = undefined;
      if (config?.returnDeletedValue) {
        value = this.get(key);
      }

      this.map.delete(key);
      return { success: true, deletedValue: value };
    } catch (e) {
      return { success: false };
    }
  }

  size() {
    try {
      return { success: true, size: this.map.size };
    } catch (e) {
      return { success: false };
    }
  }

  clear() {
    try {
      this.map.clear();
      return { success: true };
    } catch (e) {
      return { success: false };
    }
  }
}

export const store = new Store();
