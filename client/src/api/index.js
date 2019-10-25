import ajax from './ajax'

const BASE = ''


/*
    登录接口
    username: 用户名
    password: 登录密码
*/
export const reqLogin = (username, password) => ajax(BASE + '/users/login', { username, password }, 'POST');

