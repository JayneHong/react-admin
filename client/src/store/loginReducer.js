import { fromJS } from 'immutable'

const InitialState = fromJS({
    //是否登录
    isLogin: false,
    //用户数组
    users: [],
    //登录错误信息
    login_error: '',
    //当前用户,
    loginUser: {
        user_id: '',
        user_name: ''
    }
})


const reducer = (state = InitialState, action) => {
    switch (action.type) {
        case "LOGIN":
            const { code, data, msg, isLogin } = action.payload;
            if (code === 1) {
                return state.set('isLogin', isLogin).set('login_error', '').update('loginUser', (loginUser) => {
                    return loginUser.set('user_id', data.user.userName).set('user_name', data.user.userName);
                })

            } else {
                return state.set('login_error', msg)
            }

        case "ACTION_TYPE_2":
            return state
        default:
            return state
    }
}


export default reducer