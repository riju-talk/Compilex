import { Layout, Menu, Avatar, Space } from 'antd';
import { UserOutlined, HomeOutlined, EditOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Link } from '@remix-run/react';

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider theme="dark"
      className="text-white flex flex-col justify-evenly h-full"
      width={250}
      breakpoint="lg"
      collapsedWidth="0"
      style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
    >
      {/* Menu Section */}
      <div className="flex flex-col justify-evenly h-5/6">
        <div>
        <Menu
          theme="dark"
          mode="inline"
          className="flex-grow"
          defaultSelectedKeys={['dashboard']}
        >
          <Menu.Item key="dashboard" icon={<HomeOutlined />} className="text-base">
            <Link to={"/dashboard"}>Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="editor" icon={<EditOutlined />} className="text-base">
            <Link to={"/ide"}>Editor</Link>
          </Menu.Item>
          <Menu.Item key="profile" icon={<UserOutlined />} className="text-base">
            <Link to={"/profile"}>Profile</Link>
          </Menu.Item>
          <Menu.Item key="about" icon={<InfoCircleOutlined />} className="text-base">
            <Link to={"/about"}>About</Link>
          </Menu.Item>
        </Menu>
        </div>

        {/* User Section */}
        <div className="flex items-center p-4 border-y border-gray-800 grow-0">
          <Avatar size={40} icon={<UserOutlined />} className="bg-blue-500" />
          <div className="ml-3 text-white">
            <p className="text-lg font-medium">John Doe</p>
            <p className="text-sm text-gray-400">@johndoe</p>
          </div>
        </div>
      </div>
    </Sider>

  );
};

export default Sidebar;
