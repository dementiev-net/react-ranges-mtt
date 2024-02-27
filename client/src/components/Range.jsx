import React, {useContext} from 'react'
import {Context} from '../context/context'
import prange from 'prange'
import {vanillaRange, convertToHands, updateRange} from '../helpers/range'
import {getDataKey} from '../helpers/key'

export const Range = () => {

    const {state, dispatch} = useContext(Context)
    let new_range, colors
    const range = vanillaRange()
    const key = getDataKey(state.current)

    try {
        colors = state.colors
        state.data[key].HANDS.forEach(item => {
            const hands = prange(item.chart)
            const list = convertToHands(hands, item.color)
            new_range = updateRange(range, list)
        })
    } catch (err) {
        colors = {}
        new_range = range
    }

    return (<table className="range">
        <tbody>
        {new_range.map((row, key) => {
            return <tr
                key={key}
            >
                {row.map(hand => {
                    const style = colors[hand.color]
                    return <td
                        key={hand.hand}
                        className={hand.position[0] === hand.position[1] ? "pocket" : ""}
                        style={style}
                    >
                        {hand.hand}
                    </td>
                })}
            </tr>
        })}
        </tbody>
    </table>)
}
