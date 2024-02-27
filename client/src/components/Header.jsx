import React, {useContext} from 'react'
import {Context} from '../context/context'
import {getDataKey} from "../helpers/key"

export const Header = () => {

    const {state} = useContext(Context)
    let position
    let action
    const key = getDataKey(state.current)

    try {
        position = state.data[key].POSITION
    } catch (err) {
        position = "NO DATA"
    }
    try {
        action = state.data[key].INFO
    } catch (err) {
        action = ""
    }

    return (
        <div className="header">
            <h1 className="header__position">
                {position}
            </h1>
            <h2 className="header__action">
                {action}
            </h2>
        </div>
    )
}
