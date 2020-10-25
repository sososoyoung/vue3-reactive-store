import { inject } from "vue"
import { Module, ModuleUseFn } from "./module"
import { Store } from './store';

export const storeKey = 'reactive-store'


export function useStore(key: string = storeKey) {
  return inject<Store>(key);
}

export function useModule<T extends ModuleUseFn>(m: Module<T>, _storeKey?: string) {
  const store = useStore(_storeKey)
  if (store) {
    return store.injectModule(m);
  }
}
