import React, {useContext} from 'react'
import {Context} from '../context/context'
import {getDataKey} from '../helpers/key'

export const DevInfo = () => {

    const {state} = useContext(Context)
    const def = `def: ${state.current.place} vs ${state.current.place_raise}`
    let colors = []
    const stacks = ["50+ bb", "30-50 bb", "20-30 bb", "15-20 bb", "10bb"]

    for (const key in state.colors) colors.push(key)
    colors.sort()

    return (
        <div className="dev">
            <div className="dev__info">
                <div>
                    key: <b>{getDataKey(state.current)}</b>&nbsp;
                    (action: {state.current.action},
                    place: {state.current.place},
                    place_raise: {state.current.place_raise},
                    box: {state.current.box},
                    stack: {state.current.stack}: <b>{stacks[state.current.stack - 1]}</b>
                    {state.current.action > 1 ? `, ${def}` : ""})
                </div>
            </div>
            <details open="">
                <summary style={{cursor: "pointer", fontWeight: "600"}}>COLORS</summary>
                <p>
                    <a href="https://wasm-postflop.pages.dev/" target="_blank">EDITOR</a>
                </p>
                <div className="dev__colors">
                    {colors.map((item, i) => {
                        let cc = parseInt(item.match(/\d+/))
                        if (item.includes('gradient')) cc += 100
                        return <div key={i}>
                            <span className="dev__colors_caption"><b>[{cc}]</b> {item}</span>
                            <div className="dev__colors_color" style={state.colors[item]}>text</div>
                        </div>
                    })}
                </div>
            </details>
            <br/>
        </div>
    )
}
