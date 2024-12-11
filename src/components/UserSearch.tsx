import React from 'react';
import { Form, Input, Select, Button, Space, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { SearchFormValues, User } from '../types';

const { RangePicker } = DatePicker;

interface UserSearchProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserSearch: React.FC<UserSearchProps> = ({ users, setUsers }) => {
  const [form] = Form.useForm();

  const handleSearch = (values: SearchFormValues) => {
    let filteredUsers = [...users];
    
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
  };

  const handleReset = () => {
    form.resetFields();
    setUsers(users);
  };

  return (
    <Form
      form={form}
      layout="inline"
      onFinish={handleSearch}
      style={{ marginBottom: 16 }}
    >
      <Form.Item name="searchText">
        <Input
          placeholder="搜索用户名/地址/邮箱/电话"
          prefix={<SearchOutlined />}
          allowClear
        />
      </Form.Item>

      <Form.Item name="tags">
        <Select
          mode="multiple"
          placeholder="选择标签"
          style={{ width: 200 }}
          allowClear
        >
          <Select.Option value="开发者">开发者</Select.Option>
          <Select.Option value="管理员">管理员</Select.Option>
          <Select.Option value="实习生">实习生</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="dateRange">
        <RangePicker />
      </Form.Item>

      <Form.Item name="status">
        <Select
          placeholder="选择状态"
          style={{ width: 120 }}
          allowClear
        >
          <Select.Option value="active">活跃</Select.Option>
          <Select.Option value="inactive">非活跃</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
          <Button onClick={handleReset}>重置</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default UserSearch; 