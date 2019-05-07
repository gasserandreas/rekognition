/* global it testUtils */
import reducer, * as reduxApplicationMessage from '../index';
import * as reduxApplication from '../../index';

const { __testables__ } = reduxApplicationMessage;

describe('application message simple action test suite', () => {
  it('should handle applicationMessageAdd', () => {
    const message = 'hello';
    expect(reduxApplicationMessage.applicationMessageAdd(message)).toEqual({
      type: __testables__.APPLICATION_MESSAGE_ADD,
      payload: message,
    });
  });

  it('should handle applicationMessageShow', () => {
    expect(reduxApplicationMessage.applicationMessageShow()).toEqual({
      type: __testables__.APPLICATION_MESSAGE_SHOW,
    });
  });

  it('should handle applicationMessageHide', () => {
    expect(reduxApplicationMessage.applicationMessageHide()).toEqual({
      type: __testables__.APPLICATION_MESSAGE_HIDE,
    });
  });
});

describe('application message complex action test suite', () => {
  const mockstore = testUtils.createMockStore();

  let spyOnClearTimeout;
  let spyOnSetTimeout;

  beforeEach(() => {
    spyOnClearTimeout = jest.spyOn(window, 'clearTimeout');
    spyOnSetTimeout = jest.spyOn(window, 'setTimeout');
  });

  afterEach(() => {
    spyOnClearTimeout.mockClear();
    spyOnSetTimeout.mockClear();
  });

  afterAll(() => {
    spyOnClearTimeout.mockRestore();
    spyOnSetTimeout.mockRestore();
  });

  it('should handle addMessage', (done) => {
    const message = {
      text: 'text',
      title: 'title',
      showRefresh: true,
    };

    const store = mockstore();
    const { dispatch } = store;

    const expectedActions = [
      reduxApplicationMessage.applicationMessageAdd(message),
      reduxApplicationMessage.applicationMessageShow(),
    ];

    // fire action with 1 second timeout
    dispatch(reduxApplicationMessage.addMessage(message, 1000));

    expect(store.getActions()).toEqual(expectedActions);

    setTimeout(() => {
      expect(store.getActions()).toEqual([...expectedActions, reduxApplicationMessage.applicationMessageHide()]);

      // check timeout functions
      expect(spyOnClearTimeout).toHaveBeenCalledTimes(1);
      done();
    }, 1500);
  });

  it('should handle showMessage', () => {
    const store = mockstore();
    const { dispatch } = store;

    const expectedActions = [reduxApplicationMessage.applicationMessageShow()];

    reduxApplicationMessage.showMessage()(dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should handle hideMessage', () => {
    const store = mockstore();
    const { dispatch } = store;

    const expectedActions = [reduxApplicationMessage.applicationMessageHide()];

    reduxApplicationMessage.hideMessage()(dispatch);
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('application reducer test suite', () => {
  const initialState = {
    text: '',
    title: '',
    show: false,
    showRefresh: false,
  };

  it('should create application redux state', () => {
    expect(reducer(undefined, reduxApplication.appIdle())).toEqual(initialState);
  });

  it('should handle APPLICATION_MESSAGE_ADD', () => {
    const store = reducer(undefined, reduxApplication.appIdle());
    expect(store).toEqual(initialState);

    const text = 'text';
    const title = 'title';
    const showRefresh = true;
    const message = { text, title, showRefresh };

    expect(reducer(store, reduxApplicationMessage.applicationMessageAdd(message))).toEqual({
      ...store,
      text,
      title,
      showRefresh,
      show: false,
    });
  });

  it('should handle APPLICATION_MESSAGE_ADD with showRefresh as default value', () => {
    const store = reducer(undefined, reduxApplication.appIdle());
    expect(store).toEqual(initialState);

    const text = 'text';
    const title = 'title';
    const message = { text, title };

    expect(reducer(store, reduxApplicationMessage.applicationMessageAdd(message))).toEqual({
      ...store,
      text,
      title,
      showRefresh: false,
      show: false,
    });
  });

  it('should handle APPLICATION_MESSAGE_SHOW', () => {
    expect(reducer(undefined, reduxApplicationMessage.applicationMessageShow())).toEqual({
      ...initialState,
      show: true,
    });
  });

  it('should handle APPLICATION_MESSAGE_HIDE', () => {
    expect(
      reducer(
        {
          ...initialState,
          show: true,
        },
        reduxApplicationMessage.applicationMessageHide(),
      ),
    ).toEqual({
      ...initialState,
      show: false,
    });
  });
});
