react-app-page-component-state
===========
通过useAppState、usePageState、useComponentState在整个应用、页面、组件中类似useState的用法，在跨父子组件使用相同的状态 

Let's use app state by function useAppState like useState in whole application, also provides usePageState and useComponentState function

#### 通过npm或者yarn安装 / Install with npm or yarn
```bash
# npm
npm install react-app-page-component-state

# yarn
yarn add react-app-page-component-state
```

## 用法 / Usage
推荐在Typescript环境下使用
This library is recommended for use in a TypeScript environment.
### useAppState
src/index.tsx
```js
...
import { AppStateProvider } from 'react-app-page-component-state';

...
    <AppStateProvider getInitState={() => new AppState()}>
      <HashRouter>
        <Routes>
            ...
        </Routes>
      </HashRouter>
    </AppStateProvider>
...
```

AppState.ts
```js
export class AppState {
    str = "" // 设置初始值 / init value set here
    userId: null | number = null
    nickname = ""
}
```

AppStateTestPage.tsx
```js
...
import { getUseAppState, useAppState } from "react-app-page-component-state"

export function AppStateTestPage() {
    //
    // TS:
    //
    // 1. ts环境下的推荐用法 / Recommended Approach for TS
    let _useAppState = getUseAppState<AppState>()
    let [str, setStr] = _useAppState("str")
    //
    // 2. ts环境下的推荐用法 / Recommended Approach for TS
    // let [str, setStr] = getUseAppState<AppState>()("str")
    //
    // 3. 不推荐在ts环境下使用的用法 / Not recommended for TS
    // let [str, setStr] = useAppState<AppState, "str">("str")
    //
    // 4. 不推荐在ts环境下使用的用法 / Not recommended for TS
    // let [str, setStr] = useAppState("str4", null! as AppState)
    //
    // JS:
    //
    // 1. js环境下的推荐用法 / Recommended Approach for JS
    // let useAppState = getUseAppState()
    // let [str, setStr] = useAppState("str")
    //
    // 2. js环境下的推荐用法 / Recommended Approach for JS
    // let [str, setStr] = useAppState("str")
    ...
}
```


### usePageState
PageStateTestPage.tsx
```js
...
import { usePageState, withPageStateProvider } from "react-app-page-component-state"

export default withPageStateProvider(PageStateTestPage, () => new PageState())

function PageStateTestPage() {
    //
    // TS:
    //
    // 1. ts环境下的推荐用法 / Recommended Approach for TS
    let _usePageState = getUsePageState<PageState>()
    let [count, setCount] = _usePageState("count")
    //
    // 2. ts环境下的推荐用法 / Recommended Approach for TS
    // let [count, setCount] = getUsePageState<PageState>()("count")
    //
    // 3. 不推荐在ts环境下使用的用法 / Not recommended for TS
    // let [count, setCount] = usePageState<PageState, "count">("count")
    //
    // 4. 不推荐在ts环境下使用的用法 / Not recommended for TS
    // let [count, setCount] = usePageState("count", null! as PageState)
    //
    // JS:
    //
    // 1. js环境下的推荐用法 / Recommended Approach for JS
    // let usePageState = getUsePageState()
    // let [count, setCount] = usePageState("count")
    //
    // 2. js环境下的推荐用法 / Recommended Approach for JS
    // let [count, setCount] = usePageState("count")
    ...
}
```

PageState.ts
```js
export class PageState {
    count = 0
    title = ""
    id = null
}
```


### useComponentState
ComponentStateTestComponent.tsx
```js
...
import { useComponentState, withComponentStateProvider } from "react-app-page-component-state"

export default withComponentStateProvider(TestComponent, () => new ComponentState())

function TestComponent() {
    //
    // TS:
    //
    // 1. ts环境下的推荐用法 / Recommended Approach for TS
    let _useComponentState = getUseComponentState<ComponentState>()
    let [count, setCount] = _useComponentState("count")
    //
    // 2. ts环境下的推荐用法 / Recommended Approach for TS
    // let [count, setCount] = getUseComponentState<ComponentState>()("count")
    //
    // 3. 不推荐在ts环境下使用的用法 / Not recommended for TS
    // let [count, setCount] = useComponentState<ComponentState, "count">("count")
    //
    // 4. 不推荐在ts环境下使用的用法 / Not recommended for TS
    // let [count, setCount] = useComponentState("count", null! as ComponentState)
    //
    // JS:
    //
    // 1. js环境下的推荐用法 / Recommended Approach for JS
    // let useComponentState = getUseComponentState()
    // let [count, setCount] = useComponentState("count")
    //
    // 2. js环境下的推荐用法 / Recommended Approach for JS
    // let [count, setCount] = useComponentState("count")
    ...
}
```

ComponentState.ts
```js
export class ComponentState {
    count = 0
    title = ""
}
```



### 非Hook环境外获取、设置或监听状态 / get, set or listener state for outside the hook
```js
```