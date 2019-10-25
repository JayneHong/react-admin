import React, { Component } from 'react'
import { connect } from 'react-redux';
import BGParticle from '../../utils/BGParticle'
import { Form, Button, Input, Icon, Checkbox, message, Spin } from 'antd'
import './login.css'
import 'animate.css'
import axios from 'axios'
import { reqLogin } from '../../api'


class Login extends Component {

    submitLogin = (e) => {
        e.preventDefault();

        const { form, login, history } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                this.setState({ loading: true });
                login(values).then((r) => {
                    this.setState({ loading: false });
                    if (r) {
                        //保存密码
                        if (values.remember) {
                            let remember = JSON.stringify({ u: values.username, p: values.password });
                            window.sessionStorage.remember = remember;
                        } else {
                            window.sessionStorage.remember = null;
                            delete window.sessionStorage.remember;
                        }

                        message.success("登录成功");
                        history.push('/index');
                    } else {
                        message.error(this.props.login_error);
                    }
                }).catch(() => {
                    this.setState({ loading: false });
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

    state = { loading: false };

    render() {
        const { getFieldDecorator } = this.props.form;

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
                            <Spin spinning={this.state.loading} indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登录
                                </Button>
                            </Spin>
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
                const { username, password } = user;
                return reqLogin(username, password).then((result) => {
                    let data = result.data;
                    dispatch({ type: 'LOGIN', payload: { ...data, isLogin: data.code === 1 } });
                    return data.code === 1;
                })
            })
        }
    }
}

//antd创建的组件
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default connect(mapStateToProps, mapDispatchToProps)((WrappedNormalLoginForm))

