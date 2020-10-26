# vue3-reactive-store
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) [![npm version](https://img.shields.io/npm/v/vue3-reactive-store.svg?style=flat)](https://www.npmjs.com/package/vue3-reactive-store)

一个轻巧的状态共享库, 基于vue3 reactive 创建

## 解决的问题:
一种轻量,简单的方式实现全局共享, 支持 ts 类型推断

## 特性
- 暂时不支持时间旅行
- 轻巧, 可创建多实例
- 不需要多实例时, 提供相应的辅助函数: `useModule`, `useStore`, 简化代码
- 与 vuex 不冲突, 奢简由人

## 安装
`npm install vue3-reactive-store`

## 开始使用
1. 全局安装
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
2. 创建 reactive hook
    ```ts
    // hook.ts
    import { reactive } from 'vue';
    import { exportGlobalModule } from 'vue3-reactive-store';

    const testHook = (iniNum = 0) => {
      const state = reactive({ num: iniNum })

      const add = () => {
        state.num++;
      }

      return {
        state, add
      }
    }

    export type HookFnType = typeof testHook;
    export default exportGlobalModule<HookFnType>(testHook)
    ```
3. 导入 reactive hook
    ```ts
    import { useModule, useStore } from 'vue3-reactive-store';

    export default defineComponent({
      name: 'TestHook',
      setup(props) {
        const { state, add } = useModule<HookFnType, number>(hookModule, 10);

        // 或者希望使用 store 时, 可以借助 `useStore`
        // const store = useStore()
        // const { state, add } = store.injectModule<HookFnType>(hookModule);

        return {
          state, add
        }
      },
    });
    ```
