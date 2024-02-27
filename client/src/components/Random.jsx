import React, {useState, useEffect, useContext} from 'react'
import {Context} from '../context/context'

export const Random = () => {

    const {APP_INFO} = useContext(Context)
    const [number, setNumber] = useState(0)
    const className = {
        width: `${number}%`,
        height: '100%',
        backgroundColor: '#3089cc',
        borderRight: '4px solid white'
    }

    useEffect(() => {
        const interval = setInterval(
            () => {
                let num = Math.round(Math.floor(Math.random() * 100 + 1) / 10) * 10
                setNumber(num)
            },
            APP_INFO.INTERVAL
        )
        return () => {
            clearInterval(interval)
        }
    }, [])

    return <div className="random">
        <div className="random__number">{String(number).padStart(3, '0')}</div>
        <div className="random__line">
            <div style={className}></div>
        </div>
    </div>
}
