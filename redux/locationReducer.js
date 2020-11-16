import {SET_LOCATION} from './locationActions'

const initialState = {
    location: null
}

const locationReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_LOCATION:
            return {location: action.location};
        default:
            return state;
    }
}

export default locationReducer;