import { User, SettingGroup } from '../types';

export const initialUsers: User[] = [
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

export const settingsConfig: SettingGroup[] = [
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
      { label: '密码���度', value: '强' },
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