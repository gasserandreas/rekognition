import { __testables__ } from '../Container';
import { listImages } from '../../../redux/images';

const { select, mapDispatchToProps, mapKeyToValue } = __testables__;

describe('images list container test suite', () => {
  const expectedInitialState = {
    images: [],
    addImageRequest: undefined,
  };

  const initialProps = {
    match: {
      params: {
        id: null,
      },
    },
    location: {
      search: '',
    },
  };

  it('should return container state', () => {
    const state = select({}, initialProps);
    expect(state).toEqual(expectedInitialState);

    expect(Object.keys(state)).toEqual(['images', 'addImageRequest']);
  });

  it('should return redux actions', () => {
    expect(mapDispatchToProps).toEqual({
      listImages,
    });
  });
});
