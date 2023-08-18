import React, { ComponentType, useState, useEffect, useContext, SetStateAction, Context } from "react";
import { GetInitStateProps, IStateController, SetState, StateContextType, StateProviderProps } from "./StateController.type";
import { AppStateControllerProps } from "../appState";


export default class StateController<T> implements IStateController<T> {
    pageState: T
    setStateArrMap: { [K in keyof T]: SetState<{}>[] | undefined } = {} as any
    stateChangeListenerArrMap: { [K in keyof T]: ((value: T[K]) => void)[] } = {} as any
    constructor(getInitPageState?: () => T) {
        this.pageState = (getInitPageState && getInitPageState()) || ({} as T)
    }

    useState<K extends keyof T>(key: K): [T[K], SetState<T[K]>] {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        let [, setStateFromUseState] = useState<{}>()
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            this._addSetStateToArr(key, setStateFromUseState)
            return () => {
                this._removeSetStateFromArr(key, setStateFromUseState)
            }
            // key不需要传入, 就用初始的key即可
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
        let newSetState = (setStateAction: SetStateAction<T[K]>) => {
            this.setState(key, setStateAction)
        }
        return [this.pageState[key], newSetState]
    }

    getState<K extends keyof T>(key: K) {
        return this.pageState[key]
    }

    setState<K extends keyof T>(key: K, setStateAction: SetStateAction<T[K]>) {
        if (typeof setStateAction == 'function') { // 如果传入的是方法, 则用中间方法承接prevState, 完成setState调用, 并进行自持字段的赋值
            let setStateCallback = setStateAction as ((prevState: T[K]) => T[K])
            let prevState = this.pageState[key]
            let newState = setStateCallback(prevState)
            this._onStateChange(key, newState)
        } else { // 如果传入的就是新的state值, 则直接进行自持字段的赋值
            let newState = setStateAction as T[K]
            this._onStateChange(key, newState)
        }
    }

    addStateChangeListener<K extends keyof T>(key: K, onChange: (newValue: T[K]) => void) {
        let arr = this.stateChangeListenerArrMap[key]
        if (arr === undefined) {
            arr = []
            this.stateChangeListenerArrMap[key] = arr
        }
        arr.push(onChange)
    }

    removeStateChangeListener<K extends keyof T>(key: K, onChange: (value: T[K]) => void) {
        let arr = this.stateChangeListenerArrMap[key]
        if (arr) {
            for (let i = 0; i < arr.length;) {
                let item = arr[i];
                if (item === onChange) {
                    arr.splice(i, 1)
                } else { // 继续遍历防止该监听方法被多次添加却只删除了一个
                    i++
                }
            }
        }
    }

    private _addSetStateToArr<K extends keyof T>(key: K, setState: SetState<{}>) {
        let arr = this.setStateArrMap[key]
        if (arr === undefined) {
            arr = []
            this.setStateArrMap[key] = arr
        }
        arr.push(setState)
    }

    private _removeSetStateFromArr<K extends keyof T>(key: K, setState: SetState<{}>) {
        let arr = this.setStateArrMap[key]
        if (arr) {
            for (let i = 0; i < arr.length;) {
                let item = arr[i];
                if (item === setState) {
                    arr.splice(i, 1)
                } else { // 继续遍历防止setState方法被多次添加却只删除了一个
                    i++
                }
            }
        }
    }

    private _onStateChange<K extends keyof T>(key: K, newState: T[K]) {
        this.pageState[key] = newState
        // 触发所有调用useState的组件内的界面更新
        let setStateArr = this.setStateArrMap[key]
        setStateArr && setStateArr.forEach(setState => setState({}))
        // 触发所有对当前key设置stateChange事件监听的回调
        let stateChangeListenerArr = this.stateChangeListenerArrMap[key]
        stateChangeListenerArr && stateChangeListenerArr.forEach(stateChangeListener => stateChangeListener(newState))
    }
}

export function useStateController<T>(StateContext: Context<StateContextType<T>>): IStateController<T> {
    let { stateController } = useContext<StateContextType<T>>(StateContext)
    if (!stateController) {
        throw new Error("usePageState() Error: Page Component not use withPageStateProvider")
    }
    return stateController
}

export function useStateByStateController<T, K extends keyof T>(key: K, StateContext: Context<StateContextType<T>>): [T[K], SetState<T[K]>] {
    return useStateController<T>(StateContext).useState(key)
}



export function getAppStateProvider<T>(StateContext: Context<StateContextType<T>>) {
    return (props: GetInitStateProps<T>) => {
        return (
            <StateProvider getInitState={props.getInitState} StateContext={StateContext}>
                {props.children}
            </StateProvider>
        )
    }
}

/**
 * 给组件加上PageStateProvider的高阶组件
 */
export function withStateProvider<T, P extends {} & unknown>(WrappedComponent: ComponentType<P>, StateContext: Context<StateContextType<T>>,
    getInitState?: () => T): (props: P) => JSX.Element {

    return function (props: P) {
        return (
            <StateProvider getInitState={getInitState} StateContext={StateContext}>
                <WrappedComponent {...props} />
            </StateProvider>
        )
    }
}

export function StateProvider<T>(props: StateProviderProps<T>) {
    let [contextValue] = useState<StateContextType<T>>(() => ({ stateController: new StateController(props.getInitState) }))
    return (
        <props.StateContext.Provider value={contextValue}>
            {props.children}
        </props.StateContext.Provider>
    )
}

/**
 * 给组件加上PageStateProvider的高阶组件
 */
export function withStateController<P extends object, K extends keyof P>(
    WrappedComponent: ComponentType<P>,
    StateContext: Context<StateContextType<any>>,
    propFieldName: K
): ComponentType<Omit<P, K>> {
    function fun(props: Omit<P, K>) {
        let { stateController } = useContext<StateContextType<any>>(StateContext)
        let kProps = { [propFieldName]: stateController } as Pick<P, K>
        let newProps = { ...kProps, ...props } as P
        return (
            <WrappedComponent {...newProps} />
        )
    }
    return fun
}