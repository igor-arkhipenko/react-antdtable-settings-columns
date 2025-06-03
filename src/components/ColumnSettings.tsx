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
import type { ColumnVisibility } from '../types';
import { COLUMN_CONFIGS } from '../constants';
import styles from './ColumnSettings.module.css';

interface SortableItemProps {
  id: string;
  title: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, title, checked, onChange }) => {
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
      <Checkbox checked={checked} onChange={(e) => onChange(e.target.checked)}>
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
  onVisibilityChange: (column: keyof ColumnVisibility, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onCancel: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  columnOrder: string[];
  onColumnOrderChange: (newOrder: string[]) => void;
}

export const ColumnSettings: React.FC<ColumnSettingsProps> = ({
  tempVisibility,
  onVisibilityChange,
  onSelectAll,
  onCancel,
  open,
  onOpenChange,
  columnOrder,
  onColumnOrderChange,
}) => {
  const isAllSelected = Object.values(tempVisibility).every(value => value === true);

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

  const content = (
    <div className={styles.popoverContent}>
      <div className={styles.popoverHeader}>
        <h4>Показать столбцы</h4>
      </div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Checkbox
          checked={isAllSelected}
          onChange={(e) => onSelectAll(e.target.checked)}
          className={styles.selectAllCheckbox}
        >
          Все
        </Checkbox>
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
              return (
                <SortableItem
                  key={config.key}
                  id={config.key}
                  title={config.title}
                  checked={tempVisibility[config.key]}
                  onChange={(checked) => onVisibilityChange(config.key, checked)}
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
      <div />
    </Popover>
  );
}; 