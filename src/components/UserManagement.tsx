import React, { useState } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Popconfirm,
  Tag,
  message,
  Form
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { User, FormValues } from '../types';
import UserForm from './UserForm.tsx';
import UserSearch from './UserSearch.tsx';

interface UserManagementProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserManagement: React.FC<UserManagementProps> = ({ users, setUsers }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const handleSubmit = (values: FormValues) => {
    if (editingKey) {
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

  const handleDelete = (key: string) => {
    setUsers(prev => prev.filter(user => user.key !== key));
    messageApi.success('删除成功！');
  };

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

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
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
      title: '操作',
      key: 'action',
      render: (_: any, record: User) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除吗？"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          添加用户
        </Button>
      </Space>
      
      <UserSearch users={users} setUsers={setUsers} />
      
      <Table
        columns={columns}
        dataSource={users}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys: React.Key[]) => setSelectedRowKeys(keys as string[]),
        }}
      />

      <Modal
        title={editingKey ? "编辑用户" : "添加用户"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingKey(null);
          form.resetFields();
        }}
        footer={null}
      >
        <UserForm
          form={form}
          onFinish={handleSubmit}
          initialValues={editingKey ? users.find(u => u.key === editingKey) : undefined}
        />
      </Modal>
    </div>
  );
};

export default UserManagement; 