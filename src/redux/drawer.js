import { combineReducers } from 'redux';

const DRAWER_SET_VISIBILITY = 'DRAWER_SET_VISIBILITY';

// simple actions
const drawerSetVisibility = (open) => ({
  type: DRAWER_SET_VISIBILITY,
  open,
});

// complex actions
const openDrawer = () => (dispatch) => {
  dispatch(drawerSetVisibility(true));
};

const closeDrawer = () => (dispatch) => {
  dispatch(drawerSetVisibility(false));
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

export {
  openDrawer,
  closeDrawer,
}

export default combineReducers({
  open,
});
