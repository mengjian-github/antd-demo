import React from 'react';
import { Form, Input, InputNumber, Select, Button } from 'antd';
import { FormValues, User } from '../types';

interface UserFormProps {
  form: any;
  onFinish: (values: FormValues) => void;
  initialValues?: User;
}

const UserForm: React.FC<UserFormProps> = ({ form, onFinish, initialValues }) => {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={
        initialValues
          ? {
              username: initialValues.name,
              age: initialValues.age,
              address: initialValues.address,
              tags: initialValues.tags,
              email: initialValues.email,
              phone: initialValues.phone,
              status: initialValues.status,
            }
          : undefined
      }
    >
      <Form.Item
        name="username"
        label="用户名"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="age" label="年龄">
        <InputNumber min={0} max={150} />
      </Form.Item>

      <Form.Item name="address" label="地址">
        <Input />
      </Form.Item>

      <Form.Item name="tags" label="标签">
        <Select
          mode="tags"
          style={{ width: '100%' }}
          placeholder="请选择或输入标签"
        />
      </Form.Item>

      <Form.Item
        name="email"
        label="邮箱"
        rules={[{ type: 'email', message: '请输入有效的邮箱地址' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="phone" label="电话">
        <Input />
      </Form.Item>

      <Form.Item name="status" label="状态">
        <Select>
          <Select.Option value="active">活跃</Select.Option>
          <Select.Option value="inactive">非活跃</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserForm; 