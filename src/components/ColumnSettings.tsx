import React from 'react';
import { Popover, Checkbox, Button, Space } from 'antd';
import type { ColumnVisibility } from '../types';
import { COLUMN_CONFIGS } from '../constants';

interface ColumnSettingsProps {
  tempVisibility: ColumnVisibility;
  onVisibilityChange: (column: keyof ColumnVisibility, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onCancel: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ColumnSettings: React.FC<ColumnSettingsProps> = ({
  tempVisibility,
  onVisibilityChange,
  onSelectAll,
  onCancel,
  open,
  onOpenChange,
}) => {
  const isAllSelected = Object.values(tempVisibility).every(value => value === true);

  const content = (
    <div style={{ width: '200px' }}>
      <div style={{ marginBottom: '16px' }}>
        <h4>Показать столбцы</h4>
      </div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Checkbox
          checked={isAllSelected}
          onChange={(e) => onSelectAll(e.target.checked)}
          style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '8px', marginBottom: '8px' }}
        >
          Все
        </Checkbox>
        {COLUMN_CONFIGS.map((config) => (
          <Checkbox
            key={config.key}
            checked={tempVisibility[config.key]}
            onChange={(e) => onVisibilityChange(config.key, e.target.checked)}
          >
            {config.title}
          </Checkbox>
        ))}
      </Space>
      <div style={{ marginTop: '16px', borderTop: '1px solid #f0f0f0', paddingTop: '8px' }}>
        <Button type="link" onClick={onCancel} style={{ padding: 0 }}>
          Отменить изменения
        </Button>
      </div>
    </div>
  );

  return (
    <Popover
      content={content}
      title={null}
      trigger="click"
      open={open}
      onOpenChange={onOpenChange}
    >
      <div />
    </Popover>
  );
}; 