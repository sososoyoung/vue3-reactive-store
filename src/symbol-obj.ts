export default class SymbolObj {
  private data = new Map()

  get<T>(k: symbol) {
    return this.data.get(k) as T;
  }

  set(k: symbol, v: any) {
    this.data.set(k, v)
  }

  has(k: symbol) {
    return k in this.data
  }

  del(k: symbol) {
    this.data.delete(k)
  }
}
