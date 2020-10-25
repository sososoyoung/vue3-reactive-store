import { reactive } from 'vue';
import { exportModule, createStore, useModule } from '../src';

const testHook = () => {
  const state = reactive({ num: 0 })

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
  const { state, add } = store.injectModule<HookFnType>(hookModule);
  expect(state.num).toBe(0);
  add()
  expect(state.num).toBe(1);
});
