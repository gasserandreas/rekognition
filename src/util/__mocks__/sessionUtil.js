// mocked functions
export const setItem = () => true;
export const getItem = () => null;

export const getToken = () => getItem('token');
export const setToken = value => setItem('token', value);

export const getUserId = () => getItem('userId');
export const setUserId = value => setItem('userId', value);
