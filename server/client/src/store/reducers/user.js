import * as actionTypes from "../actions/actionTypes";

const initialState = null;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER:
      return action.payload;
    case actionTypes.CLEAR:
      return null;

    case actionTypes.UPDATE:
      return {
        ...state,
        followers: action.payload.followers,
        following: action.payload.following,
      };

    case actionTypes.UPLOAD_PIC:
      return {
        ...state,
        profilePic: action.payload.profilePic,
      };

    case actionTypes.UPDATE_DETAILS: {
      return {
        ...state,
        name: action.payload.name,
        bio: action.payload.bio,
      };
    }

    default:
      return state;
  }
};

export default reducer;
