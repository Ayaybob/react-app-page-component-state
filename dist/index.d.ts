import * as react from 'react';
import { Dispatch, SetStateAction, Context, ComponentType } from 'react';

type SetState<S> = Dispatch<SetStateAction<S>>;
type GetInitStateProps<T> = {
    getInitState?: () => T;
    children?: JSX.Element;
};
type StateProviderProps<T> = GetInitStateProps<T> & {
    getInitState?: () => T;
    StateContext: Context<StateContextType<T>>;
};
/** 任一由用户指定的Class */
type anyClassByUserSpecified = any;
type StateContextType<T> = {
    stateController: IStateController<T>;
};
interface IStateController<T> {
    useState<K extends keyof T>(key: K): [T[K], SetState<T[K]>];
    getState<K extends keyof T>(key: K): T[K];
    setState<K extends keyof T>(key: K, setStateAction: SetStateAction<T[K]>): void;
    addStateChangeListener<K extends keyof T>(key: K, onChange: (newValue: T[K]) => void): void;
    removeStateChangeListener<K extends keyof T>(key: K, onChange: (value: T[K]) => void): void;
}

declare function useAppState<T, K extends keyof T>(key: K, _nullAsT?: T): [T[K], SetState<T[K]>];
declare function getUseAppState<T>(): <K extends keyof T>(key: K) => [T[K], SetState<T[K]>];
declare function withAppStateProvider<T, P extends {} & unknown>(WrappedAppComponent: ComponentType<P>, getInitAppState?: () => T): (props: P) => JSX.Element;
declare function AppStateProvider<T>(props: GetInitStateProps<T>): react.JSX.Element;
declare function useAppStateController<T>(): IStateController<T>;
type AppStateControllerProps<T> = {
    appState: IStateController<T>;
};

declare function usePageState<T, K extends keyof T>(key: K, _nullAsT?: T): [T[K], SetState<T[K]>];
declare function getUsePageState<T>(): <K extends keyof T>(key: K) => [T[K], SetState<T[K]>];
declare function withPageStateProvider<T, P extends {} & unknown>(WrappedComponent: ComponentType<P>, getInitState?: () => T): (props: P) => JSX.Element;
declare function PageStateProvider<T>(props: GetInitStateProps<T>): react.JSX.Element;
declare function usePageStateController<T>(): IStateController<T>;
type PageStateControllerProps<T> = {
    pageState: IStateController<T>;
};

declare function useComponentState<T, K extends keyof T>(key: K, _nullAsT?: T): [T[K], SetState<T[K]>];
declare function getUseComponentState<T>(): <K extends keyof T>(key: K) => [T[K], SetState<T[K]>];
declare function withComponentStateProvider<T, P extends {} & unknown>(WrappedComponent: ComponentType<P>, getInitState?: () => T): (props: P) => JSX.Element;
declare function ComponentStateProvider<T>(props: GetInitStateProps<T>): react.JSX.Element;
declare function useComponentStateController<T>(): IStateController<T>;
type ComponentStateControllerProps<T> = {
    componentState: IStateController<T>;
};

export { AppStateControllerProps, AppStateProvider, ComponentStateControllerProps, ComponentStateProvider, GetInitStateProps, IStateController, PageStateControllerProps, PageStateProvider, SetState, StateContextType, StateProviderProps, anyClassByUserSpecified, getUseAppState, getUseComponentState, getUsePageState, useAppState, useAppStateController, useComponentState, useComponentStateController, usePageState, usePageStateController, withAppStateProvider, withComponentStateProvider, withPageStateProvider };
