/* global sessionStorage */

export const setItem = (key, value) => sessionStorage.setItem(key, value);
export const getItem = key => sessionStorage.getItem(key);

export const getToken = () => sessionStorage.getItem('token');
export const setToken = value => sessionStorage.setItem('token', value);

export const getUserId = () => sessionStorage.getItem('userId');
export const setUserId = value => sessionStorage.setItem('userId', value);
