import React, { useState } from 'react';
import { Layout, Menu, Typography } from 'antd';
import { TableOutlined, ShoppingOutlined } from '@ant-design/icons';
import TableComponent from './TableComponent';
import { ProductTable } from './components/ProductTable';
import 'antd/dist/reset.css';

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const [selectedTable, setSelectedTable] = useState<'users' | 'products'>('users');

  const menuItems = [
    {
      key: 'users',
      icon: <TableOutlined />,
      label: 'Таблица пользователей',
    },
    {
      key: 'products',
      icon: <ShoppingOutlined />,
      label: 'Таблица продуктов',
    },
  ];

  const renderTable = () => {
    switch (selectedTable) {
      case 'products':
        return <ProductTable />;
      case 'users':
      default:
        return <TableComponent />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        display: 'flex', 
        alignItems: 'center', 
        background: '#fff',
        padding: '0 24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <Title level={3} style={{ margin: 0, marginRight: '48px' }}>
          Система управления таблицами
        </Title>
        <Menu
          mode="horizontal"
          selectedKeys={[selectedTable]}
          items={menuItems}
          onClick={({ key }) => setSelectedTable(key as 'users' | 'products')}
          style={{ flex: 1, borderBottom: 'none' }}
        />
      </Header>
      <Content style={{ padding: '24px', background: '#f5f5f5' }}>
        {renderTable()}
      </Content>
    </Layout>
  );
}

export default App;
