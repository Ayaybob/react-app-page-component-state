import { ComponentType, createContext } from "react";
import { useStateByStateController, useStateController, withStateProvider, getAppStateProvider } from "./pageStateController/StateController";
import { GetInitStateProps, IStateController, StateContextType, anyClassByUserSpecified } from "./pageStateController/StateController.type";

export function useComponentState<T>(key: keyof T) {
    return useStateByStateController<T>(key, ComponentStateContext)
}
export function getUseComponentState<T>() { // 用于一个组件内多次的useComponentState调用场景, 减少_useState内 useContext调用的方法
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let componentStateController: IStateController<T> = useStateController<T>(ComponentStateContext)
    return (key: keyof T) => componentStateController.useCommonState(key)
}

export function withComponentStateProvider<T, P extends {} & unknown>(WrappedComponent: ComponentType<P>, getInitState?: () => T) {
    return withStateProvider<T, P>(WrappedComponent, ComponentStateContext, getInitState)
}

export function ComponentStateProvider<T>(props: GetInitStateProps<T>) {
    return getAppStateProvider<T>(ComponentStateContext)(props)
}

export function useComponentStateController<T>(): IStateController<T> {
    return useStateController<T>(ComponentStateContext)
}

const ComponentStateContext = createContext<StateContextType<anyClassByUserSpecified>>({} as StateContextType<anyClassByUserSpecified>)