export interface User {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
  createTime: string;
  email?: string;
  phone?: string;
  status: 'active' | 'inactive';
}

export interface SearchFormValues {
  searchText?: string;
  tags?: string[];
  dateRange?: [string, string];
  status?: string;
}

export interface FormValues {
  username: string;
  age?: number;
  address?: string;
  tags?: string[];
  email?: string;
  phone?: string;
  status?: 'active' | 'inactive';
}

export interface SettingItem {
  label: string;
  value: string;
}

export interface SettingGroup {
  title: string;
  items: SettingItem[];
} 