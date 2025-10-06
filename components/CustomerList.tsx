import React from 'react';
import { Customer, Settings } from '../types';
import CustomerItem from './CustomerItem';

interface CustomerListProps {
    customers: Customer[];
    onDelete: (nik: string) => void;
    onCopy: (nik: string) => void;
    onEdit: (nik: string) => void;
    onLogTransaction: (nik: string) => void;
    onTransaction: (nik: string) => void;
    onOpenHistory: (nik: string) => void;
    settings: Settings;
    totalTransactionsThisWeek: number;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, onDelete, onCopy, onEdit, onLogTransaction, onTransaction, onOpenHistory, settings, totalTransactionsThisWeek }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Daftar Pelanggan</h2>
            {customers.length === 0 ? (
                <p className="text-center text-gray-500">Belum ada pelanggan. Silakan tambahkan pelanggan baru.</p>
            ) : (
                <div className="space-y-4">
                    {customers.map((customer) => (
                        <CustomerItem
                            key={customer.nik}
                            customer={customer}
                            onDelete={onDelete}
                            onCopy={onCopy}
                            onEdit={onEdit}
                            onLogTransaction={onLogTransaction}
                            onTransaction={onTransaction}
                            onOpenHistory={onOpenHistory}
                            settings={settings}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomerList;