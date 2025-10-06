import React from 'react';
import { Customer } from '../types';
import { TrashIcon } from './icons/ActionIcons';

interface TransactionHistoryModalProps {
    customer: Customer;
    onClose: () => void;
    onUndoTransaction: (nik: string, transactionId: string) => void;
}

const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const TransactionHistoryModal: React.FC<TransactionHistoryModalProps> = ({ customer, onClose, onUndoTransaction }) => {
    const sortedTransactions = [...(customer.transactions || [])].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="flex-shrink-0">
                    <h2 className="text-xl font-semibold text-gray-800">Riwayat Transaksi</h2>
                    <p className="text-gray-600 mb-4">{customer.name}</p>
                </div>

                <div className="flex-grow overflow-y-auto pr-2">
                    {sortedTransactions.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">Belum ada riwayat transaksi.</p>
                    ) : (
                        <ul className="space-y-3">
                            {sortedTransactions.map(tx => (
                                <li key={tx.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-700">{formatDate(tx.date)}</p>
                                    <button
                                        onClick={() => onUndoTransaction(customer.nik, tx.id)}
                                        className="flex items-center gap-1.5 text-xs text-red-600 bg-red-100 hover:bg-red-200 px-2 py-1 rounded-md transition"
                                        title="Batalkan Transaksi"
                                    >
                                        <TrashIcon />
                                        Batalkan
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="mt-6 flex justify-end flex-shrink-0">
                    <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition">
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionHistoryModal;