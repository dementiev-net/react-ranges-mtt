export default function (state, action) {

    const payload = action.payload
    let newData
    let newColors

    switch (action.type) {
        case 'LOAD_DATA':
            newData = payload.data
            newColors = payload.colors
            return {
                ...state,
                data: newData,
                colors: newColors,
                status: payload.status,
                ready: true
            }
        case 'SET_STACK':
            return {
                ...state,
                current: {
                    ...state.current,
                    stack: payload
                }
            }
        case 'SET_POSITION':
            return {
                ...state,
                current: {
                    ...state.current,
                    place: payload
                }
            }
        case 'SET_ACTION':
            //let place = payload.place === 2 ? 4 : payload.place + 1
            let place = state.current.box
            return {
                ...state,
                current: {
                    ...state.current,
                    action: payload.action,
                    place: place,
                    place_raise: payload.place,
                }
            }
        case 'SET_DEFINDER':
            return {
                ...state,
                current: {
                    ...state.current,
                    place: payload
                }
            }
        case 'SET_RESET':
            return {
                ...state,
                current: {
                    ...state.current,
                    action: 1,
                    place: 1,
                    place_raise: 0,
                    box: state.current.box < 2 ? 8 : state.current.box - 1
                }
            }
        default:
            return state
    }
}
