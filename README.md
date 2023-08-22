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

#### 问题反馈 / Problem feedback
[通过Gitee Issues提出](https://gitee.com/ayaybob/react-app-page-component-state/issues)  
[Proposed through github issues](https://github.com/Ayaybob/react-app-page-component-state/issues)

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



### 非Hook环境下获取、设置或监听状态 / get, set or listener state for outside the hook
通过获取StateController来实现, 这里以appState来举例  
To achieve this by obtaining the StateController, let's take the example of "appState".

###### 1. 获取到 StateController / get StateController
hook环境下获取到 appStateController / get appStateController inside the hook
```js
...
import { useAppStateController } from "react-app-page-component-state"

export default function () {
    let appStateCtrl = useAppStateController<AppState>()
    ...
}
```

class环境下获取到 appStateController / get appStateController inside the class
```js
...
import { AppStateControllerProps, withAppStateController } from "react-app-page-component-state"

type Props = {

} & AppStateControllerProps<AppState>

class ClassComponentTestPage extends Component<Props> {
    appStateCtrlr = this.props.appStateCtrlr
    ...
}

export default withAppStateController(ClassComponentTestPage)
```

###### 2. StateController的用法 / useage of StateController
```js
...
import { AppStateControllerProps, withAppStateController } from "react-app-page-component-state"

type Props = {

} & AppStateControllerProps<AppState>

class ClassComponentTestPage extends Component<Props> {
    appStateCtrlr = this.props.appStateCtrlr
    state = {
        str: "",
    }

    render() {
        let state = this.state
        let appStateCtrlr = this.appStateCtrlr
        return <div>
            <p>str: {state.str}</p>
            <input value={state.str} onChange={e => appStateCtrlr.setState("str", e.target.value)} /> {/* set */}
        </div>
    }

    componentDidMount() {
        let appStateCtrlr = this.appStateCtrlr
        //
        this.setState({ str: appStateCtrlr.getState("str") }) // get
        //
        appStateCtrlr.addStateChangeListener("str", this.onChangeForStr) // listener
    }

    componentWillUnmount() {
        let appStateCtrlr = this.appStateCtrlr
        appStateCtrlr.removeStateChangeListener("str", this.onChangeForStr) // stop listener
    }

    onChangeForStr = (newValue: string) => this.setState({ str: newValue })
}

export default withAppStateController(ClassComponentTestPage)
```