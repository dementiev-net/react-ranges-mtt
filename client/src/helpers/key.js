export const getDataKey = (state) => {
    return `a${state.action}p${state.place}pr${state.place_raise}s${state.stack}`
}
