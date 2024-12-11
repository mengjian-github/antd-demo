import { useState } from 'react';
import {
  Layout,
  Menu,
  Button,
  Table,
  Card,
  Form,
  Input,
  message,
  Space,
  Modal,
  Popconfirm,
  Tag,
  Select,
  DatePicker,
  Row,
  Col,
  Statistic,
  Progress,
  List,
  Avatar,
  Dropdown
} from 'antd';
import {
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  TeamOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  DownloadOutlined,
  MoreOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Header, Sider, Content } = Layout;
const { RangePicker } = DatePicker;

interface User {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
  createTime: string;
  email?: string;
  phone?: string;
  status: 'active' | 'inactive';
}

interface SearchFormValues {
  searchText?: string;
  tags?: string[];
  dateRange?: [string, string];
  status?: string;
}

interface FormValues {
  username: string;
  age?: number;
  address?: string;
  tags?: string[];
  email?: string;
  phone?: string;
  status?: 'active' | 'inactive';
}

// 模拟数据
const initialData: User[] = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '北京市朝阳区',
    tags: ['开发者'],
    createTime: '2024-01-01',
    email: 'zhangsan@example.com',
    phone: '13800138000',
    status: 'active',
  },
  {
    key: '2',
    name: '李四',
    age: 42,
    address: '上海市浦东新区',
    tags: ['管理员'],
    createTime: '2024-01-02',
    email: 'lisi@example.com',
    phone: '13900139000',
    status: 'active',
  },
  {
    key: '3',
    name: '王五',
    age: 28,
    address: '广州市天河区',
    tags: ['开发者', '实习生'],
    createTime: '2024-01-03',
    email: 'wangwu@example.com',
    phone: '13700137000',
    status: 'inactive',
  },
];

// 系统设置选项
const settingsOptions = [
  {
    title: '基本设置',
    items: [
      { label: '站点名称', value: '后台管理系统' },
      { label: '系统语言', value: '简体中文' },
      { label: '时区设置', value: 'UTC+8' },
    ]
  },
  {
    title: '安全设置',
    items: [
      { label: '密码强度', value: '强' },
      { label: '登录验证', value: '开启' },
      { label: '登录失败次数限制', value: '5次' },
    ]
  },
  {
    title: '通知设置',
    items: [
      { label: '邮件通知', value: '开启' },
      { label: '系统消息', value: '开启' },
      { label: '短信通知', value: '关闭' },
    ]
  }
];

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [users, setUsers] = useState<User[]>(initialData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [selectedMenu, setSelectedMenu] = useState('1');
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  // 处理搜索
  const handleSearch = (values: SearchFormValues) => {
    let filteredUsers = [...initialData];
    
    if (values.searchText) {
      filteredUsers = filteredUsers.filter(user => 
        user.name.includes(values.searchText!) ||
        user.address.includes(values.searchText!) ||
        user.email?.includes(values.searchText!) ||
        user.phone?.includes(values.searchText!)
      );
    }

    if (values.tags && values.tags.length > 0) {
      filteredUsers = filteredUsers.filter(user => 
        user.tags.some(tag => values.tags!.includes(tag))
      );
    }

    if (values.dateRange) {
      const [start, end] = values.dateRange;
      filteredUsers = filteredUsers.filter(user => 
        user.createTime >= start && user.createTime <= end
      );
    }

    if (values.status) {
      filteredUsers = filteredUsers.filter(user => 
        user.status === values.status
      );
    }

    setUsers(filteredUsers);
    messageApi.success('搜索完成');
  };

  // 处理添加/编辑用户
  const handleSubmit = (values: FormValues) => {
    if (editingKey) {
      // 编辑现有用户
      setUsers(prev => prev.map(user => 
        user.key === editingKey ? {
          ...user,
          name: values.username,
          age: values.age || 0,
          address: values.address || '',
          tags: values.tags || [],
          email: values.email,
          phone: values.phone,
          status: values.status || 'active'
        } : user
      ));
      messageApi.success('修改成功！');
    } else {
      // 添加新用户
      const newUser: User = {
        key: Date.now().toString(),
        name: values.username,
        age: values.age || 0,
        address: values.address || '',
        tags: values.tags || [],
        email: values.email,
        phone: values.phone,
        status: values.status || 'active',
        createTime: new Date().toISOString().split('T')[0]
      };
      setUsers(prev => [...prev, newUser]);
      messageApi.success('添加成功！');
    }
    setIsModalVisible(false);
    form.resetFields();
    setEditingKey(null);
  };

  // 处理删除用户
  const handleDelete = (key: string) => {
    setUsers(prev => prev.filter(user => user.key !== key));
    messageApi.success('删除成功！');
  };

  // 处理编辑用户
  const handleEdit = (record: User) => {
    form.setFieldsValue({
      username: record.name,
      age: record.age,
      address: record.address,
      tags: record.tags,
      email: record.email,
      phone: record.phone,
      status: record.status
    });
    setEditingKey(record.key);
    setIsModalVisible(true);
  };

  // 获取活跃用户数量
  const getActiveUsers = () => users.filter(u => u.status === 'active').length;

  // 获取本月新增用户
  const getNewUsersThisMonth = () => {
    const now = new Date();
    return users.filter(u => {
      const createDate = new Date(u.createTime);
      return createDate.getMonth() === now.getMonth();
    }).length;
  };

  // 处理批量删除
  const handleBatchDelete = () => {
    Modal.confirm({
      title: '批量删除',
      content: `确定要删除选中的 ${selectedRowKeys.length} 条记录吗？`,
      onOk() {
        setUsers(prev => prev.filter(user => !selectedRowKeys.includes(user.key)));
        setSelectedRowKeys([]);
        messageApi.success('批量删除成功！');
      },
    });
  };

  // 处理数据导出
  const handleExport = () => {
    const exportData = users.map(user => ({
      姓名: user.name,
      年龄: user.age,
      邮箱: user.email || '',
      电话: user.phone || '',
      地址: user.address,
      标签: user.tags.join(', '),
      状态: user.status === 'active' ? '活跃' : '未活跃',
      创建时间: user.createTime
    }));

    const csvContent = [
      Object.keys(exportData[0]).join(','),
      ...exportData.map(row => Object.values(row).join(','))
    ].join('\\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = '用户数据.csv';
    link.click();
    messageApi.success('导出成功！');
  };

  // 批量操作菜单
  const batchOperationMenu: MenuProps['items'] = [
    {
      key: 'delete',
      label: '批量删除',
      icon: <DeleteOutlined />,
      danger: true,
      disabled: selectedRowKeys.length === 0,
      onClick: handleBatchDelete,
    },
    {
      key: 'export',
      label: '导出数据',
      icon: <DownloadOutlined />,
      onClick: handleExport,
    },
  ];

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          {text}
        </Space>
      ),
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      sorter: (a: User, b: User) => a.age - b.age,
    },
    {
      title: '联系方式',
      key: 'contact',
      render: (_: unknown, record: User) => (
        <Space direction="vertical" size="small">
          <Space>
            <MailOutlined />
            {record.email}
          </Space>
          <Space>
            <PhoneOutlined />
            {record.phone}
          </Space>
        </Space>
      ),
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      render: (address: string) => (
        <Space>
          <EnvironmentOutlined />
          {address}
        </Space>
      ),
    },
    {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: string[]) => (
        <>
          {tags.map(tag => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? '活跃' : '未活跃'}
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      sorter: (a: User, b: User) => 
        new Date(a.createTime).getTime() - new Date(b.createTime).getTime(),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: unknown, record: User) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这条记录吗？"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button type="text" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {contextHolder}
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu
          theme="dark"
          selectedKeys={[selectedMenu]}
          mode="inline"
          onClick={({ key }) => setSelectedMenu(key)}
          items={[
            {
              key: '1',
              icon: <DashboardOutlined />,
              label: '仪表盘',
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: '用户管理',
            },
            {
              key: '3',
              icon: <SettingOutlined />,
              label: '系统设置',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#fff' }}>
          <Space style={{ float: 'right', marginRight: 24 }}>
            <Button type="text" icon={<LogoutOutlined />}>
              退出登录
            </Button>
          </Space>
        </Header>
        <Content style={{ margin: '16px' }}>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            {selectedMenu === '1' && (
              <>
                <Row gutter={16}>
                  <Col span={8}>
                    <Card>
                      <Statistic
                        title="用户总数"
                        value={users.length}
                        prefix={<TeamOutlined />}
                      />
                      <Progress
                        percent={Math.round((getActiveUsers() / users.length) * 100)}
                        size="small"
                        status="active"
                        style={{ marginTop: 8 }}
                      />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card>
                      <Statistic
                        title="活跃用户"
                        value={getActiveUsers()}
                        valueStyle={{ color: '#3f8600' }}
                      />
                      <Progress
                        percent={Math.round((getActiveUsers() / users.length) * 100)}
                        size="small"
                        status="success"
                        style={{ marginTop: 8 }}
                      />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card>
                      <Statistic
                        title="本月新增"
                        value={getNewUsersThisMonth()}
                        valueStyle={{ color: '#cf1322' }}
                      />
                      <Progress
                        percent={Math.round((getNewUsersThisMonth() / users.length) * 100)}
                        size="small"
                        status="exception"
                        style={{ marginTop: 8 }}
                      />
                    </Card>
                  </Col>
                </Row>

                <Card 
                  title="用户列表" 
                  extra={
                    <Space>
                      <Dropdown menu={{ items: batchOperationMenu }}>
                        <Button>
                          批量操作 <MoreOutlined />
                        </Button>
                      </Dropdown>
                      <Button 
                        type="primary" 
                        icon={<PlusOutlined />} 
                        onClick={() => {
                          setEditingKey(null);
                          form.resetFields();
                          setIsModalVisible(true);
                        }}
                      >
                        添加用户
                      </Button>
                    </Space>
                  }
                >
                  <Form
                    form={searchForm}
                    layout="inline"
                    onFinish={handleSearch}
                    style={{ marginBottom: 16 }}
                  >
                    <Form.Item name="searchText">
                      <Input
                        placeholder="搜索用户名/邮箱/电话/地址"
                        prefix={<SearchOutlined />}
                        allowClear
                      />
                    </Form.Item>
                    <Form.Item name="dateRange">
                      <RangePicker />
                    </Form.Item>
                    <Form.Item name="tags">
                      <Select
                        mode="multiple"
                        placeholder="选择标签"
                        style={{ width: 200 }}
                        options={[
                          { label: '开发者', value: '开发者' },
                          { label: '管理员', value: '管理员' },
                          { label: '实习生', value: '实习生' },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item name="status">
                      <Select
                        placeholder="用户状态"
                        style={{ width: 120 }}
                        options={[
                          { label: '活跃', value: 'active' },
                          { label: '未活跃', value: 'inactive' },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        搜索
                      </Button>
                    </Form.Item>
                  </Form>

                  <Table 
                    columns={columns} 
                    dataSource={users}
                    rowSelection={{
                      selectedRowKeys,
                      onChange: (keys) => setSelectedRowKeys(keys as string[]),
                      selections: [
                        Table.SELECTION_ALL,
                        Table.SELECTION_INVERT,
                        Table.SELECTION_NONE,
                      ],
                    }}
                    pagination={{
                      showSizeChanger: true,
                      showQuickJumper: true,
                      showTotal: total => `共 ${total} 条记录`
                    }}
                  />
                </Card>
              </>
            )}

            {selectedMenu === '2' && (
              <Card title="用户管理">
                <List
                  itemLayout="horizontal"
                  dataSource={users}
                  renderItem={(user) => (
                    <List.Item
                      actions={[
                        <Button key="edit" type="link" onClick={() => handleEdit(user)}>
                          编辑
                        </Button>,
                        <Popconfirm
                          key="delete"
                          title="确定要删除这个用户吗？"
                          onConfirm={() => handleDelete(user.key)}
                        >
                          <Button type="link" danger>
                            删除
                          </Button>
                        </Popconfirm>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar icon={<UserOutlined />} />}
                        title={user.name}
                        description={
                          <Space direction="vertical">
                            <Space>
                              <MailOutlined /> {user.email}
                              <PhoneOutlined /> {user.phone}
                            </Space>
                            <Space>
                              <EnvironmentOutlined /> {user.address}
                              {user.tags.map(tag => (
                                <Tag key={tag} color="blue">{tag}</Tag>
                              ))}
                            </Space>
                          </Space>
                        }
                      />
                      <Tag color={user.status === 'active' ? 'green' : 'red'}>
                        {user.status === 'active' ? '活跃' : '未活跃'}
                      </Tag>
                    </List.Item>
                  )}
                />
              </Card>
            )}

            {selectedMenu === '3' && (
              <div>
                {settingsOptions.map(section => (
                  <Card 
                    key={section.title} 
                    title={section.title}
                    style={{ marginBottom: 16 }}
                  >
                    <List
                      itemLayout="horizontal"
                      dataSource={section.items}
                      renderItem={item => (
                        <List.Item>
                          <List.Item.Meta
                            title={item.label}
                            description={item.value}
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                ))}
              </div>
            )}
          </Space>
        </Content>
      </Layout>

      <Modal
        title={editingKey ? "编辑用户" : "添加用户"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingKey(null);
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="年龄"
            name="age"
            rules={[{ type: 'number', min: 0, max: 150 }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ type: 'email', message: '请输入有效的邮箱地址！' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="电话"
            name="phone"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="地址"
            name="address"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="标签"
            name="tags"
          >
            <Select
              mode="multiple"
              placeholder="选择标签"
              options={[
                { label: '开发者', value: '开发者' },
                { label: '管理员', value: '管理员' },
                { label: '实习生', value: '实习生' },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="状态"
            name="status"
            initialValue="active"
          >
            <Select
              options={[
                { label: '活跃', value: 'active' },
                { label: '未活跃', value: 'inactive' },
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingKey ? '保存' : '添加'}
              </Button>
              <Button onClick={() => {
                setIsModalVisible(false);
                form.resetFields();
                setEditingKey(null);
              }}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}

export default App;
