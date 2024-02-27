import React, {useContext} from 'react'
import {Context} from '../../context/context'

export const PositionBB = (props) => {

    const {state, dispatch} = useContext(Context)
    let defBtnDisable = true

    // наша позиция
    if (state.current.action > 1) defBtnDisable = false

    // стиль заголовка
    let classHeader = "main__header main__header_blinde"
    //if (parseInt(props.place) === state.current.place)
    if (parseInt(props.place) === state.current.box) classHeader += " main__header_active"

    // клик против
    const handlerDefinderClick = () => {
        dispatch({
            type: 'SET_DEFINDER',
            payload: parseInt(props.place)
        })
    }

    return (
        <div className="main__item">
            <h3 className={classHeader}>BB<sup className="main__count">8</sup></h3>
            <ul className="button">
                <button
                    className="button__item button__item_def"
                    disabled={defBtnDisable}
                    onClick={handlerDefinderClick}
                >DEF
                </button>
            </ul>
        </div>
    )
}
