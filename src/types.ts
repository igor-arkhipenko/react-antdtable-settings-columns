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