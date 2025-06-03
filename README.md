# React Ant Design Table with Column Settings

Компонент таблицы на основе Ant Design с расширенными возможностями управления колонками. Позволяет пользователям настраивать видимость и порядок колонок с помощью удобного интерфейса.

## Особенности

- Управление видимостью колонок
- Drag-and-drop для изменения порядка колонок
- Сохранение настроек в localStorage
- Возможность отмены изменений
- Адаптивный дизайн
- Типизация с помощью TypeScript

## Технологии

- React
- TypeScript
- Ant Design
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
  key: string;
  title: string;
  dataIndex: string;
  sorter?: boolean;
}
```

### Сохранение настроек

Настройки колонок (видимость и порядок) автоматически сохраняются в localStorage и восстанавливаются при перезагрузке страницы.

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

## Разработка

### Требования

- Node.js >= 14
- npm >= 6

### Скрипты

- `npm run dev` - Запуск проекта в режиме разработки
- `npm run build` - Сборка проекта
- `npm test` - Запуск тестов
- `npm lint` - Проверка кода линтером

## Лицензия

MIT

## Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функциональности (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add some amazing feature'`)
4. Отправьте изменения в репозиторий (`git push origin feature/amazing-feature`)
5. Откройте Pull Request
