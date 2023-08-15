import React, { ComponentType, createContext } from "react";
import { useStateByStateController, useStateController, withStateProvider, getAppStateProvider, StateProvider } from "./pageStateController/StateController";
import { GetInitStateProps, IStateController, StateContextType, anyClassByUserSpecified } from "./pageStateController/StateController.type";

export function useAppState<T>(key: keyof T) {
    return useStateByStateController<T>(key, AppStateContext)
}
export function getUseAppState<T>() { // 用于一个组件内多次的useAppState调用场景, 减少_useState内 useContext调用的方法
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let appStateController: IStateController<T> = useStateController<T>(AppStateContext)
    return (key: keyof T) => appStateController.useCommonState(key)
}

export function withAppStateProvider<T, P extends {} & unknown>(WrappedApp: ComponentType<P>, getInitAppState?: () => T) {
    return withStateProvider<T, P>(WrappedApp, AppStateContext, getInitAppState)
}

export function AppStateProvider<T>(props: GetInitStateProps<T>) {
    return getAppStateProvider<T>(AppStateContext)(props)
}

export function useAppStateController<T>(): IStateController<T> {
    return useStateController<T>(AppStateContext)
}

const AppStateContext = createContext<StateContextType<anyClassByUserSpecified>>({} as StateContextType<anyClassByUserSpecified>)