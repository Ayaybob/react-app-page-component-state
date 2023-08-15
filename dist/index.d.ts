import * as react from 'react';
import react__default, { Dispatch, SetStateAction, ComponentType } from 'react';

type SetState<S> = Dispatch<SetStateAction<S>>;
type GetInitStateProps<T> = {
    getInitState?: () => T;
    children?: JSX.Element;
};
interface IStateController<T, K extends keyof T = keyof T> {
    useCommonState(key: K): [T[K], SetState<T[K]>];
    getState(key: K): T[K];
    setState(key: K, setStateAction: SetStateAction<T[K]>): void;
    addStateChangeListener(key: K, onChange: (newValue: T[K]) => void): void;
    removeStateChangeListener(key: K, onChange: (value: T[K]) => void): void;
}

declare function useAppState<T>(key: keyof T): [T[keyof T], SetState<T[keyof T]>];
declare function getUseAppState<T>(): (key: keyof T) => [T[keyof T], SetState<T[keyof T]>];
declare function withAppStateProvider<T, P extends {} & unknown>(WrappedApp: ComponentType<P>, getInitAppState?: () => T): (props: P) => JSX.Element;
declare function AppStateProvider<T>(props: GetInitStateProps<T>): react__default.JSX.Element;
declare function useAppStateController<T>(): IStateController<T>;

declare function usePageState<T>(key: keyof T): [T[keyof T], SetState<T[keyof T]>];
declare function getUsePageState<T>(): (key: keyof T) => [T[keyof T], SetState<T[keyof T]>];
declare function withPageStateProvider<T, P extends {} & unknown>(WrappedComponent: ComponentType<P>, getInitState?: () => T): (props: P) => JSX.Element;
declare function PageStateProvider<T>(props: GetInitStateProps<T>): react.JSX.Element;
declare function usePageStateController<T>(): IStateController<T>;

declare function useComponentState<T>(key: keyof T): [T[keyof T], SetState<T[keyof T]>];
declare function getUseComponentState<T>(): (key: keyof T) => [T[keyof T], SetState<T[keyof T]>];
declare function withComponentStateProvider<T, P extends {} & unknown>(WrappedComponent: ComponentType<P>, getInitState?: () => T): (props: P) => JSX.Element;
declare function ComponentStateProvider<T>(props: GetInitStateProps<T>): react.JSX.Element;
declare function useComponentStateController<T>(): IStateController<T>;

export { AppStateProvider, ComponentStateProvider, PageStateProvider, getUseAppState, getUseComponentState, getUsePageState, useAppState, useAppStateController, useComponentState, useComponentStateController, usePageState, usePageStateController, withAppStateProvider, withComponentStateProvider, withPageStateProvider };
