import React, { useState } from 'react';
import { Button, Table } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { ColumnSettings, type ColumnConfig } from './ColumnSettings';

// Example data type
interface UserData {
  id: number;
  name: string;
  email: string;
  age: number;
  department: string;
}

// Example column configuration
const userColumns: ColumnConfig<UserData>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id' },
  { key: 'name', title: 'Имя', dataIndex: 'name' },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'age', title: 'Возраст', dataIndex: 'age' },
  { key: 'department', title: 'Отдел', dataIndex: 'department' },
];

// Example data
const userData: UserData[] = [
  { id: 1, name: 'Иван Иванов', email: 'ivan@example.com', age: 30, department: 'IT' },
  { id: 2, name: 'Мария Петрова', email: 'maria@example.com', age: 25, department: 'HR' },
];

export const ExampleUsage: React.FC = () => {
  const [visibility, setVisibility] = useState<Record<string, boolean>>({
    id: true,
    name: true,
    email: true,
    age: true,
    department: true,
  });

  const [columnOrder, setColumnOrder] = useState<string[]>([
    'id', 'name', 'email', 'age', 'department'
  ]);

  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleVisibilityChange = (columnKey: string, checked: boolean) => {
    setVisibility(prev => ({
      ...prev,
      [columnKey]: checked
    }));
  };

  const handleColumnOrderChange = (newOrder: string[]) => {
    setColumnOrder(newOrder);
  };

  const handleCancel = () => {
    setVisibility({
      id: true,
      name: true,
      email: true,
      age: true,
      department: true,
    });
    setColumnOrder(['id', 'name', 'email', 'age', 'department']);
    setPopoverOpen(false);
  };

  // Create table columns based on visibility and order
  const tableColumns = columnOrder
    .filter(key => visibility[key])
    .map(key => {
      const config = userColumns.find(col => col.key === key);
      return {
        title: config?.title,
        dataIndex: config?.dataIndex,
        key: config?.key,
      };
    });

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'flex-end' }}>
        <ColumnSettings
          columns={userColumns}
          visibility={visibility}
          columnOrder={columnOrder}
          onVisibilityChange={handleVisibilityChange}
          onColumnOrderChange={handleColumnOrderChange}
          onCancel={handleCancel}
          open={popoverOpen}
          onOpenChange={setPopoverOpen}
          title="Настройка колонок пользователей"
          cancelText="Сбросить настройки"
          minVisibleColumns={2}
          trigger={
            <Button icon={<SettingOutlined />}>
              Настройки колонок
            </Button>
          }
        />
      </div>

      <Table
        columns={tableColumns}
        dataSource={userData}
        pagination={false}
      />
    </div>
  );
}; 