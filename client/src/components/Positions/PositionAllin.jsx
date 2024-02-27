import React, {useContext} from 'react'
import {Context} from '../../context/context'

export const PositionAllin = (props) => {

    const {state, dispatch} = useContext(Context)

    // стиль заголовка
    let classHeader = "main__header"
    let classCounter = "main__count"
    //if (parseInt(props.place) === state.current.place)
    if (parseInt(props.place) === state.current.box) classHeader += " main__header_active"
    if (parseInt(props.place) === 6) classCounter += " main__count_active"

    // клик Push/Fold
    const handlerPushFoldClick = () => {
        dispatch({
            type: 'SET_POSITION',
            payload: parseInt(props.place)
        })
    }

    return (
        <div className="main__item">
            <h3
                className={classHeader}>{props.name}
                <sup className={classCounter}>{props.place}</sup>
            </h3>
            <ul className="button">
                <button
                    className="button__item button__item_def"
                    onClick={handlerPushFoldClick}
                >Push<br/>Fold
                </button>
            </ul>
        </div>
    )
}
