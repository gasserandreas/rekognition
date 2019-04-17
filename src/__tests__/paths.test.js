import * as paths from '../paths';

describe('paths test suite', () => {
  it('should export paths as string constants starting with a dash', () => {
    const { GET_IMAGES_DETAIL, ID, ...constants } = paths;

    Object.keys(constants).forEach((key) => {
      const value = constants[key];
      expect(typeof value).toEqual('string');
      expect(value.indexOf('/')).toEqual(0);
    });
  });

  it('should export custom ID path starting with colon', () => {
    const { ID } = paths;
    expect(typeof ID).toEqual('string');
    expect(ID).toEqual(':id');
  });

  it('should return GET_IMAGES_DETAIL path', () => {
    const { GET_IMAGES_DETAIL, IMAGES } = paths;
    const id = 'my-custom-id';
    expect(GET_IMAGES_DETAIL(id)).toEqual(`${IMAGES}/${id}`);
  });
});