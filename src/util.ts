import { Module, ModuleUseFn } from './module';

function warperModule<Fn>(fn: Fn, opt: { isGlobal: boolean } = { isGlobal: false }): Module<Fn> {
  return {
    __key: Symbol(),
    __isGlobal: opt.isGlobal,
    use: fn
  }
}

export function exportModule<Fn extends ModuleUseFn>(fn: Fn) {
  return warperModule<Fn>(fn);
}

export function exportGlobalModule<Fn extends ModuleUseFn>(fn: Fn) {
  return warperModule<Fn>(fn, { isGlobal: true });
}
