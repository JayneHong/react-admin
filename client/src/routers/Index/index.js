import React, { Component } from 'react'
import { Layout } from 'antd';

const { Header, Footer, Sider, Content , Menu, Icon} = Layout;

export default class Index extends Component {
    render() {
        return (
            <div id='page'>
                <Layout>
                    <Sider collapsible
                        trigger={null}
                    //  collapsed={this.state.collapsed}
                    >
                        {/* <SiderNav/> */}

                        <div className="logo" />
  
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: '0 16px' }}>
                            {/* <HeaderBar collapsed={this.state.collapsed} onToggle={this.toggle}/> */}
                        </Header>
                        <Content>
                            {/* <ContentMain/> */}
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>React-Admin ©2019 Created by 344567218@qq.com <a target='_blank' href='#'>github地址</a></Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}