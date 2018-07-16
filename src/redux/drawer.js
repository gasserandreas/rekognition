import { combineReducers } from 'redux';

const DRAWER_SET_VISIBILITY = 'DRAWER_SET_VISIBILITY';
const DRAWER_SET_CONTENT = 'DRAWER_SET_CONTENT';

// simple actions
const drawerSetVisibility = (open) => ({
  type: DRAWER_SET_VISIBILITY,
  open,
});

const drawerSetContent = content => ({
  type: DRAWER_SET_CONTENT,
  content,
});

// complex actions
const openDrawer = (content = undefined) => (dispatch) => {
  if (content) {
    dispatch(drawerSetContent(content));
  }

  dispatch(drawerSetVisibility(true));
};

const closeDrawer = () => (dispatch) => {
  dispatch(drawerSetVisibility(false));
};

const setDrawerContent = (content) => (dispatch) => {
  dispatch(drawerSetContent(content));
};

// reducers
const open = (state = false, action) => {
  switch(action.type) {
    case DRAWER_SET_VISIBILITY:
      return action.open;
    default:
      return state;
  }
};

const content = (state = null, action) => {
  switch (action.type) {
    case DRAWER_SET_CONTENT:
      return action.content;
    default:
      return state;
  }
};

export {
  openDrawer,
  closeDrawer,
  setDrawerContent,
}

export default combineReducers({
  open,
  content,
});
