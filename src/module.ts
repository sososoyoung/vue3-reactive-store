export type ModuleUseFn = (args: any) => any

export interface Module<Fn> {
  __key: symbol;
  __isGlobal: boolean
  use: Fn;
}
