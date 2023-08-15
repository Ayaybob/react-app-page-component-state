react-app-page-component-state
===========

#### 通过npm或者yarn安装 / Install with npm or yarn
```bash
# npm
npm install react-app-page-component-state

# yarn
yarn add react-app-page-component-state
```

## 用法 / Usage

推荐在Typescript环境下使用 / This library is recommended for use in a TypeScript environment.
### useAppState
index.tsx
```js
...
import { AppStateProvider } from 'react-app-page-component-state';

...
    <AppStateProvider getInitState={() => new AppState()}>
      <HashRouter>
        <Routes>
          <Route ... />
        </Routes>
      </HashRouter>
    </AppStateProvider>
...
```

AppState.ts
```js
export class AppState {
    str = "" // 设置初始值 / init value set here
}
```

TestPage.tsx
```js
...
import { useAppState } from "react-app-page-component-state"

export function TestPage() {
    let [str, setStr] = useAppState<AppState>("str")
    ...
}
```


### usePageState
TestPage2.tsx
```js
...
import { usePageState, withPageStateProvider } from "react-app-page-component-state"

export default withPageStateProvider(TestPage2, () => new PageState())

function TestPage2() {
    let [count, setCount] = usePageState<PageState>("count")
    ...
}
```

PageState.ts
```js
export class PageState {
    count = 0
}
```


### useComponentState
TestComponent.tsx
```js
...
import { useComponentState, withComponentStateProvider } from "react-app-page-component-state"

export default withComponentStateProvider(TestComponent, () => new ComponentState())

function TestComponent() {
    let [count, setCount] = useComponentState<ComponentState>("count")
    ...
}
```

ComponentState.ts
```js
export class ComponentState {
    count = 0
}
```