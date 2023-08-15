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

export interface IStateController<T, K extends keyof T = keyof T> {
    useCommonState(key: K): [T[K], SetState<T[K]>]
    getState(key: K): T[K]
    setState(key: K, setStateAction: SetStateAction<T[K]>): void
    addStateChangeListener(key: K, onChange: (newValue: T[K]) => void): void
    removeStateChangeListener(key: K, onChange: (value: T[K]) => void): void
}