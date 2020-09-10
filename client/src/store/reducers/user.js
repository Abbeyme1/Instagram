import * as actionTypes from "../actions/actionTypes"

const initialState = null

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER:
            return action.payload

        default:
            return state;
    }
}

export default reducer