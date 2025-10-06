import React from 'react';
import { Customer, CustomerType, Settings } from '../types';
import { CopyIcon, TrashIcon, EditIcon, CheckCircleIcon, TransactionIcon, HistoryIcon } from './icons/ActionIcons';

interface CustomerItemProps {
    customer: Customer;
    settings: Settings;
    onDelete: (nik: string) => void;
    onCopy: (nik: string) => void;
    onEdit: (nik: string) => void;
    onLogTransaction: (nik: string) => void;
    onTransaction: (nik: string) => void;
    onOpenHistory: (nik: string) => void;
}

const getStartOfWeek = (weekStartsOn: number): Date => {
    const today = new Date();
    const day = today.getDay(); // Sunday is 0
    let diff = day - weekStartsOn;
    if (diff < 0) {
        diff += 7;
    }
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - diff);
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
};

const CustomerItem: React.FC<CustomerItemProps> = ({ customer, settings, onDelete, onCopy, onEdit, onLogTransaction, onTransaction, onOpenHistory }) => {
    const { name, nik, type, notes, transactions = [] } = customer;
    
    const quotaType = type === CustomerType.RumahTangga ? 'Rumah Tangga' : 'Usaha Mikro';
    const badgeClass = type === CustomerType.RumahTangga ? 'badge-rumah-tangga' : 'badge-usaha-mikro';
    const formattedNik = nik.replace(/(\d{6})(\d{6})(\d{4})/, '$1-$2-$3');

    const startOfWeek = getStartOfWeek(settings.weekStartsOn);
    const transactionsThisWeek = transactions.filter(t => new Date(t.date) >= startOfWeek);
    
    const individualQuota = type === CustomerType.UsahaMikro ? 2 : 1;
    const isIndividualQuotaMet = transactionsThisWeek.length >= individualQuota;
    
    // Usaha Mikro can be partially met if they bought 1 of 2
    const isPartiallyMet = type === CustomerType.UsahaMikro && transactionsThisWeek.length === 1;

    const itemBgClass = isIndividualQuotaMet ? 'bg-green-100 border-green-200' : isPartiallyMet ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200';

    return (
        <div className={`list-item p-4 rounded-lg border hover:shadow-md transition-shadow ${itemBgClass}`}>
            <div className="flex items-start justify-between">
                <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                        <p className="font-semibold text-gray-800">{name}</p>
                        <span className={`${badgeClass} text-white text-xs px-2 py-1 rounded-full`}>{quotaType}</span>
                    </div>
                    <p className="text-sm text-gray-600 font-mono">{formattedNik}</p>
                    {notes && <p className="text-xs text-gray-500 mt-2 whitespace-pre-wrap">📝 {notes}</p>}
                     <div className="mt-3 bg-white/60 rounded-md p-3 text-sm">
                        <div className="flex items-center justify-between">
                             <p className="font-semibold text-gray-700">
                                Pembelian Minggu Ini: 
                                <span className={`font-bold ${isIndividualQuotaMet ? 'text-green-600' : 'text-gray-800'}`}>
                                    {` ${transactionsThisWeek.length}/${individualQuota}`}
                                </span>
                            </p>
                            <button
                                onClick={() => onOpenHistory(nik)}
                                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                                title="Lihat riwayat transaksi"
                            >
                                <HistoryIcon />
                                <span>Riwayat ({transactions.length})</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end space-y-2 ml-4">
                     <button onClick={() => onLogTransaction(nik)} disabled={isIndividualQuotaMet} className="w-full flex items-center justify-center gap-2 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition disabled:bg-gray-400 disabled:cursor-not-allowed" title="Catat Pembelian">
                        <CheckCircleIcon />
                        <span className="text-xs font-bold">Beli</span>
                    </button>
                    <div className="flex items-center space-x-2">
                         <button onClick={() => onTransaction(nik)} className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition" title="Mulai Transaksi di Web">
                            <TransactionIcon />
                        </button>
                        <button onClick={() => onEdit(nik)} className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition" title="Edit Pelanggan">
                            <EditIcon />
                        </button>
                        <button onClick={() => onCopy(nik)} className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" title="Salin NIK">
                            <CopyIcon />
                        </button>
                        <button onClick={() => onDelete(nik)} className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition" title="Hapus Pelanggan">
                           <TrashIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerItem;