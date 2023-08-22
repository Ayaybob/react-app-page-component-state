import { ComponentType, createContext } from "react";
import { useStateByStateController, useStateController, withStateProvider, getAppStateProvider, withStateController } from "./stateController/StateController";
import { GetInitStateProps, IStateController, StateContextType, anyClassByUserSpecified } from "./stateController/StateController.type";

export function useAppState<T, K extends keyof T>(key: K, _nullAsT?: T) {
    return useStateByStateController<T, K>(key, AppStateContext)
}

export function getUseAppState<T>() { // 用于一个组件内多次的useAppState调用场景, 减少_useState内 useContext调用的方法
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let appStateController: IStateController<T> = useStateController<T>(AppStateContext)
    return <K extends keyof T>(key: K) => appStateController.useState(key)
}

export function withAppStateProvider<T, P extends {} & unknown>(WrappedAppComponent: ComponentType<P>, getInitAppState?: () => T) {
    return withStateProvider<T, P>(WrappedAppComponent, AppStateContext, getInitAppState)
}

export function AppStateProvider<T>(props: GetInitStateProps<T>) {
    return getAppStateProvider<T>(AppStateContext)(props)
}

export function useAppStateController<T>(): IStateController<T> {
    return useStateController<T>(AppStateContext)
}

export type AppStateControllerProps<T> = {
    appStateCtrlr: IStateController<T>
}

export function withAppStateControllerByCustomFieldName<P extends object, K extends keyof P>(
    WrappedComponent: ComponentType<P>,
    propFieldName: K,
): ComponentType<Omit<P, K>> {
    return withStateController(WrappedComponent, AppStateContext, propFieldName)
}

export function withAppStateController<P extends AppStateControllerProps<any>>(
    WrappedComponent: ComponentType<P>,
): ComponentType<Omit<P, "appStateCtrlr">> {
    return withAppStateControllerByCustomFieldName(WrappedComponent, "appStateCtrlr")
}

const AppStateContext = createContext<StateContextType<anyClassByUserSpecified>>({} as StateContextType<anyClassByUserSpecified>)