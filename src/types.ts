export interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

export interface ColumnVisibility {
  name: boolean;
  age: boolean;
  address: boolean;
}

export interface ColumnConfig {
  key: keyof ColumnVisibility;
  title: string;
  dataIndex: keyof DataType;
  sorter: (a: DataType, b: DataType) => number;
}

export type ColumnKey = keyof ColumnVisibility;

export interface StorageKeys {
  visibility: string;
  order: string;
}

export interface TableSettings {
  visibility: ColumnVisibility;
  order: ColumnKey[];
}

export interface SortableItemProps {
  id: ColumnKey;
  title: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
} 