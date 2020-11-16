export const SET_LOCATION = 'SET_LOCATION'

export const setLocation = location => {
    return (dispatch) => {
        dispatch({
            type: SET_LOCATION,
            location: location
        })
    }
}