import React, {useCallback, useEffect, useReducer} from 'react'
import {Context} from './context/context'
import reducer from './context/reducer'
import {DevInfo} from './components/DevInfo.jsx'
import {Loader} from './components/Loader.jsx'
import {Error} from './components/Error.jsx'
import {useHttp} from './hooks/http.hook'
import {useKeyPress} from './hooks/keys.hook'
import {Range} from './components/Range.jsx'
import {Stack} from './components/Stack.jsx'
import {Header} from './components/Header.jsx'
import {Legend} from './components/Legend.jsx'
import {Random} from './components/Random.jsx'
import {Info} from './components/Info.jsx'
import {Position} from './components/Positions/Position.jsx'
import {PositionSB} from './components/Positions/PositionSB.jsx'
import {PositionBB} from './components/Positions/PositionBB.jsx'
import {PositionAllin} from './components/Positions/PositionAllin.jsx'
import {PositionAllinBB} from './components/Positions/PositionAllinBB.jsx'
import APP_INFO from './config.json'

function App() {
    const {get, loading, error} = useHttp()
    const [state, dispatch] = useReducer(reducer, {
        current: {
            action: 1,
            place: 8,
            place_raise: 0,
            stack: 1,
            box: 8
        },
        data: [],
        colors: {},
        status: {},
        ready: false
    })

    // загрузка данных
    const loadData = useCallback(async () => {
        try {
            const response = await get(`https://ranges.2dapp.ru/mtt.json`)
            dispatch({
                type: 'LOAD_DATA',
                payload: {
                    data: response.data,
                    colors: response.colors,
                    status: response.status
                }
            })
        } catch (e) {
            console.error(e)
            return false
        }
    }, [get])

    // первая загрузка приложения
    useEffect(() => {
        loadData()
    }, [loadData])

    // нажата горячая клавиша
    const onKeyPress = (event) => {
        // '/' === event.key && console.log('key: /')
        // '*' === event.key && console.log('key: *')
        // 'Backspace' === event.key && console.log('key: Backspace')
        // 'Clear' === event.key && console.log('key: Clear')
        // '0' === event.key && dispatch({type: "SET_RESET"})
        // let stackP = state.current.stack === 5 ? 1 : state.current.stack + 1
        // let stackM = state.current.stack === 1 ? 5 : state.current.stack - 1
        // '+' === event.key && dispatch({type: 'SET_STACK', payload: stackM})
        // '-' === event.key && dispatch({type: 'SET_STACK', payload: stackP})
        // '1' === event.key && dispatch({type: "SET_POSITION", payload: 1})
        // '2' === event.key && dispatch({type: "SET_POSITION", payload: 2})
        // '3' === event.key && dispatch({type: "SET_POSITION", payload: 2})
        // '4' === event.key && dispatch({type: "SET_POSITION", payload: 4})
        // '5' === event.key && dispatch({type: "SET_POSITION", payload: 5})
        // '6' === event.key && dispatch({type: "SET_POSITION", payload: 6})
        // '7' === event.key && dispatch({type: "SET_POSITION", payload: 7})
        // if (state.current.stack < 5) {
        //     '8' === event.key && dispatch({type: "SET_POSITION", payload: 8})
        //     if (state.current.place < 8) {
        //         'Enter' === event.key && dispatch({
        //             // TODO: check
        //             //type: "SET_ACTION",
        //             //payload: {action: 2, place: state.current.place}
        //         })
        //         // TODO: check
        //         '.' === event.key && dispatch({type: "SET_ACTION", payload: {action: 3, place: 7}})
        //     }
        // }
    }
    useKeyPress(
        [
            '/', '*', 'Backspace', 'Clear',
            '.', 'Enter', '+', '-',
            '0', '1', '2', '3', '4', '5', '6', '7', '8'
        ], onKeyPress
    )

    const getBox = (pos) => {
        let BOXES
        // TODO: переписать на цикл (с учетом значения pos)
        switch (state.current.box) {
            case 8:
                // UTG, MP1, MP2, HJ, CO, BU, SB, BB
                BOXES = [2, 3, 4, 5, 6, 7, 8, 1]
                break
            case 7:
                BOXES = [3, 4, 5, 6, 7, 8, 1, 2]
                break
            case 6:
                BOXES = [4, 5, 6, 7, 8, 1, 2, 3]
                break
            case 5:
                BOXES = [5, 6, 7, 8, 1, 2, 3, 4]
                break
            case 4:
                BOXES = [6, 7, 8, 1, 2, 3, 4, 5]
                break
            case 3:
                BOXES = [7, 8, 1, 2, 3, 4, 5, 6]
                break
            case 2:
                BOXES = [8, 1, 2, 3, 4, 5, 6, 7]
                break
            case 1:
                BOXES = [1, 2, 3, 4, 5, 6, 7, 8]
                break
        }
        return `board__boxes box${BOXES[pos - 1]}`
    }

    const handlerResetClick = () => {
        dispatch({
            type: 'SET_RESET'
        })
        dispatch({
            type: 'SET_POSITION',
            payload: parseInt(state.current.box - 1)
        })
    }

    if (error) return <Error message={error}/>
    if (loading || !state.ready) return <Loader/>

    return (
        <Context.Provider value={{state, dispatch, APP_INFO}}>
            <Header/>
            <div className="main-top">
                <div className="main-top__chart">
                    <Range/>
                </div>
                <div className="main-top__info">
                    <Random/>
                    <Stack/>
                    <Legend/>
                    <Info/>
                </div>
            </div>
            <div className="main">
                {state.current.stack === 5 ?
                    <div className="board">
                        <div className="board__line"></div>
                        <div className={getBox(8)}>
                            <PositionAllinBB place="8"/>
                        </div>
                        <div className={getBox(1)}>
                            <PositionAllin name="UTG" place="1"/>
                        </div>
                        <div className={getBox(2)}>
                            <PositionAllin name="MP1" place="2"/>
                        </div>
                        <div className={getBox(3)}>
                            <PositionAllin name="MP2" place="3"/>
                        </div>
                        <div className={getBox(4)}>
                            <PositionAllin name="HJ" place="4"/>
                        </div>
                        <div className={getBox(5)}>
                            <PositionAllin name="CO" place="5"/>
                        </div>
                        <div className={getBox(6)}>
                            <PositionAllin name="BU" place="6"/>
                        </div>
                        <div className={getBox(7)}>
                            <PositionAllin name="SB" place="7"/>
                        </div>
                        <div className="board__boxes reset">
                            <button
                                className="button__item button__item_reset"
                                onClick={handlerResetClick}
                            >NEXT DEAL ...
                            </button>
                        </div>
                    </div>
                    :
                    <div className="board">
                        <div className="board__line"></div>
                        <div className={getBox(8)}>
                            <PositionBB place="8"/>
                        </div>
                        <div className={getBox(1)}>
                            <Position name="UTG" place="1"/>
                        </div>
                        <div className={getBox(2)}>
                            <Position name="MP1" place="2"/>
                        </div>
                        <div className={getBox(3)}>
                            <Position name="MP2" place="3"/>
                        </div>
                        <div className={getBox(4)}>
                            <Position name="HJ" place="4"/>
                        </div>
                        <div className={getBox(5)}>
                            <Position name="CO" place="5"/>
                        </div>
                        <div className={getBox(6)}>
                            <Position name="BU" place="6"/>
                        </div>
                        <div className={getBox(7)}>
                            <PositionSB place="7"/>
                        </div>
                        <div className="board__boxes reset">
                            <button
                                className="button__item button__item_reset"
                                onClick={handlerResetClick}
                            >NEXT DEAL ...
                            </button>
                        </div>
                    </div>
                }
            </div>
            <div className="footer">
                <div className='footer__release'>
                    <code>Release: {APP_INFO.VERSION}</code>
                </div>
            </div>
            {APP_INFO.DEBUG && <DevInfo/>}
        </Context.Provider>
    )
}

export default App