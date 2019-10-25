import React, { Component } from 'react'
import SiderNav from '../../components/SiderNav/sider-nav'
import ContentMain from '../../components/ContentMain'
import './index.less'

import { Layout, Icon } from 'antd';

const { Header, Sider, Content, Footer } = Layout;

export default class Index extends Component {

    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            <Layout style={{ height: "100%" }}>
                <Sider collapsible trigger={null} collapsed={this.state.collapsed} >
                    <SiderNav />
                </Sider>
                <Layout>

                    <Header style={{ background: '#fff', padding: '0 10px' }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>

                    <Content>
                        <ContentMain />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>React-Admin ©2019 Created by 344567218@qq.com <a target='_blank' href='#'>github地址</a></Footer>
                </Layout>
            </Layout>
        )
    }
}