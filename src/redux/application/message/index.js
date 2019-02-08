import { combineReducers } from 'redux';

// static timer pointer
let hideTimer = null;

// action types
const APPLICATION_MESSAGE_SHOW = 'APPLICATION_MESSAGE_SHOW';
const APPLICATION_MESSAGE_HIDE = 'APPLICATION_MESSAGE_HIDE';

// simple actions
export const applicationMessageShow = (message) => ({
  type: APPLICATION_MESSAGE_SHOW,
  payload: message,
});

export const applicationMessageHide = () => ({
  type: APPLICATION_MESSAGE_HIDE,
});

// complex action
export const showMessage = (message, hideTimeout = 10000) => (dispatch) => {
  dispatch(applicationMessageShow(message,))

  // clear timeout first
  clearTimeout(hideTimer);

  // start new timeout
  hideTimer = setTimeout(() => {
    dispatch(applicationMessageHide());
  }, hideTimeout);
};

export const hideMessage = () => ({
  type: APPLICATION_MESSAGE_HIDE,
});

// reducers
const text = (state = 'Hello', action) => {
  switch (action.type) {
    case APPLICATION_MESSAGE_SHOW:
      return action.payload;
    default:
      return state;
  }
}

const show = (state = true, action) => {
  switch (action.type) {
    case APPLICATION_MESSAGE_SHOW:
      return true;
    case APPLICATION_MESSAGE_HIDE:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  text,
  show,
});
