import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TableFilters } from './components/TableFilters';
import { TableHeader } from './components/TableHeader';
import type { DataType, ColumnKey, TableSettings } from './types';
import { STORAGE_KEYS, DEFAULT_VISIBILITY, COLUMN_CONFIGS, TABLE_DATA } from './constants';

const TableComponent: React.FC = () => {
  const [tableSettings, setTableSettings] = useState<TableSettings>(() => {
    try {
      const savedVisibility = localStorage.getItem(STORAGE_KEYS.visibility);
      const savedOrder = localStorage.getItem(STORAGE_KEYS.order);
      
      return {
        visibility: savedVisibility ? JSON.parse(savedVisibility) : DEFAULT_VISIBILITY,
        order: savedOrder ? JSON.parse(savedOrder) : COLUMN_CONFIGS.map(config => config.key),
      };
    } catch (error) {
      console.error('Error loading table settings:', error);
      message.error('Ошибка загрузки настроек таблицы');
      return {
        visibility: DEFAULT_VISIBILITY,
        order: COLUMN_CONFIGS.map(config => config.key),
      };
    }
  });

  const [tempVisibility, setTempVisibility] = useState(tableSettings.visibility);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [filteredData, setFilteredData] = useState<DataType[]>([...TABLE_DATA]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.visibility, JSON.stringify(tableSettings.visibility));
      localStorage.setItem(STORAGE_KEYS.order, JSON.stringify(tableSettings.order));
    } catch (error) {
      console.error('Error saving table settings:', error);
      message.error('Ошибка сохранения настроек таблицы');
    }
  }, [tableSettings]);

  const handleFilterChange = (columnKey: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [columnKey]: value
    }));
  };

  const handleSearch = () => {
    const filtered = TABLE_DATA.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        const itemValue = String(item[key as keyof DataType]).toLowerCase();
        return itemValue.includes(value.toLowerCase());
      });
    });
    setFilteredData(filtered);
  };

  const handleReset = () => {
    setFilters({});
    setFilteredData([...TABLE_DATA]);
  };

  const handleColumnVisibilityChange = useCallback((column: ColumnKey, checked: boolean) => {
    const newVisibility = {
      ...tempVisibility,
      [column]: checked
    };
    setTempVisibility(newVisibility);
    setTableSettings(prev => ({
      ...prev,
      visibility: newVisibility
    }));

    if (!checked) {
      setFilters(prev => {
        const newFilters = { ...prev };
        delete newFilters[column];
        return newFilters;
      });
    }
  }, [tempVisibility]);

  const handleCancelChanges = useCallback(() => {
    setTempVisibility(DEFAULT_VISIBILITY);
    setTableSettings({
      visibility: DEFAULT_VISIBILITY,
      order: COLUMN_CONFIGS.map(config => config.key),
    });
    setPopoverOpen(false);
  }, []);

  const handleColumnOrderChange = useCallback((newOrder: ColumnKey[]) => {
    setTableSettings(prev => ({
      ...prev,
      order: newOrder
    }));
  }, []);

  const columns: ColumnsType<DataType> = tableSettings.order.map(columnKey => {
    const config = COLUMN_CONFIGS.find(c => c.key === columnKey);
    if (!config) return null;
    return {
      title: config.title,
      dataIndex: config.dataIndex,
      key: config.key,
      sorter: config.sorter,
      sortDirections: ['ascend', 'descend'],
      hidden: !tableSettings.visibility[config.key],
    };
  }).filter(Boolean) as ColumnsType<DataType>;

  const visibleColumns = columns.filter(col => !col.hidden);

  return (
    <>
      <Row>
        <Col span={18}>
          <TableHeader
            tempVisibility={tempVisibility}
            onVisibilityChange={handleColumnVisibilityChange}
            onCancel={handleCancelChanges}
            popoverOpen={popoverOpen}
            onPopoverOpenChange={setPopoverOpen}
            columnOrder={tableSettings.order}
            onColumnOrderChange={handleColumnOrderChange}
          />
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={18}>
          <Table
            columns={visibleColumns}
            dataSource={filteredData}
            pagination={{ pageSize: 10 }}
          />
        </Col>
        <Col span={6}>
          <TableFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            onReset={handleReset}
            visibleColumns={tableSettings.visibility}
          />
        </Col>
      </Row>
    </>
  );
};

export default TableComponent; 