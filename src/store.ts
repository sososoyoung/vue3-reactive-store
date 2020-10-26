import { App } from 'vue'
import { Module, ModuleUseFn } from './module';
import SymbolObj from './symbol-obj';
import { storeKey } from './use-store';

export interface Options {
  lazy?: boolean
}

export function createStore(options?: Options) {
  return new Store(options)
}

const defaultOpt: Options = {
  lazy: true
}


export class Store {
  private _modules: SymbolObj = new SymbolObj()
  private _globalModules: SymbolObj = new SymbolObj()
  private options: Options = defaultOpt

  constructor(opt?: Options) {
    if (opt) {
      Object.assign(this.options, opt)
    }
  }

  install(app: App, injectKey: string | symbol) {
    app.provide(injectKey || storeKey, this)
    app.config.globalProperties.$reactiveStore = this
  }


  getModule(key: symbol) {
    return this._modules.get(key)
  }

  hasModule(key: symbol) {
    return this._modules.has(key)
  }

  private initGlobalModule<T extends ModuleUseFn, Args>(key: symbol, m: Module<T>, args?: Args): ReturnType<T> {
    const instance = m.use(args);
    this._globalModules.set(key, instance)

    return instance;
  }

  registerModule(m: Module<ModuleUseFn>, args?: any) {
    const key = m.__key
    if (!key) {
      throw new Error("The name of the module is required!");
    }

    if (this._modules.has(key)) {
      console.error(`The module had been registered!`)
      return;
    }
    this._modules.set(key, m)

    if (!this.options.lazy && m.__isGlobal) {
      this.initGlobalModule(key, m, args);
    }
  }

  unregisterModule(key: symbol) {
    this._modules.del(key)
  }

  injectModule<T extends ModuleUseFn, Args extends any>(m: Module<T>, args?: Args): ReturnType<T> {
    const key = m.__key;
    if (m.__isGlobal && this._globalModules.has(key)) {
      return this._globalModules.get<ReturnType<T>>(key);
    }

    if (m.__isGlobal) {
      return this.initGlobalModule<T, Args>(key, m, args);
    }

    return m.use(args);

  }
}
