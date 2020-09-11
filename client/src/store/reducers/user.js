import * as actionTypes from "../actions/actionTypes";

const initialState = null;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER:
      return action.payload;
    case actionTypes.CLEAR:
      return null;

    default:
      return state;
  }
};

export default reducer;
