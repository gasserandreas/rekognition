// helper
export const ID = ':id';

// base paths
export const HOME = '/';
export const INDEX = '/index';
export const IMAGES = '/images';
export const USER = '/user';
export const LOGIN = '/login';
export const REGISTER = '/register';
export const PRIVACY = '/privacy';

// generated paths
export const GET_IMAGES_DETAILS = (id) => `${IMAGES}/${id}`;
export const GET_USER_PATHS = (path) => `${USER}/${path}`;
