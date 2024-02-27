import React, {useContext} from 'react'
import {Context} from '../context/context'
import {getDataKey} from '../helpers/key'

export const Legend = () => {

    const {state} = useContext(Context)
    const key = getDataKey(state.current)
    let obj = state.data[key]

    return (
        obj === undefined ?
            <div className="legend">
                <div className="legend__item">No data</div>
            </div>
            :
            <div className="legend">
                {obj.HANDS.map((value, idx) => {
                    return value.legend ? <div
                        key={idx}
                        className="legend__item"
                        style={state.colors[value.color_ref]}
                    >{value.legend}</div> : ''
                })}
            </div>
    )
}
