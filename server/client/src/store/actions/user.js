import * as actionTypes from "./actionTypes";

export const user = (data) => {
  return {
    type: actionTypes.USER,
    payload: data,
  };
};

export const clear = () => {
  return {
    type: actionTypes.CLEAR,
  };
};

export const update = (data) => {
  return {
    type: actionTypes.UPDATE,
    payload: data,
  };
};

export const updateDetails = (data) => {
  return {
    type: actionTypes.UPDATE_DETAILS,
    payload: data,
  };
};

export const uploadPic = (data) => {
  return {
    type: actionTypes.UPLOAD_PIC,
    payload: data,
  };
};
