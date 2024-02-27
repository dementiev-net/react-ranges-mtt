import React, {useContext, useEffect, useState} from 'react'
import {Context} from '../context/context'

export const Stack = () => {

    const stacks = ["50+ bb", "30-50 bb", "20-30 bb", "15-20 bb", "10bb"]
    const [value, setValue] = useState('')
    const {state, dispatch} = useContext(Context)

    useEffect(() => {
        setValue(state.current.stack - 1)
    }, [state.current.stack])

    // выбираем новый стек
    const handlerChange = (event) => {
        const id = event.target.value
        setValue(id)
        dispatch({
            type: 'SET_STACK',
            payload: parseInt(id) + 1
        })
    }

    return (<>
            <p className="select">Stack:</p>
            <select
                className="stack"
                value={value}
                onChange={handlerChange}
            >
                {stacks.map((item, i) => <option value={i} key={i}>{item}</option>)}
            </select>
        </>
    )
}
