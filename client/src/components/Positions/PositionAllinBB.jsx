import React, {useContext} from 'react'
import {Context} from '../../context/context'

export const PositionAllinBB = (props) => {

    const {state, dispatch} = useContext(Context)
    let defBtnDisable = true

    // стиль заголовка
    let classHeader = "main__header"
    //if (parseInt(props.place) === state.current.place)
    if (parseInt(props.place) === state.current.box) classHeader += " main__header_active"

    return (
        <div className="main__item">
            <h3
                className={classHeader}>BB
                <sup className="main__count">8</sup>
            </h3>
            <ul className="button">
                <button
                    disabled={defBtnDisable}
                    className="button__item button__item_def"
                >-<br/>-
                </button>
            </ul>
        </div>
    )
}
