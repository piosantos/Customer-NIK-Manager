import React, { useMemo } from 'react';
import { Customer, CustomerType, Settings } from '../types';

interface StatsDashboardProps {
    customers: Customer[];
    settings: Settings;
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

const StatsDashboard: React.FC<StatsDashboardProps> = ({ customers, settings }) => {
    const stats = useMemo(() => {
        const totalCustomers = customers.length;
        const rumahTangga = customers.filter(c => c.type === CustomerType.RumahTangga).length;
        const usahaMikro = totalCustomers - rumahTangga;
        
        const startOfWeek = getStartOfWeek(settings.weekStartsOn);
        const transactionsThisWeek = customers.reduce((acc, customer) => {
            const weeklyTransactions = (customer.transactions || []).filter(t => new Date(t.date) >= startOfWeek);
            return acc + weeklyTransactions.length;
        }, 0);

        return { totalCustomers, rumahTangga, usahaMikro, transactionsThisWeek };
    }, [customers, settings]);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <p className="text-2xl font-bold text-gray-800">{stats.totalCustomers}</p>
                <p className="text-xs text-gray-600">Total Pelanggan</p>
            </div>
             <div className="bg-orange-50 p-4 rounded-lg shadow-md text-center">
                <p className="text-2xl font-bold text-orange-700">
                    {stats.transactionsThisWeek}
                    <span className="text-lg text-gray-500 font-medium">/{settings.baseQuota}</span>
                </p>
                <p className="text-xs text-gray-600">Transaksi / Kuota Pangkalan</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg shadow-md text-center">
                <p className="text-2xl font-bold text-green-700">{stats.rumahTangga}</p>
                <p className="text-xs text-gray-600">Rumah Tangga</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg shadow-md text-center">
                <p className="text-2xl font-bold text-blue-700">{stats.usahaMikro}</p>
                <p className="text-xs text-gray-600">Usaha Mikro</p>
            </div>
        </div>
    );
};

export default StatsDashboard;