import React from 'react';
import { Flex, Space, Button } from 'antd';
import { SettingOutlined, FileExcelOutlined } from '@ant-design/icons';
import { ColumnSettings, type ColumnConfig, type ColumnVisibility } from './ColumnSettings';
import type { DataType } from '../types';

interface TableHeaderProps {
  columns: ColumnConfig<DataType>[];
  tempVisibility: ColumnVisibility;
  onVisibilityChange: (columnKey: string, checked: boolean) => void;
  onCancel: () => void;
  popoverOpen: boolean;
  onPopoverOpenChange: (open: boolean) => void;
  columnOrder: string[];
  onColumnOrderChange: (newOrder: string[]) => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  tempVisibility,
  onVisibilityChange,
  onCancel,
  popoverOpen,
  onPopoverOpenChange,
  columnOrder,
  onColumnOrderChange,
}) => {
  return (
    <Flex justify='end' align='center'>
      <Space>
        <Button
          type="primary"
          icon={<FileExcelOutlined />}
          onClick={() => console.log('export to excel')}
        >
          Выгрузка в Excel
        </Button>
        <ColumnSettings
          columns={columns}
          visibility={tempVisibility}
          columnOrder={columnOrder}
          onVisibilityChange={onVisibilityChange}
          onColumnOrderChange={onColumnOrderChange}
          onCancel={onCancel}
          open={popoverOpen}
          onOpenChange={onPopoverOpenChange}
          trigger={
            <Button type='link' icon={<SettingOutlined />} onClick={() => onPopoverOpenChange(true)} />
          }
        />
      </Space>
    </Flex>
  );
}; 