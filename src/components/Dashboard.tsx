import React from 'react';
import { Row, Col, Card, Statistic, Table, Tag, Progress, List, Avatar } from 'antd';
import { UserOutlined, TeamOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { User } from '../types';

interface DashboardProps {
  users: User[];
}

const Dashboard: React.FC<DashboardProps> = ({ users }) => {
  const getActiveUsers = () => users.filter(u => u.status === 'active').length;
  const getInactiveUsers = () => users.filter(u => u.status === 'inactive').length;

  const getNewUsersThisMonth = () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return users.filter(u => new Date(u.createTime) >= startOfMonth).length;
  };

  const getActivePercentage = () => {
    return users.length > 0 ? Math.round((getActiveUsers() / users.length) * 100) : 0;
  };

  // 最近添加的用户
  const recentUsers = [...users]
    .sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime())
    .slice(0, 5);

  // 用户标签统计
  const tagStats = users.reduce((acc: Record<string, number>, user) => {
    user.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  const columns = [
    {
      title: '标签',
      dataIndex: 'tag',
      key: 'tag',
      render: (tag: string) => <Tag color="blue">{tag}</Tag>,
    },
    {
      title: '数量',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: '占比',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (percentage: number) => (
        <Progress percent={percentage} size="small" />
      ),
    },
  ];

  const tagData = Object.entries(tagStats).map(([tag, count]) => ({
    tag,
    count,
    percentage: Math.round((count / users.length) * 100),
  }));

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总用户数"
              value={users.length}
              prefix={<TeamOutlined />}
              suffix={
                <Tag color="blue">
                  <ArrowUpOutlined /> {getNewUsersThisMonth()}
                </Tag>
              }
            />
            <Progress percent={100} status="active" size="small" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="活跃用户"
              value={getActiveUsers()}
              valueStyle={{ color: '#3f8600' }}
              prefix={<UserOutlined />}
              suffix={`${getActivePercentage()}%`}
            />
            <Progress percent={getActivePercentage()} status="success" size="small" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="非活跃用户"
              value={getInactiveUsers()}
              valueStyle={{ color: '#cf1322' }}
              prefix={<UserOutlined />}
              suffix={`${100 - getActivePercentage()}%`}
            />
            <Progress percent={100 - getActivePercentage()} status="exception" size="small" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="本月新增"
              value={getNewUsersThisMonth()}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
              suffix={
                <Tag color="green">
                  <ArrowUpOutlined /> 新增
                </Tag>
              }
            />
            <Progress 
              percent={Math.round((getNewUsersThisMonth() / users.length) * 100)} 
              strokeColor="#1890ff" 
              size="small" 
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col span={12}>
          <Card title="用户标签分布">
            <Table 
              columns={columns} 
              dataSource={tagData}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="最近添加的用户">
            <List
              itemLayout="horizontal"
              dataSource={recentUsers}
              renderItem={user => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={user.name}
                    description={
                      <span>
                        {user.email} · {user.createTime}
                        {user.tags.map(tag => (
                          <Tag color="blue" key={tag} style={{ marginLeft: 8 }}>
                            {tag}
                          </Tag>
                        ))}
                      </span>
                    }
                  />
                  <Tag color={user.status === 'active' ? 'green' : 'red'}>
                    {user.status === 'active' ? '活跃' : '非活跃'}
                  </Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard; 