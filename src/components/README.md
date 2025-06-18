# ColumnSettings Component

Переиспользуемый компонент для настройки видимости и порядка колонок в таблицах Ant Design.

## Особенности

- ✅ Drag & Drop для изменения порядка колонок
- ✅ Переключение видимости колонок
- ✅ Настраиваемый минимальный количество видимых колонок
- ✅ Кастомизируемые тексты и стили
- ✅ TypeScript поддержка
- ✅ Полная типизация

## Использование

### Базовое использование

```tsx
import { ColumnSettings, type ColumnConfig } from './components/ColumnSettings';

interface MyData {
  id: number;
  name: string;
  email: string;
}

const columns: ColumnConfig<MyData>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id' },
  { key: 'name', title: 'Имя', dataIndex: 'name' },
  { key: 'email', title: 'Email', dataIndex: 'email' },
];

const [visibility, setVisibility] = useState({
  id: true,
  name: true,
  email: true,
});

const [columnOrder, setColumnOrder] = useState(['id', 'name', 'email']);

<ColumnSettings
  columns={columns}
  visibility={visibility}
  columnOrder={columnOrder}
  onVisibilityChange={setVisibility}
  onColumnOrderChange={setColumnOrder}
  open={popoverOpen}
  onOpenChange={setPopoverOpen}
  trigger={<Button>Настройки</Button>}
/>
```

### Расширенное использование

```tsx
<ColumnSettings
  columns={columns}
  visibility={visibility}
  columnOrder={columnOrder}
  onVisibilityChange={handleVisibilityChange}
  onColumnOrderChange={handleColumnOrderChange}
  onCancel={handleCancel}
  open={popoverOpen}
  onOpenChange={setPopoverOpen}
  title="Настройка колонок"
  cancelText="Сбросить"
  minVisibleColumns={2}
  className="custom-popover"
  style={{ width: 300 }}
  trigger={
    <Button icon={<SettingOutlined />}>
      Настройки колонок
    </Button>
  }
/>
```

## Props

| Prop | Тип | Обязательный | Описание |
|------|-----|--------------|----------|
| `columns` | `ColumnConfig<T>[]` | ✅ | Конфигурация колонок |
| `visibility` | `Record<string, boolean>` | ✅ | Состояние видимости колонок |
| `columnOrder` | `string[]` | ✅ | Порядок колонок |
| `onVisibilityChange` | `(key: string, checked: boolean) => void` | ✅ | Обработчик изменения видимости |
| `onColumnOrderChange` | `(order: string[]) => void` | ✅ | Обработчик изменения порядка |
| `open` | `boolean` | ✅ | Состояние открытия popover |
| `onOpenChange` | `(open: boolean) => void` | ✅ | Обработчик изменения состояния |
| `trigger` | `React.ReactNode` | ❌ | Элемент-триггер |
| `onCancel` | `() => void` | ❌ | Обработчик отмены изменений |
| `title` | `string` | ❌ | Заголовок popover (по умолчанию: "Показать столбцы") |
| `cancelText` | `string` | ❌ | Текст кнопки отмены (по умолчанию: "Отменить изменения") |
| `minVisibleColumns` | `number` | ❌ | Минимальное количество видимых колонок (по умолчанию: 1) |
| `className` | `string` | ❌ | CSS класс для popover |
| `style` | `React.CSSProperties` | ❌ | Инлайн стили для popover |

## Типы

### ColumnConfig<T>

```tsx
interface ColumnConfig<T = any> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  sorter?: boolean;
  [key: string]: any;
}
```

### ColumnVisibility

```tsx
interface ColumnVisibility {
  [key: string]: boolean;
}
```

## Примеры интеграции

### С Ant Design Table

```tsx
const tableColumns = columnOrder
  .filter(key => visibility[key])
  .map(key => {
    const config = columns.find(col => col.key === key);
    return {
      title: config?.title,
      dataIndex: config?.dataIndex,
      key: config?.key,
    };
  });

<Table columns={tableColumns} dataSource={data} />
```

### С сохранением в localStorage

```tsx
const [visibility, setVisibility] = useState(() => {
  const saved = localStorage.getItem('table-visibility');
  return saved ? JSON.parse(saved) : defaultVisibility;
});

const [columnOrder, setColumnOrder] = useState(() => {
  const saved = localStorage.getItem('table-order');
  return saved ? JSON.parse(saved) : defaultOrder;
});

useEffect(() => {
  localStorage.setItem('table-visibility', JSON.stringify(visibility));
}, [visibility]);

useEffect(() => {
  localStorage.setItem('table-order', JSON.stringify(columnOrder));
}, [columnOrder]);
```

## Требования

- React 16.8+
- Ant Design 5+
- @dnd-kit/core
- @dnd-kit/sortable
- @dnd-kit/utilities

## Установка зависимостей

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
``` 