import React from 'react';
import { Flex, Space, Button, Tooltip } from 'antd';
import { SettingOutlined, FileExcelOutlined } from '@ant-design/icons';
import { ColumnSettings } from './ColumnSettings';
import type { ColumnVisibility, ColumnKey } from '../types';

interface TableHeaderProps {
  tempVisibility: ColumnVisibility;
  onVisibilityChange: (column: ColumnKey, checked: boolean) => void;
  onCancel: () => void;
  popoverOpen: boolean;
  onPopoverOpenChange: (open: boolean) => void;
  columnOrder: ColumnKey[];
  onColumnOrderChange: (newOrder: ColumnKey[]) => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
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
          tempVisibility={tempVisibility}
          onVisibilityChange={onVisibilityChange}
          onCancel={onCancel}
          open={popoverOpen}
          onOpenChange={onPopoverOpenChange}
          columnOrder={columnOrder}
          onColumnOrderChange={onColumnOrderChange}
          trigger={
            <Tooltip title='Настройки колонок'>
              <Button type='link' icon={<SettingOutlined />} onClick={() => onPopoverOpenChange(true)} />
            </Tooltip>
          }
        />
      </Space>
    </Flex>
  );
}; 