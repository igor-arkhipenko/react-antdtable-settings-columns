import React, { useState, useCallback } from 'react';
import { Table, Row, Col, Button } from 'antd';
import { SettingOutlined, FileExcelOutlined } from '@ant-design/icons';
import { ColumnSettings, type ColumnConfig } from './ColumnSettings';
import type { ColumnsType } from 'antd/es/table';

// Типы данных для продуктов
interface ProductData extends Record<string, unknown> {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  supplier: string;
  rating: number;
  description: string;
  createdAt: string;
  status: 'active' | 'inactive' | 'discontinued';
}

// Конфигурация колонок для продуктов
const productColumns: ColumnConfig<ProductData>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sorter: true },
  { key: 'name', title: 'Название', dataIndex: 'name', sorter: true },
  { key: 'category', title: 'Категория', dataIndex: 'category', sorter: true },
  { key: 'price', title: 'Цена', dataIndex: 'price', sorter: true },
  { key: 'stock', title: 'Остаток', dataIndex: 'stock', sorter: true },
  { key: 'supplier', title: 'Поставщик', dataIndex: 'supplier', sorter: true },
  { key: 'rating', title: 'Рейтинг', dataIndex: 'rating', sorter: true },
  { key: 'description', title: 'Описание', dataIndex: 'description', sorter: false },
  { key: 'createdAt', title: 'Дата создания', dataIndex: 'createdAt', sorter: true },
  { key: 'status', title: 'Статус', dataIndex: 'status', sorter: true },
];

// Пример данных о продуктах
const PRODUCT_DATA: ProductData[] = [
  {
    id: 1,
    name: 'Ноутбук Dell XPS 13',
    category: 'Электроника',
    price: 89999,
    stock: 15,
    supplier: 'Dell Inc.',
    rating: 4.8,
    description: 'Ультратонкий ноутбук с дисплеем 13.3" и процессором Intel Core i7',
    createdAt: '2024-01-15',
    status: 'active',
  },
  {
    id: 2,
    name: 'Смартфон iPhone 15 Pro',
    category: 'Электроника',
    price: 129999,
    stock: 8,
    supplier: 'Apple Inc.',
    rating: 4.9,
    description: 'Флагманский смартфон с камерой 48MP и чипом A17 Pro',
    createdAt: '2024-02-01',
    status: 'active',
  },
  {
    id: 3,
    name: 'Наушники Sony WH-1000XM5',
    category: 'Аудио',
    price: 29999,
    stock: 25,
    supplier: 'Sony Corporation',
    rating: 4.7,
    description: 'Беспроводные наушники с активным шумоподавлением',
    createdAt: '2024-01-20',
    status: 'active',
  },
  {
    id: 4,
    name: 'Планшет Samsung Galaxy Tab S9',
    category: 'Электроника',
    price: 59999,
    stock: 12,
    supplier: 'Samsung Electronics',
    rating: 4.6,
    description: '10.9" планшет с процессором Snapdragon 8 Gen 2',
    createdAt: '2024-02-10',
    status: 'active',
  },
  {
    id: 5,
    name: 'Умные часы Apple Watch Series 9',
    category: 'Носимые устройства',
    price: 39999,
    stock: 20,
    supplier: 'Apple Inc.',
    rating: 4.8,
    description: 'Умные часы с датчиком температуры и новым чипом S9',
    createdAt: '2024-01-25',
    status: 'active',
  },
  {
    id: 6,
    name: 'Игровая консоль PlayStation 5',
    category: 'Игры',
    price: 49999,
    stock: 5,
    supplier: 'Sony Interactive Entertainment',
    rating: 4.9,
    description: 'Игровая консоль нового поколения с поддержкой 4K',
    createdAt: '2024-01-30',
    status: 'active',
  },
  {
    id: 7,
    name: 'Монитор LG 27GP850-B',
    category: 'Периферия',
    price: 34999,
    stock: 18,
    supplier: 'LG Electronics',
    rating: 4.5,
    description: '27" игровой монитор с частотой 165Hz и разрешением 2560x1440',
    createdAt: '2024-02-05',
    status: 'active',
  },
  {
    id: 8,
    name: 'Клавиатура Logitech MX Keys',
    category: 'Периферия',
    price: 8999,
    stock: 30,
    supplier: 'Logitech',
    rating: 4.4,
    description: 'Беспроводная клавиатура с подсветкой и эргономичным дизайном',
    createdAt: '2024-01-18',
    status: 'active',
  },
];

// Начальное состояние видимости колонок
const DEFAULT_VISIBILITY: Record<string, boolean> = {
  id: true,
  name: true,
  category: true,
  price: true,
  stock: true,
  supplier: true,
  rating: true,
  description: false, // Описание скрыто по умолчанию
  createdAt: true,
  status: true,
};

// Начальный порядок колонок
const DEFAULT_COLUMN_ORDER = [
  'id', 'name', 'category', 'price', 'stock', 'supplier', 'rating', 'description', 'createdAt', 'status'
];

export const ProductTable: React.FC = () => {
  const [tempVisibility, setTempVisibility] = useState<Record<string, boolean>>(DEFAULT_VISIBILITY);
  const [columnOrder, setColumnOrder] = useState<string[]>(DEFAULT_COLUMN_ORDER);
  const [popoverOpen, setPopoverOpen] = useState(false);

  // Обработчик изменения видимости колонок
  const handleColumnVisibilityChange = useCallback((columnKey: string, checked: boolean) => {
    setTempVisibility(prev => ({
      ...prev,
      [columnKey]: checked
    }));
  }, []);

  // Обработчик изменения порядка колонок
  const handleColumnOrderChange = useCallback((newOrder: string[]) => {
    setColumnOrder(newOrder);
  }, []);

  // Обработчик отмены изменений
  const handleCancelChanges = useCallback(() => {
    setTempVisibility(DEFAULT_VISIBILITY);
    setColumnOrder(DEFAULT_COLUMN_ORDER);
    setPopoverOpen(false);
  }, []);

  // Создание колонок для Ant Design Table
  const tableColumns: ColumnsType<ProductData> = columnOrder
    .filter(key => tempVisibility[key])
    .map(key => {
      const config = productColumns.find(col => col.key === key);
      if (!config) return null;

      return {
        title: config.title,
        dataIndex: config.dataIndex,
        key: config.key,
        sorter: config.sorter,
        render: (value: unknown) => {
          // Кастомный рендеринг для разных типов данных
          switch (key) {
            case 'price':
              return `₽${(value as number).toLocaleString()}`;
            case 'rating':
              return `${value}/5.0`;
            case 'status':
              return (
                <span style={{ 
                  color: value === 'active' ? 'green' : value === 'inactive' ? 'orange' : 'red',
                  fontWeight: 'bold'
                }}>
                  {value === 'active' ? 'Активен' : value === 'inactive' ? 'Неактивен' : 'Снят с продаж'}
                </span>
              );
            case 'createdAt':
              return new Date(value as string).toLocaleDateString('ru-RU');
            case 'description':
              return (value as string).length > 50 ? `${(value as string).substring(0, 50)}...` : value;
            default:
              return value;
          }
        },
      };
    })
    .filter(Boolean) as ColumnsType<ProductData>;

  return (
    <div style={{ padding: '24px' }}>
      <h2>Таблица продуктов</h2>
      
      {/* Заголовок с настройками */}
      <Row style={{ marginBottom: '16px' }}>
        <Col span={24}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <Button
              type="primary"
              icon={<FileExcelOutlined />}
              onClick={() => console.log('Экспорт продуктов в Excel')}
            >
              Экспорт в Excel
            </Button>
            <ColumnSettings<ProductData>
              columns={productColumns}
              visibility={tempVisibility}
              columnOrder={columnOrder}
              onVisibilityChange={handleColumnVisibilityChange}
              onColumnOrderChange={handleColumnOrderChange}
              onCancel={handleCancelChanges}
              open={popoverOpen}
              onOpenChange={setPopoverOpen}
              title="Настройка колонок продуктов"
              cancelText="Сбросить настройки"
              minVisibleColumns={3}
              trigger={
                <Button icon={<SettingOutlined />}>
                  Настройки колонок
                </Button>
              }
            />
          </div>
        </Col>
      </Row>

      {/* Таблица */}
      <Row>
        <Col span={24}>
          <Table
            columns={tableColumns}
            dataSource={PRODUCT_DATA}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} из ${total} продуктов`,
            }}
            scroll={{ x: 1200 }}
          />
        </Col>
      </Row>
    </div>
  );
}; 