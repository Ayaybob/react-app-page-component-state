import { ComponentType, createContext } from "react";
import { useStateByStateController, useStateController, withStateProvider, getAppStateProvider, withStateController } from "./stateController/StateController";
import { GetInitStateProps, IStateController, StateContextType, anyClassByUserSpecified } from "./stateController/StateController.type";

export function useComponentState<T, K extends keyof T>(key: K, _nullAsT?: T) {
    return useStateByStateController<T, K>(key, ComponentStateContext)
}
export function getUseComponentState<T>() { // 用于一个组件内多次的useComponentState调用场景, 减少_useState内 useContext调用的方法
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let componentStateController: IStateController<T> = useStateController<T>(ComponentStateContext)
    return <K extends keyof T>(key: K) => componentStateController.useState(key)
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

export type ComponentStateControllerProps<T> = {
    componentState: IStateController<T>
}

// export function withComponentStateControllerByCustomFieldName<P extends object, K extends keyof P>(
//     WrappedComponent: ComponentType<P>,
//     propFieldName: K,
// ): ComponentType<Omit<P, K>> {
//     return withStateController(WrappedComponent, ComponentStateContext, propFieldName)
// }

// export function withComponentStateController<P extends ComponentStateControllerProps<any>>(
//     WrappedComponent: ComponentType<P>,
// ): ComponentType<Omit<P, "componentState">> {
//     return withComponentStateControllerByCustomFieldName(WrappedComponent, "componentState")
// }

const ComponentStateContext = createContext<StateContextType<anyClassByUserSpecified>>({} as StateContextType<anyClassByUserSpecified>)