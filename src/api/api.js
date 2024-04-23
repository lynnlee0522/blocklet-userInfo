import { post } from './server';

export const getUserInfo = (params) => {
  return post('/api/user', params);
};

export const saveUserInfo = (params) => {
  return post('/api/saveUser', params);
};
