import React, { Component } from 'react'
import { connect } from 'react-redux';
import BGParticle from '../../utils/BGParticle'
import { Form, Button, Input, Icon, Checkbox } from 'antd'
import './Login.css'
import 'animate.css'
import axios from 'axios'


class Login extends Component {

    submitLogin = (e) => {
        e.preventDefault();

        const { form, login, history } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                login(values).then((r) => {
                    if (r) {
                        //保存密码
                        if (values.remember) {
                            let remember = JSON.stringify({ u: values.username, p: values.password });
                            window.sessionStorage.remember = remember;
                        } else {
                            window.sessionStorage.remember = null;
                            delete window.sessionStorage.remember;
                        }

                        history.push('/index');
                    }
                });
            }
        });
    }

    componentDidMount() {
        if (window.sessionStorage.getItem('remember')) {

            let userInfo = window.sessionStorage.remember;
            let jsonInfo = JSON.parse(userInfo);

            this.props.form.setFieldsValue({
                'username': jsonInfo.u,
                'password': jsonInfo.p
            });
        }

        //鼠标吸附动画效果
        new BGParticle('animationbg').init()
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { login_error } = this.props;

        return (
            <div id='login-page'>
                <div id='animationbg' className='backgroundBox' />
                <div className='container animated bounceInLeft'>
                    <h3>欢迎你</h3>
                    <Form onSubmit={this.submitLogin} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入用户名' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="请输入用户名"
                                    maxLength={16}
                                    autoComplete='off'
                                    ref={input => { this.uInput = input }}
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="请输入密码"
                                    maxLength={16}
                                    autoComplete='off'
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>记住密码</Checkbox>)}
                            <a className="login-form-forgot" href="">找回密码</a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                            {login_error}
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login_error: state.getIn(['login', 'login_error']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => {
            return dispatch((dispatch, getState) => {
                let params = { userId: user.username, userPwd: user.password };
                return axios.post('/users/login', params).then((result) => {
                    let data = result.data;
                    dispatch({ type: 'LOGIN', payload: { ...data, isLogin: data.code === 1 } });
                    return data.code === 1;
                }).catch(console.err);
            })
        }
    }
}

//antd创建的组件
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default connect(mapStateToProps, mapDispatchToProps)((WrappedNormalLoginForm))

