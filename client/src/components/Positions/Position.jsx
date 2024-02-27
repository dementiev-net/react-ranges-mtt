import React, {useContext} from 'react'
import {Context} from '../../context/context'

export const Position = (props) => {

    const {state, dispatch} = useContext(Context)
    let defBtnDisable = true
    let defBtnText = "VS"

    // стиль заголовка
    let classHeader = "main__header"
    let classCounter = "main__count"
    //if (parseInt(props.place) === state.current.place)
    if (parseInt(props.place) === state.current.box) classHeader += " main__header_active"
    if (parseInt(props.place) === 6) classCounter += " main__count_active"

    // управление кнопками
    if (parseInt(props.place) > state.current.place_raise) defBtnDisable = false
    if (parseInt(props.place) < state.current.place_raise) defBtnText = "-"
    if (parseInt(props.place) === state.current.place_raise) defBtnText = "RAISE"

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

    // клик против
    const handlerDefinderClick = () => {
        dispatch({
            type: 'SET_DEFINDER',
            payload: parseInt(props.place)
        })
    }

    return (
        <div className="main__item">
            <h3
                className={classHeader}>{props.name}
                <sup className={classCounter}>{props.place}</sup>
            </h3>
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
                </ul>
            }
        </div>
    )
}
