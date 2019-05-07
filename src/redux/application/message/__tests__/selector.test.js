/* global testUtils */
import * as selectors from '../selectors';

const initialState = {
  application: {
    message: {
      text: '',
      title: '',
      show: false,
      showRefresh: false,
    },
  },
};

describe('application message selector test suite', () => {
  it('should return message state value', () => {
    expect(selectors.messageStateSelector(initialState)).toEqual(initialState.application.message);
  });

  it('should return message show value', () => {
    expect(selectors.messageShowSelector(initialState)).toEqual(initialState.application.message.show);
  });

  it('should return message text value', () => {
    expect(selectors.messageTextSelector(initialState)).toEqual(initialState.application.message.text);
  });

  it('should return message title value', () => {
    expect(selectors.messageTitleSelector(initialState)).toEqual(initialState.application.message.title);
  });

  it('should return message showRefresh value', () => {
    expect(selectors.messageShowRefreshSelector(initialState)).toEqual(initialState.application.message.showRefresh);
  });
});
