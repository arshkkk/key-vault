import {
  IStoreKey,
  IPrimitiveValue,
  IStoreSetValueConfig,
  IStoreValueConfig,
  IStoreValueItem,
  IStoreDeleteConfig,
} from "../../interfaces";
import dayjs from "dayjs";

export class Store {
  private readonly map: Map<string, IStoreValueItem>;
  constructor() {
    this.map = new Map<string, IStoreValueItem>();
  }

  private sanitizeValue(value: IPrimitiveValue) {
    return value;
  }

  private isExpired(value: IStoreValueItem) {
    const expiresAt = value?.c?.expiresAt;
    if (!expiresAt) return false;

    return dayjs().isAfter(dayjs(expiresAt));
  }

  get(key: IStoreKey) {
    try {
      const value = this.map.get(key)?.v;
      return { value, success: true };
    } catch (e) {
      return { success: false, value: undefined };
    }
  }

  has(key: IStoreKey) {
    try {
      const value = this.map.get(key);
      return { value, success: true };
    } catch (e) {
      return { success: false, value: undefined };
    }
  }

  set(key: IStoreKey, value: IPrimitiveValue, config?: IStoreSetValueConfig) {
    try {
      let { expiresAt, expiresIn } = config || {};

      if (expiresIn) {
        expiresAt = dayjs().add(expiresIn.value, expiresIn.unit).valueOf();
      }

      this.map.set(key, { v: this.sanitizeValue(value), c: { expiresAt } });
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
