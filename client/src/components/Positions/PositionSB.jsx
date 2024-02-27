import React, {useContext} from 'react'
import {Context} from '../../context/context'

export const PositionSB = (props) => {

    const {state, dispatch} = useContext(Context)
    let defBtnDisable = true
    let defBtnText = "VS"

    // стиль заголовка
    let classHeader = "main__header main__header_blinde"
    //if (parseInt(props.place) === state.current.place)
    if (parseInt(props.place) === state.current.box) classHeader += " main__header_active"

    // управление кнопками
    if (parseInt(props.place) > state.current.place_raise) defBtnDisable = false
    if (parseInt(props.place) === state.current.place_raise) defBtnText = "RAISE"
    if (parseInt(props.place) === state.current.place_raise && state.current.action === 3) defBtnText = "LIMP"

    // клик позиции
    const handlerPosClick = () => {
        dispatch({
            type: 'SET_POSITION',
            payload: parseInt(props.place)
        })
    }

    // клик рейза
    const handlerRaiseClick = () => {
        dispatch({
            type: 'SET_ACTION',
            payload: {action: 2, place: parseInt(props.place)}
        })
    }

    // клик лимпа
    const handlerLimpClick = () => {
        dispatch({
            type: 'SET_ACTION',
            payload: {action: 3, place: parseInt(props.place)}
        })
    }

    // клик против
    const handlerDefinderClick = () => {
        dispatch({
            type: 'SET_DEFINDER',
            payload: parseInt(props.place)
        })
    }

    return (
        <div className="main__item">
            <h3 className={classHeader}>SB<sup className="main__count">7</sup></h3>
            {state.current.action > 1 ?
                <ul className="button">
                    <button
                        className="button__item button__item_def"
                        disabled={defBtnDisable}
                        onClick={handlerDefinderClick}
                    >{defBtnText}
                    </button>
                </ul>
                :
                <ul className="button">
                    <button
                        className="button__item button__item_pos"
                        onClick={handlerPosClick}
                    >&#10003;
                    </button>
                    <button
                        className="button__item button__item_raise"
                        onClick={handlerRaiseClick}
                    >Raise
                    </button>
                    <button
                        className="button__item button__item_limp"
                        onClick={handlerLimpClick}
                    >Limp
                    </button>
                </ul>
            }
        </div>
    )
}
