import React from 'react';
import { List, Card, Typography } from 'antd';
import { settingsConfig } from '../constants';

const { Title } = Typography;

const Settings: React.FC = () => {
  return (
    <div style={{ padding: '24px 0' }}>
      {settingsConfig.map((group, index) => (
        <Card
          key={index}
          style={{ marginBottom: 16 }}
          title={<Title level={4}>{group.title}</Title>}
        >
          <List
            dataSource={group.items}
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
  );
};

export default Settings; 