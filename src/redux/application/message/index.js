import { combineReducers } from 'redux';

// static timer pointer
let hideTimer = null;

// action types
const APPLICATION_MESSAGE_SHOW = 'APPLICATION_MESSAGE_SHOW';
const APPLICATION_MESSAGE_HIDE = 'APPLICATION_MESSAGE_HIDE';

const APPLICATION_MESSAGE_ADD = 'APPLICATION_MESSAGE_ADD';

// simple actions
export const applicationMessageAdd = (message) => ({
  type: APPLICATION_MESSAGE_ADD,
  payload: message,
});

export const applicationMessageShow = () => ({
  type: APPLICATION_MESSAGE_SHOW,
});

export const applicationMessageHide = () => ({
  type: APPLICATION_MESSAGE_HIDE,
});

// complex action
export const addMessage = (message, hideTimeout = 10000) => (dispatch) => {
  dispatch(applicationMessageAdd(message));

  dispatch(applicationMessageShow());

  // clear timeout first
  clearTimeout(hideTimer);

  // start new timeout
  hideTimer = setTimeout(() => {
    dispatch(applicationMessageHide());
  }, hideTimeout);
};

export const showMessage = () => (dispatch) => {
  dispatch(applicationMessageShow()); 
}

export const hideMessage = () => (dispatch)  => {
  dispatch(applicationMessageHide());
};

// reducers
const text = (state = '', action) => {
  switch (action.type) {
    case APPLICATION_MESSAGE_ADD:
      return action.payload.text;
    default:
      return state;
  }
};

const title = (state = '', action) => {
  switch (action.type) {
    case APPLICATION_MESSAGE_ADD:
      return action.payload.title;
    default:
      return state;
  }
};

const showRefresh = (state = false, action) => {
  switch (action.type) {
    case APPLICATION_MESSAGE_ADD:
      return action.payload.showRefresh || false;
    default:
      return state;
  }
};

const show = (state = false, action) => {
  switch (action.type) {
    case APPLICATION_MESSAGE_SHOW:
      return true;
    case APPLICATION_MESSAGE_HIDE:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  text,
  title,
  show,
  showRefresh,
});
