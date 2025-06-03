import React, { useState, useEffect, useCallback } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ColumnSettings } from './components/ColumnSettings';
import type { DataType, ColumnVisibility } from './types';
import { STORAGE_KEY, DEFAULT_VISIBILITY, COLUMN_CONFIGS, TABLE_DATA } from './constants';

const ORDER_STORAGE_KEY = 'table-columns-order';

const TableComponent: React.FC = () => {
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>(() => {
    try {
      const savedVisibility = localStorage.getItem(STORAGE_KEY);
      return savedVisibility ? JSON.parse(savedVisibility) : DEFAULT_VISIBILITY;
    } catch (error) {
      console.error('Error loading column visibility settings:', error);
      return DEFAULT_VISIBILITY;
    }
  });

  const [columnOrder, setColumnOrder] = useState<string[]>(() => {
    try {
      const savedOrder = localStorage.getItem(ORDER_STORAGE_KEY);
      return savedOrder ? JSON.parse(savedOrder) : COLUMN_CONFIGS.map(config => config.key);
    } catch (error) {
      console.error('Error loading column order:', error);
      return COLUMN_CONFIGS.map(config => config.key);
    }
  });

  const [tempVisibility, setTempVisibility] = useState(columnVisibility);
  const [popoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(columnVisibility));
    } catch (error) {
      console.error('Error saving column visibility settings:', error);
    }
  }, [columnVisibility]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(columnOrder));
    } catch (error) {
      console.error('Error saving column order:', error);
    }
  }, [columnOrder]);

  const handleColumnVisibilityChange = useCallback((column: keyof ColumnVisibility, checked: boolean) => {
    const newVisibility = {
      ...tempVisibility,
      [column]: checked
    };
    setTempVisibility(newVisibility);
    setColumnVisibility(newVisibility);
  }, [tempVisibility]);

  const handleSelectAll = useCallback((checked: boolean) => {
    const newVisibility = {
      name: checked,
      age: checked,
      address: checked,
    };
    setTempVisibility(newVisibility);
    setColumnVisibility(newVisibility);
  }, []);

  const handleCancelChanges = useCallback(() => {
    setTempVisibility(DEFAULT_VISIBILITY);
    setColumnVisibility(DEFAULT_VISIBILITY);
    setColumnOrder(COLUMN_CONFIGS.map(config => config.key));
    setPopoverOpen(false);
  }, []);

  const handleColumnOrderChange = useCallback((newOrder: string[]) => {
    setColumnOrder(newOrder);
  }, []);

  const columns: ColumnsType<DataType> = columnOrder.map(columnKey => {
    const config = COLUMN_CONFIGS.find(c => c.key === columnKey);
    if (!config) return null;
    return {
      title: config.title,
      dataIndex: config.dataIndex,
      key: config.key,
      sorter: config.sorter,
      sortDirections: ['ascend', 'descend'],
      hidden: !columnVisibility[config.key],
      onHeaderCell: () => ({
        onContextMenu: (e: React.MouseEvent) => {
          e.preventDefault();
          setPopoverOpen(true);
        },
      }),
    };
  }).filter(Boolean) as ColumnsType<DataType>;

  const visibleColumns = columns.filter(col => !col.hidden);

  return (
    <div style={{ padding: '24px' }}>
      <ColumnSettings
        tempVisibility={tempVisibility}
        onVisibilityChange={handleColumnVisibilityChange}
        onSelectAll={handleSelectAll}
        onCancel={handleCancelChanges}
        open={popoverOpen}
        onOpenChange={setPopoverOpen}
        columnOrder={columnOrder}
        onColumnOrderChange={handleColumnOrderChange}
      />
      <Table 
        columns={visibleColumns} 
        dataSource={TABLE_DATA}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default TableComponent; 