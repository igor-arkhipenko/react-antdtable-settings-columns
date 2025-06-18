import React from 'react';
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
import styles from './ColumnSettings.module.css';

// Generic interface for column configuration
export interface ColumnConfig<T = any> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  sorter?: boolean;
  [key: string]: any;
}

// Generic interface for column visibility
export interface ColumnVisibility {
  [key: string]: boolean;
}

// Props interface for the reusable component
export interface ColumnSettingsProps<T = any> {
  // Column configurations
  columns: ColumnConfig<T>[];
  
  // Current visibility state
  visibility: ColumnVisibility;
  
  // Current column order
  columnOrder: string[];
  
  // Callbacks
  onVisibilityChange: (columnKey: string, checked: boolean) => void;
  onColumnOrderChange: (newOrder: string[]) => void;
  onCancel?: () => void;
  
  // Popover state
  open: boolean;
  onOpenChange: (open: boolean) => void;
  
  // Trigger element
  trigger?: React.ReactNode;
  
  // Customization
  title?: string;
  cancelText?: string;
  minVisibleColumns?: number;
  
  // Styling
  className?: string;
  style?: React.CSSProperties;
}

const SortableItem: React.FC<{
  id: string;
  title: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled: boolean;
}> = ({ id, title, checked, onChange, disabled }) => {
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

export const ColumnSettings = <T extends Record<string, any> = any>({
  columns,
  visibility,
  columnOrder,
  onVisibilityChange,
  onColumnOrderChange,
  onCancel,
  open,
  onOpenChange,
  trigger,
  title = "Показать столбцы",
  cancelText = "Отменить изменения",
  minVisibleColumns = 1,
  className,
  style,
}: ColumnSettingsProps<T>) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      const oldIndex = columnOrder.indexOf(active.id as string);
      const newIndex = columnOrder.indexOf(over?.id as string);
      const newOrder = arrayMove(columnOrder, oldIndex, newIndex);
      onColumnOrderChange(newOrder);
    }
  };

  const handleVisibilityChange = (columnKey: string, checked: boolean) => {
    if (!checked) {
      const visibleColumnsCount = Object.values(visibility).filter(Boolean).length;
      if (visibleColumnsCount <= minVisibleColumns) {
        return;
      }
    }
    onVisibilityChange(columnKey, checked);
  };

  const content = (
    <div className={`${styles.popoverContent} ${className || ''}`} style={style}>
      <div className={styles.popoverHeader}>
        <h4>{title}</h4>
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
              const config = columns.find(c => c.key === columnKey);
              if (!config) return null;
              
              const isLastVisible = visibility[config.key] && 
                Object.values(visibility).filter(Boolean).length === minVisibleColumns;
              
              return (
                <SortableItem
                  key={config.key}
                  id={config.key}
                  title={config.title}
                  checked={visibility[config.key]}
                  onChange={(checked) => handleVisibilityChange(config.key, checked)}
                  disabled={isLastVisible}
                />
              );
            })}
          </SortableContext>
        </DndContext>
      </Space>
      {onCancel && (
        <div className={styles.popoverFooter}>
          <Button 
            type="text" 
            onClick={onCancel} 
            className={styles.popoverFooterButton}
            icon={<RollbackOutlined />}
          >
            {cancelText}
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <Popover
      content={content}
      title={null}
      trigger="click"
      open={open}
      onOpenChange={onOpenChange}
      arrow={false}
    >
      {trigger || <div />}
    </Popover>
  );
}; 