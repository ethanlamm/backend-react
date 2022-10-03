import { Layout, Menu, Popconfirm } from 'antd'
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined
} from '@ant-design/icons'
import './index.scss'

import { Outlet, Link, useLocation } from 'react-router-dom'

const { Header, Sider, Content } = Layout

const GeekLayout = () => {
    const location = useLocation()
    // 当前路径地址
    const selectedKey = location.pathname
    
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <div className="user-info">
                    <span className="user-name">user.name</span>
                    <span className="user-logout">
                        <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
                            <LogoutOutlined /> 退出
                        </Popconfirm>
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme="dark"
                        selectedKeys={[selectedKey]}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item icon={<HomeOutlined />} key="/">
                            <Link to="/">数据概览</Link>
                        </Menu.Item>
                        <Menu.Item icon={<DiffOutlined />} key="/article">
                            <Link to="/article">内容管理</Link>
                        </Menu.Item>
                        <Menu.Item icon={<EditOutlined />} key="/publish">
                            <Link to="/publish">发布文章</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Content>
                    {/* 二级路由出口 */}
                    <Outlet></Outlet>
                </Content>
            </Layout>
        </Layout>
    )
}

export default GeekLayout