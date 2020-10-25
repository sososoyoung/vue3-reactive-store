# vue3-reactive-store

## Installation
```sh
npm install vue3-reactive-store
```

## How to use
1. use store
```ts
// main.ts
import { createApp } from 'vue';
import App from './App';
import store from './store';

createApp(App).use(store).mount('#app');
```

```ts
// store.ts
import { createStore } from 'vue3-reactive-store';
const store = createStore();

export default store;
```
2. create hook
```ts
// hook.ts
import { reactive } from 'vue';
import { exportModule, createStore, useModule } from 'vue3-reactive-store';

const testHook = () => {
  const state = reactive({ num: 0 })

  const add = () => {
    state.num++;
  }

  return {
    state, add
  }
}

export type HookFnType = typeof testHook;
export default exportModule<HookFnType>(testHook)
```

3. inject hook
```ts

import store from '../your-store-path/store';

export default defineComponent({
  name: 'TestHook',
  setup() {
    const { state, add } = store.injectModule<HookFnType>(hookModule);
    return {
      testState:state, add
    }
  },
});
```
