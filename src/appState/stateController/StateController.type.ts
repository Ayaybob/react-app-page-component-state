import { Dispatch, SetStateAction, Context } from "react";

export type SetState<S> = Dispatch<SetStateAction<S>>

export type GetInitStateProps<T> = {
    getInitState?: () => T
    children?: JSX.Element
}

export type StateProviderProps<T> = GetInitStateProps<T> & {
    getInitState?: () => T
    StateContext: Context<StateContextType<T>>
}

/** 任一由用户指定的Class */
export type anyClassByUserSpecified = any

export type StateContextType<T> = {
    stateController: IStateController<T>
}

export interface IStateController<T> {
    useState<K extends keyof T>(key: K): [T[K], SetState<T[K]>]
    getState<K extends keyof T>(key: K): T[K]
    setState<K extends keyof T>(key: K, setStateAction: SetStateAction<T[K]>): void
    addStateChangeListener<K extends keyof T>(key: K, onChange: (newValue: T[K]) => void): void
    removeStateChangeListener<K extends keyof T>(key: K, onChange: (value: T[K]) => void): void
}