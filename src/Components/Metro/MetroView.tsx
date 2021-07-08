import { Layout, Menu } from 'antd'
import '../../styles/antd_stylesheet.less';
import logo from '../images/logoMetro.png'
import { useState } from 'react';
import { auth } from '../../api/Firebase';
import { MetroViewProps } from '../../types/interfaces';
import { MessageOutlined, TeamOutlined } from '@ant-design/icons/lib/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

/** 
 * Metro View Component
 * @param props
 * @returns 
 * */
const MetroView: React.FC<MetroViewProps> = ({ teams, friends, makeMenuItem, optionComponent }) => {
  let itemKeys = 0; //Made just for react keys purposes
  const [collapsed, onCollapse] = useState(false);
  console.log(teams, friends)

  return (
    <Layout className='layout' >
      <Sider className='sider' collapsible collapsed={collapsed} onCollapse={() => onCollapse(!collapsed)}>
        <div className='logoDiv'>
          <img alt="logo" src={logo} className='logo' />
        </div>
        <Menu className='menu' defaultSelectedKeys={['0']} mode="inline">
          {makeMenuItem({
            type: "dashboard",
            key: itemKeys++
          }) as JSX.Element}

          {makeMenuItem({
            type: "coffee",
            key: itemKeys++
          }) as JSX.Element}

          <SubMenu className='subMenu' key="sub1" icon={<MessageOutlined />} title="Messages" >
            {friends.map(friend => makeMenuItem({
              type: "friend",
              key: itemKeys++,
              data: {
                _id: friend.uid,
                _name: friend.name
              }
            }))}
          </SubMenu>
          <SubMenu className='subMenu' key="sub2" icon={<TeamOutlined />} title="Teams">
            {teams.map(team => makeMenuItem({
              type: "team",
              key: itemKeys++,
              data: {
                _id: team.tid,
                _name: team.name
              }
            }))}
          </SubMenu>
          {makeMenuItem({
            type: "settings",
            key: itemKeys++
          }) as JSX.Element}

          {/* TEMPORARY LOGOUT */}
          <Menu.Item
            className='menuItem'
            key={itemKeys++}
            icon={''}
            onClick={() => auth.signOut()}>
            Log Out
          </Menu.Item>

        </Menu>
      </Sider>
      {optionComponent}
    </Layout >
  )
}

export default MetroView;
