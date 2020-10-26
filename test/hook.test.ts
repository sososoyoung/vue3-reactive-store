import { reactive } from 'vue';
import { exportModule, createStore, useModule } from '../src';

const testHook = (initValue = 0) => {
  const state = reactive({ num: initValue })

  const add = () => {
    state.num++;
  }

  return {
    state, add
  }
}

type HookFnType = typeof testHook;
const hookModule = exportModule<HookFnType>(testHook)

const store = createStore()

test('test injected module', () => {
  const { state, add } = store.injectModule<HookFnType, number>(hookModule, 10);
  expect(state.num).toBe(10);
  add()
  expect(state.num).toBe(11);
});
