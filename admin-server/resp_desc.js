const STATE_DB_ERROR = '数据库错误，操作失败';
const STATE_AUTH_ERROR = '状态未认证'
const STATE_PARAMS_ERROR = '请求参数错误';
const STATE_SUCCESS = '成功';
const STATE_ACCOUNT_EXIST_ERROR = '账号已存在';
const STATE_USER_NOEXIST = '账号不存在';


function respneseDateFormatter(code, data, msg) {
    let ret = { code };
    ret.msg = code == 1 ? STATE_SUCCESS : msg;
    ret.data = data;
    return ret;
}

module.exports = {
    respneseDateFormatter,
    STATE_DB_ERROR,
    STATE_AUTH_ERROR,
    STATE_PARAMS_ERROR,
    STATE_ACCOUNT_EXIST_ERROR,
    STATE_SUCCESS,
    STATE_USER_NOEXIST
}