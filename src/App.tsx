import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import UserManagement from './components/UserManagement';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import { initialUsers } from './constants';

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  const [users, setUsers] = useState(initialUsers);

  const menuItems: MenuProps['items'] = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: '仪表盘',
    },
    {
      key: 'users',
      icon: <UserOutlined />,
      label: '用户管理',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
  ];

  const renderContent = () => {
    switch (selectedMenu) {
      case 'dashboard':
        return <Dashboard users={users} />;
      case 'users':
        return <UserManagement users={users} setUsers={setUsers} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard users={users} />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu
          theme="dark"
          selectedKeys={[selectedMenu]}
          mode="inline"
          items={menuItems}
          onClick={({ key }) => setSelectedMenu(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#fff' }} />
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
