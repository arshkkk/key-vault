import {
  primitiveStore,
  setStore,
  Store,
  store,
  StorePrimitive,
  StoreSet,
} from "./store";
import { IStoreValue } from "../../interfaces";

type QueryType = "set" | "get" | "remove" | "has";

class Query {
  private readonly store;
  private readonly set;
  private readonly primitive;

  constructor(store: Store, set: StoreSet, primitive: StorePrimitive) {
    this.store = store;
    this.set = set;
    this.primitive = primitive;
  }

  private getQueryConfig(type: QueryType) {
    const config: Record<QueryType, { length: number }> = {
      set: { length: 3 },
      get: { length: 2 },
      remove: { length: 2 },
      has: { length: 2 },
    };

    return config[type];
  }

  handleQuery(query: string): {
    success: boolean;
    reason?: string;
    value?: IStoreValue;
    exists?: boolean;
    queryType?: QueryType;
  } {
    const tokens = query.split(" ");
    const queryType = tokens.at(0) as QueryType;

    const config = this.getQueryConfig(queryType);

    if (!query || !queryType || tokens.length !== config.length) {
      return { success: false, reason: "Invalid Query" };
    }

    switch (queryType) {
      case "set": {
        const key = tokens.at(1);
        const value = tokens.at(2);

        if (!key || !value) {
          return { success: false, reason: "Invalid Key or Value" };
        }

        return { ...store.set(key, value), queryType };
      }

      case "get":
        const key = tokens.at(1);
        if (!key) {
          return { success: false, reason: "Invalid Key" };
        }
        return { ...store.get(key), queryType };

      case "has": {
        const key = tokens.at(1);
        if (!key) {
          return { success: false, reason: "Invalid Key" };
        }
        return { ...store.has(key), queryType };
      }

      case "remove": {
        const key = tokens.at(1);
        if (!key) {
          return { success: false, reason: "Invalid Key" };
        }
        return { ...store.delete(key), queryType };
      }

      default:
        return { success: false, reason: "Invalid Query" };
    }
  }
}

// Example usage:
export const queryHandler = new Query(store, setStore, primitiveStore);
