import React from 'react';
import type { ReactNode } from 'react';
import { Popover, Checkbox, Button, Space } from 'antd';
import { HolderOutlined, RollbackOutlined } from '@ant-design/icons';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { ColumnVisibility, ColumnKey, SortableItemProps } from '../types';
import { COLUMN_CONFIGS } from '../constants';
import styles from './ColumnSettings.module.css';

const SortableItem: React.FC<SortableItemProps> = ({ id, title, checked, onChange, disabled }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className={styles.sortableItem} {...attributes}>
      <Checkbox checked={checked} onChange={(e) => onChange(e.target.checked)} disabled={disabled}>
        {title}
      </Checkbox>
      <div {...listeners} className={styles.dragHandle}>
        <HolderOutlined />
      </div>
    </div>
  );
};

interface ColumnSettingsProps {
  tempVisibility: ColumnVisibility;
  onVisibilityChange: (column: ColumnKey, checked: boolean) => void;
  onCancel: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  columnOrder: ColumnKey[];
  onColumnOrderChange: (newOrder: ColumnKey[]) => void;
  trigger: ReactNode;
}

export const ColumnSettings: React.FC<ColumnSettingsProps> = ({
  tempVisibility,
  onVisibilityChange,
  onCancel,
  open,
  onOpenChange,
  columnOrder,
  onColumnOrderChange,
  trigger,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      const oldIndex = columnOrder.indexOf(active.id as ColumnKey);
      const newIndex = columnOrder.indexOf(over?.id as ColumnKey);
      const newOrder = arrayMove(columnOrder, oldIndex, newIndex);
      onColumnOrderChange(newOrder);
    }
  };

  const handleVisibilityChange = (column: ColumnKey, checked: boolean) => {
    if (!checked) {
      const visibleColumnsCount = Object.values(tempVisibility).filter(Boolean).length;
      if (visibleColumnsCount <= 1) {
        return;
      }
    }
    onVisibilityChange(column, checked);
  };

  const content = (
    <div className={styles.popoverContent}>
      <div className={styles.popoverHeader}>
        <h4>Показать столбцы</h4>
      </div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={columnOrder}
            strategy={verticalListSortingStrategy}
          >
            {columnOrder.map((columnKey) => {
              const config = COLUMN_CONFIGS.find(c => c.key === columnKey);
              if (!config) return null;
              const isLastVisible = tempVisibility[config.key] && 
                Object.values(tempVisibility).filter(Boolean).length === 1;
              return (
                <SortableItem
                  key={config.key}
                  id={config.key}
                  title={config.title}
                  checked={tempVisibility[config.key]}
                  onChange={(checked) => handleVisibilityChange(config.key, checked)}
                  disabled={isLastVisible}
                />
              );
            })}
          </SortableContext>
        </DndContext>
      </Space>
      <div className={styles.popoverFooter}>
        <Button 
          type="text" 
          onClick={onCancel} 
          className={styles.popoverFooterButton}
          icon={<RollbackOutlined />}
        >
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
      {trigger}
    </Popover>
  );
}; 