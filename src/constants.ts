import type { ColumnConfig } from './types';

export const STORAGE_KEY = 'table-columns-visibility';

export const DEFAULT_VISIBILITY = {
  name: true,
  age: true,
  address: true,
};

export const COLUMN_CONFIGS: ColumnConfig[] = [
  {
    key: 'name',
    title: 'Имя',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    key: 'age',
    title: 'Возраст',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    key: 'address',
    title: 'Адрес',
    dataIndex: 'address',
    sorter: (a, b) => a.address.localeCompare(b.address),
  },
];

export const TABLE_DATA = [
  {
    key: '1',
    name: 'Иван Петров',
    age: 32,
    address: 'Москва, ул. Ленина 1',
  },
  {
    key: '2',
    name: 'Алексей Сидоров',
    age: 42,
    address: 'Санкт-Петербург, Невский пр. 10',
  },
  {
    key: '3',
    name: 'Мария Иванова',
    age: 28,
    address: 'Казань, ул. Баумана 5',
  },
]; 