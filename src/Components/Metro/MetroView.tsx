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
import { auth } from '../../api/Firebase';
import { MetroViewProps } from '../../types/interfaces';
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

/** 
 * Metro View Component
 * @param props
 * @returns 
 * */
const MetroView: React.FC<MetroViewProps> = ({ teams, friends }) => {
  let itemKeys = 0;
  const [collapsed, onCollapse] = useState(false);
  console.log(teams, friends)

  return (
    <Layout className='layout' >
      <Sider className='sider' collapsible collapsed={collapsed} onCollapse={() => onCollapse(!collapsed)}>
        <div className='logoDiv'>
          <img alt="logo" src={logo} className='logo' />
        </div>
        <Menu className='menu' defaultSelectedKeys={['0']} mode="inline">
          <Menu.Item className='menuItem' key={(itemKeys++).toString()} icon={<HomeOutlined />}  >
            Dashboard
          </Menu.Item>
          <Menu.Item className='menuItem' key={itemKeys++} icon={<CoffeeOutlined />}>
            Chilling (DW)
          </Menu.Item>
          <SubMenu className='subMenu' key="sub1" icon={<MessageOutlined />} title="Messages">
            {friends.map(friend => <Menu.Item className='menuItem' key={itemKeys++}>{friend.name}</Menu.Item>)}
          </SubMenu>
          <SubMenu className='subMenu' key="sub2" icon={<TeamOutlined />} title="Teams">
            {teams.map(team => <Menu.Item className='menuItem' key={itemKeys++}>{team.name}</Menu.Item>)}
          </SubMenu>
          <Menu.Item className='menuItem' key={itemKeys++} icon={''}>
            Files
          </Menu.Item>

          {/* TEMPORARY LOGOUT */}
          <Menu.Item className='menuItem' key={itemKeys++} icon={''} onClick={() => auth.signOut()}>
            Log Out
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
