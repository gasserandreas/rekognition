
export const setItem = (key, value) => sessionStorage.setItem(key, value);
export const getItem = (key) => sessionStorage.getItem(key);

export const getUserId = () => sessionStorage.getItem('userId');
export const setUserId = (value) => sessionStorage.setItem('userId', value);
