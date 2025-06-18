import React from 'react';
import { Card, Space, Input, Button } from 'antd';
import type { ColumnKey } from '../types';
import { COLUMN_CONFIGS } from '../constants';

interface TableFiltersProps {
  filters: Record<string, string>;
  onFilterChange: (columnKey: string, value: string) => void;
  onSearch: () => void;
  onReset: () => void;
  visibleColumns: Record<ColumnKey, boolean>;
}

export const TableFilters: React.FC<TableFiltersProps> = ({
  filters,
  onFilterChange,
  onSearch,
  onReset,
  visibleColumns,
}) => {
  return (
    <Card
      title="Фильтры"
      extra={
        <Space>
          <Button type="primary" onClick={onSearch}>
            Найти
          </Button>
          <Button onClick={onReset}>
            Сбросить
          </Button>
        </Space>
      }
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        {COLUMN_CONFIGS
          .filter(config => visibleColumns[config.key])
          .map(config => (
            <div key={config.key}>
              <div style={{ marginBottom: 8 }}>{config.title}</div>
              <Input
                placeholder={`Введите ${config.title.toLowerCase()}`}
                value={filters[config.key] || ''}
                onChange={e => onFilterChange(config.key, e.target.value)}
                allowClear
              />
            </div>
          ))}
      </Space>
    </Card>
  );
}; 