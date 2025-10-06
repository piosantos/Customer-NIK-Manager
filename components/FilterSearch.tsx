
import React, { RefObject } from 'react';
import { CustomerType, FilterType, SortOrder } from '../types';

interface FilterSearchProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    filterType: FilterType;
    onFilterChange: (value: FilterType) => void;
    sortOrder: SortOrder;
    onSortChange: (value: SortOrder) => void;
    searchInputRef: RefObject<HTMLInputElement>;
}

const FilterSearch: React.FC<FilterSearchProps> = ({ searchTerm, onSearchChange, filterType, onFilterChange, sortOrder, onSortChange, searchInputRef }) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-md mb-6">
            <div className="flex flex-col md:flex-row gap-3">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Cari nama atau NIK... (Ctrl+F)"
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    ref={searchInputRef}
                />
                <div className="flex gap-3">
                    <select
                        value={filterType}
                        onChange={(e) => onFilterChange(e.target.value as FilterType)}
                        className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                        <option value="all">Semua Jenis</option>
                        <option value={CustomerType.RumahTangga}>Rumah Tangga</option>
                        <option value={CustomerType.UsahaMikro}>Usaha Mikro</option>
                    </select>
                     <select
                        value={sortOrder}
                        onChange={(e) => onSortChange(e.target.value as SortOrder)}
                        className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        aria-label="Urutkan"
                    >
                        <option value="newest">Urutkan: Terbaru</option>
                        <option value="name-az">Urutkan: Nama (A-Z)</option>
                        <option value="type">Urutkan: Jenis</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterSearch;
