import * as reactors from '../reactors';

import * as reduxImages from '../../images';

const { __testables__ } = reactors;

describe('reactors test suite', () => {
  describe('reactors: general test suite', () => {
    let dateNowMock;

    const refreshTime = 180000;

    beforeAll(() => {
      const now = Date.now();
      dateNowMock = jest.spyOn(Date, 'now').mockImplementation(() => now);
    });
  
    afterAll(() => {
      dateNowMock.mockRestore();
    });

    it('should return array of functions', () => {
      expect(reactors.default).toBeInstanceOf(Array);
    });

    it('check refresh timer', () => {
      expect(__testables__.refreshTime).toEqual(refreshTime);
    });

    it('should retrun app time from state', () => {
      const initialState = {
        appTime: Date.now(),
      };
      expect(__testables__.appTimeSelector(initialState))
        .toEqual(Date.now());
    });
  });

  describe('reactors: checkStaleImageData test suite', () => {
    let listImagesMock;

    const baseDate = 1554732528304;
    const shouldRefreshDate = 1554732348302;
    const shouldNotRefreshDate = 1554732408304;

    const getInitialState = (options = {}) => {
      const attr = {
        lastFetch: null,
        loading: null,
        loggedIn: null,
        ...options,
      }
      return {
        appTime: baseDate,
        images: {
          listImageRequest: {
            lastFetch: attr.lastFetch,
            loading: attr.loading,
          },
        },
        auth: {
          meta: {
            loggedIn: attr.loggedIn,
          },
        },
      };
    };

    beforeAll(() => {
      listImagesMock = jest.spyOn(reduxImages, 'listImages')
        .mockImplementation(() => () => ({}));
    });

    afterEach(() => {
      listImagesMock.mockClear();
    })

    afterAll(() => {
      listImagesMock.mockRestore();
    });

    it('should return null if not authenticated', () => {
      expect(__testables__
        .checkStaleImageData(getInitialState({
          loggedIn: false
        }))
      ).toBeNull();
      expect(listImagesMock).not.toHaveBeenCalled();
    });

    it('should return null if is loading', () => {
      expect(__testables__
        .checkStaleImageData(getInitialState({
          loading: true,
          loggedIn: true,
        }))
      ).toBeNull();
      expect(listImagesMock).not.toHaveBeenCalled();
    });

    it('should return null if listImages have not been run', () => {
      expect(__testables__
        .checkStaleImageData(getInitialState({
          lastFetch: undefined,
          loggedIn: true,
        }))
      ).toBeNull();
      expect(listImagesMock).not.toHaveBeenCalled();
    });

    it('should return null if lastFetch happened before specified time', () => {
      expect(__testables__
        .checkStaleImageData(getInitialState({
          lastFetch: shouldNotRefreshDate,
          loggedIn: true,
        }))
      ).toBeNull();
      expect(listImagesMock).not.toHaveBeenCalled();
    });

    it('should return executed listImages function', () => {
      expect(__testables__
        .checkStaleImageData(getInitialState({
          lastFetch: shouldRefreshDate,
          loggedIn: true,
        }))
      ).toBeInstanceOf(Function);
      expect(listImagesMock).toHaveBeenCalled();
    });
    
  });
});
