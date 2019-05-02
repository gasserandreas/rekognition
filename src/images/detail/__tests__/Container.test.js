import { __testables__ } from '../Container';
import { getImage } from '../../../redux/images';

const { select, mapDispatchToProps, mapKeyToValue } = __testables__;

describe('auth register container test suite', () => {
  const expectedInitialState = {
    image: undefined,
    labels: [],
    faces: [],
    selectedFace: null,
    selectedLabel: null,
    getImageRequest: undefined,
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

    expect(Object.keys(state)).toEqual([
      'image',
      'labels',
      'faces',
      'selectedFace',
      'selectedLabel',
      'getImageRequest',
    ]);
  });

  it('should return redux actions', () => {
    expect(mapDispatchToProps).toEqual({
      getImage,
    });
  });

  it('mapKeyToValue should return params', () => {
    const string = '?attr1=val1';
    expect(mapKeyToValue(string)).toEqual({
      attr1: 'val1',
    });
  });

  it('should select face based on face url attr', () => {
    const id = 'ae1f94b0-a090-4e09-aa70-2fdc23e74bcc';
    const face = {
      id,
      name: 'test face',
    };
    const url = `?face=${id}`;
    const expectedState = {
      ...expectedInitialState,
      selectedFace: face,
    };

    // check for valid face
    expect(select({
      // set faces state
      faces: {
        byId: {
          [id]: face,
        },
      },
    }, {
      ...initialProps,
      location: {
        search: url,
      },
    })).toEqual(expectedState);

    // check for invalid face
    expect(select({
      // set faces state
      faces: {
        byId: {
          'invalid-id': face,
        },
      },
    }, {
      ...initialProps,
      location: {
        search: url,
      },
    })).toEqual(expectedInitialState);
  });

  it('should select label based on label url attr', () => {
    const id = 'ae1f94b0-a090-4e09-aa70-2fdc23e74baa';
    const label = {
      id,
      name: 'test label',
    };
    const url = `?label=${id}`;
    const expectedState = {
      ...expectedInitialState,
      selectedLabel: label,
    };

    // check for valid face
    expect(select({
      // set faces state
      labels: {
        byId: {
          [id]: label,
        },
      },
    }, {
      ...initialProps,
      location: {
        search: url,
      },
    })).toEqual(expectedState);

    // check for invalid label
    expect(select({
      // set label state
      labels: {
        byId: {
          'invalid-id': label,
        },
      },
    }, {
      ...initialProps,
      location: {
        search: url,
      },
    })).toEqual(expectedInitialState);
  });
});
