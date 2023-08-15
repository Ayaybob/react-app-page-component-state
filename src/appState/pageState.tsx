import { ComponentType, createContext } from "react";
import { useStateByStateController, useStateController, withStateProvider, getAppStateProvider } from "./pageStateController/StateController";
import { GetInitStateProps, IStateController, StateContextType, anyClassByUserSpecified } from "./pageStateController/StateController.type";

export function usePageState<T>(key: keyof T) {
    return useStateByStateController<T>(key, PageStateContext)
}
export function getUsePageState<T>() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let pageStateController: IStateController<T> = useStateController<T>(PageStateContext)
    return (key: keyof T) => pageStateController.useCommonState(key)
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

const PageStateContext = createContext<StateContextType<anyClassByUserSpecified>>({} as StateContextType<anyClassByUserSpecified>)