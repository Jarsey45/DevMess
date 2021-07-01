import { Layout, Menu } from 'antd';
import {
  TeamOutlined,
  MessageOutlined,
  HomeOutlined,
  CoffeeOutlined
} from '@ant-design/icons'
import '../../styles/antd_stylesheet.less';
import logo from '../images/logoMetro.png'
import { useState } from 'react';
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

/** 
 * Metro View Component
 * @param props
 * @returns 
 * */
const MetroView = () => {
  const [collapsed, onCollapse] = useState(false);


  return (
    <Layout className='layout' >
      <Sider className='sider' collapsible collapsed={collapsed} onCollapse={() => onCollapse(!collapsed)}>
        <div className='logoDiv'>
          <img alt="logo" src={logo} className='logo' />
        </div>
        <Menu className='menu' defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item className='menuItem' key="1" icon={<HomeOutlined />} >
            Dashboard
          </Menu.Item>
          <Menu.Item className='menuItem' key="2" icon={<CoffeeOutlined />}>
            Chilling (DW)
          </Menu.Item>
          <SubMenu className='subMenu' key="sub1" icon={<MessageOutlined />} title="Messages">
            <Menu.Item className='menuItem' key="3">Tom</Menu.Item>
            <Menu.Item className='menuItem' key="4">Bill</Menu.Item>
            <Menu.Item className='menuItem' key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu className='subMenu' key="sub2" icon={<TeamOutlined />} title="Teams">
            <Menu.Item className='menuItem' key="6">Team 1</Menu.Item>
            <Menu.Item className='menuItem' key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item className='menuItem' key="9" icon={''}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="layout" >
        <Header className="header" style={{ padding: 0 }} />
        <Content className='content' >
          <div className="contentScreen" >
            PUT OPTION COMPONENT HERE
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MetroView;
