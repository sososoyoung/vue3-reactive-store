import { inject } from "vue"
import { Module, ModuleUseFn } from "./module"
import { Store } from './store';

export const storeKey = 'reactive-store'


export function useStore(key: string = storeKey) {
  const store = inject<Store>(key);
  if (!store) {
    throw new Error("You must use store at first!");
  }

  return store;
}

export function useModule<T extends ModuleUseFn, Args extends any>(m: Module<T>, args?: Args, _storeKey?: string) {
  return useStore(_storeKey).injectModule<T, Args>(m, args);
}
