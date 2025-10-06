export enum CustomerType {
    RumahTangga = 'rumah_tangga',
    UsahaMikro = 'usaha_mikro',
}

export interface Transaction {
    id: string;
    date: string; // ISO date string
}

export interface Customer {
    name: string;
    nik: string;
    type: CustomerType;
    notes: string;
    createdAt: string;
    transactions?: Transaction[];
}

export type FilterType = CustomerType | 'all';
export type SortOrder = 'newest' | 'name-az' | 'type';

export interface Settings {
    weekStartsOn: number; // 0 for Sunday, 1 for Monday, etc.
    baseQuota: number;
}
