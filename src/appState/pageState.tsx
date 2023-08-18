import { ComponentType, createContext } from "react";
import { useStateByStateController, useStateController, withStateProvider, getAppStateProvider, withStateController } from "./stateController/StateController";
import { GetInitStateProps, IStateController, StateContextType, anyClassByUserSpecified } from "./stateController/StateController.type";

export function usePageState<T, K extends keyof T>(key: K, _nullAsT?: T) {
    return useStateByStateController<T, K>(key, PageStateContext)
}
export function getUsePageState<T>() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let pageStateController: IStateController<T> = useStateController<T>(PageStateContext)
    return <K extends keyof T>(key: K) => pageStateController.useState(key)
}

export function withPageStateProvider<T, P extends {} & unknown>(WrappedComponent: ComponentType<P>, getInitState?: () => T) {
    return withStateProvider<T, P>(WrappedComponent, PageStateContext, getInitState)
}

export function PageStateProvider<T>(props: GetInitStateProps<T>) {
    return getAppStateProvider<T>(PageStateContext)(props)
}

export function usePageStateController<T>(): IStateController<T> {
    return useStateController<T>(PageStateContext)
}

export type PageStateControllerProps<T> = {
    pageState: IStateController<T>
}

// export function withPageStateControllerByCustomFieldName<P extends object, K extends keyof P>(
//     WrappedComponent: ComponentType<P>,
//     propFieldName: K,
// ): ComponentType<Omit<P, K>> {
//     return withStateController(WrappedComponent, PageStateContext, propFieldName)
// }

// export function withPageStateController<P extends PageStateControllerProps<T>>(
//     WrappedComponent: ComponentType<P>,
// ): ComponentType<Omit<P, "pageState">> {
//     return withPageStateControllerByCustomFieldName(WrappedComponent, "pageState")
// }

const PageStateContext = createContext<StateContextType<anyClassByUserSpecified>>({} as StateContextType<anyClassByUserSpecified>)