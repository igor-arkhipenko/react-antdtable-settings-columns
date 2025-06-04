# React Ant Design Table with Column Settings

Компонент таблицы на основе Ant Design с расширенными возможностями управления колонками. Позволяет пользователям настраивать видимость и порядок колонок с помощью удобного интерфейса.

## Особенности

- Управление видимостью колонок с защитой от скрытия всех колонок
- Drag-and-drop для изменения порядка колонок
- Сохранение настроек в localStorage
- Возможность отмены изменений
- Адаптивный дизайн
- Строгая типизация с TypeScript
- Обработка ошибок с уведомлениями пользователя

## Технологии

- React 19
- TypeScript
- Ant Design 5
- @dnd-kit (для drag-and-drop функциональности)
- CSS Modules

## Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/yourusername/react-antdtable-settings-columns.git
cd react-antdtable-settings-columns
```

2. Установите зависимости:
```bash
npm install
```

## Разработка

Для старта dev-сервера запустите команду:

```bash
npm run dev
```

## Использование

```tsx
import { TableComponent } from './components/TableComponent';

function App() {
  return (
    <div>
      <TableComponent />
    </div>
  );
}
```

### Настройка колонок

Компонент поддерживает следующие настройки для каждой колонки:

```typescript
interface ColumnConfig {
  key: keyof ColumnVisibility;
  title: string;
  dataIndex: keyof DataType;
  sorter: (a: DataType, b: DataType) => number;
}
```

### Сохранение настроек

Настройки колонок (видимость и порядок) автоматически сохраняются в localStorage и восстанавливаются при перезагрузке страницы. Ключи хранилища:

```typescript
const STORAGE_KEYS = {
  visibility: 'table-columns-visibility',
  order: 'table-columns-order',
} as const;
```

### Типы данных

```typescript
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

interface ColumnVisibility {
  name: boolean;
  age: boolean;
  address: boolean;
}

interface TableSettings {
  visibility: ColumnVisibility;
  order: ColumnKey[];
}
```

## Структура проекта

```
src/
├── components/
│   ├── ColumnSettings.tsx      # Компонент настроек колонок
│   └── ColumnSettings.module.css # Стили для настроек колонок
├── TableComponent.tsx          # Основной компонент таблицы
├── types.ts                    # TypeScript типы
└── constants.ts               # Константы и конфигурация
```

## Особенности реализации

### Защита от скрытия всех колонок

Компонент предотвращает скрытие последней видимой колонки:
- Чекбокс последней видимой колонки становится неактивным
- Программное изменение состояния также блокируется
- Пользователь всегда имеет доступ к настройкам таблицы

### Обработка ошибок

- Ошибки при работе с localStorage обрабатываются и отображаются пользователю
- При ошибке загрузки настроек используются значения по умолчанию
- Все операции с хранилищем обёрнуты в try-catch

### Оптимизация производительности

- Использование useCallback для обработчиков событий
- Оптимизированное обновление состояния
- Эффективное управление перерисовками

## Требования

- Node.js >= 14
- npm >= 6

## Скрипты

- `npm run dev` - Запуск проекта в режиме разработки
- `npm run build` - Сборка проекта
- `npm run lint` - Проверка кода линтером

## Лицензия

MIT

## Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функциональности (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add some amazing feature'`)
4. Отправьте изменения в репозиторий (`git push origin feature/amazing-feature`)
5. Откройте Pull Request
