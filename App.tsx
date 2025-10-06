import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Customer, CustomerType, FilterType, Settings, Transaction, SortOrder } from './types';
import Header from './components/Header';
import StatsDashboard from './components/StatsDashboard';
import AddCustomerForm from './components/AddCustomerForm';
import FilterSearch from './components/FilterSearch';
import CustomerList from './components/CustomerList';
import ImportExport from './components/ImportExport';
import Footer from './components/Footer';
import Toast from './components/Toast';
import SettingsComponent from './components/Settings';
import EditCustomerModal from './components/EditCustomerModal';
import TransactionHistoryModal from './components/TransactionHistoryModal';

const DEFAULT_SETTINGS: Settings = {
    weekStartsOn: 1, // Monday
    baseQuota: 200,
};

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

const App: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<FilterType>('all');
    const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
    const [toast, setToast] = useState<{ message: string; key: number }>({ message: '', key: 0 });
    const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
    const [viewingHistoryCustomer, setViewingHistoryCustomer] = useState<Customer | null>(null);

    const searchInputRef = useRef<HTMLInputElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        try {
            const storedCustomers = localStorage.getItem('customers');
            if (storedCustomers) {
                const parsedCustomers: Customer[] = JSON.parse(storedCustomers);
                const customersWithTransactions = parsedCustomers.map(c => ({
                    ...c,
                    transactions: c.transactions || []
                }));
                setCustomers(customersWithTransactions);
            }
            const storedSettings = localStorage.getItem('settings');
            if (storedSettings) {
                let parsedSettings = JSON.parse(storedSettings);
                // Migration logic for settings
                if (parsedSettings.weeklyQuota) {
                    parsedSettings.baseQuota = parsedSettings.weeklyQuota;
                    delete parsedSettings.weeklyQuota;
                } else if (parsedSettings.quotaRumahTangga || parsedSettings.quotaUsahaMikro) {
                    parsedSettings.baseQuota = 200; // Default base quota for very old versions
                    delete parsedSettings.quotaRumahTangga;
                    delete parsedSettings.quotaUsahaMikro;
                }
                setSettings(s => ({...s, ...parsedSettings}));
            }
        } catch (error) {
            console.error("Failed to load data from localStorage", error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('customers', JSON.stringify(customers));
            localStorage.setItem('settings', JSON.stringify(settings));
        } catch (error)
 {
            console.error("Failed to save data to localStorage", error);
        }
    }, [customers, settings]);

    const showToast = useCallback((message: string) => {
        setToast({ message, key: Date.now() });
    }, []);

    const handleAddCustomer = (newCustomer: Omit<Customer, 'createdAt' | 'transactions'>) => {
        if (customers.some(c => c.nik === newCustomer.nik)) {
            showToast('⚠️ NIK ini sudah terdaftar!');
            return;
        }
        const customerWithDate: Customer = { 
            ...newCustomer, 
            createdAt: new Date().toISOString(),
            transactions: [] 
        };
        setCustomers(prev => [customerWithDate, ...prev]);
        showToast('✅ Pelanggan berhasil disimpan!');
    };

    const handleUpdateCustomer = (updatedCustomer: Customer) => {
        setCustomers(prev => prev.map(c => c.nik === updatedCustomer.nik ? updatedCustomer : c));
        setEditingCustomer(null);
        showToast('✅ Data pelanggan berhasil diperbarui!');
    };

    const handleDeleteCustomer = (nik: string) => {
        const customer = customers.find(c => c.nik === nik);
        if (customer && window.confirm(`Hapus pelanggan ${customer.name}?`)) {
            setCustomers(prev => prev.filter(c => c.nik !== nik));
            showToast('🗑️ Pelanggan berhasil dihapus');
        }
    };
    
    const handleCopyNik = (nik: string) => {
        navigator.clipboard.writeText(nik).then(() => {
            showToast('✅ NIK berhasil disalin!');
        }).catch(() => {
            showToast('❌ Gagal menyalin NIK');
        });
    };
    
    const handleLogTransaction = (nik: string) => {
        setCustomers(prev => prev.map(c => {
            if (c.nik === nik) {
                const newTransaction: Transaction = {
                    id: Date.now().toString(),
                    date: new Date().toISOString(),
                };
                return {
                    ...c,
                    transactions: [...(c.transactions || []), newTransaction]
                };
            }
            return c;
        }));
        showToast('✅ Pembelian berhasil dicatat!');
    };

    const handleUndoTransaction = (nik: string, transactionId: string) => {
        if (window.confirm('Anda yakin ingin membatalkan transaksi ini? Tindakan ini tidak dapat diurungkan.')) {
            setCustomers(prev => prev.map(c => {
                if (c.nik === nik) {
                    const updatedTransactions = (c.transactions || []).filter(t => t.id !== transactionId);
                    // Also update viewing history customer if it's the one being modified
                    if (viewingHistoryCustomer && viewingHistoryCustomer.nik === nik) {
                        setViewingHistoryCustomer({ ...c, transactions: updatedTransactions });
                    }
                    return {
                        ...c,
                        transactions: updatedTransactions
                    };
                }
                return c;
            }));
            showToast('↩️ Transaksi berhasil dibatalkan');
        }
    };
    
    const handleTransaction = (nik: string) => {
        navigator.clipboard.writeText(nik).then(() => {
            window.open('https://subsiditepatlpg.mypertamina.id/merchant/app/verification-nik', '_blank', 'noopener,noreferrer');
            showToast('✅ NIK disalin, membuka web transaksi...');
        }).catch(() => {
            showToast('❌ Gagal menyalin NIK');
        });
    };

    const handleOpenEditModal = (nik: string) => {
        const customerToEdit = customers.find(c => c.nik === nik);
        if (customerToEdit) {
            setEditingCustomer(customerToEdit);
        }
    };

    const handleOpenHistoryModal = (nik: string) => {
        const customerToView = customers.find(c => c.nik === nik);
        if (customerToView) {
            setViewingHistoryCustomer(customerToView);
        }
    };

    const handleImport = (importedCustomers: Customer[]) => {
        let addedCount = 0;
        let skippedCount = 0;
        const existingNiks = new Set(customers.map(c => c.nik));

        const newCustomers = [...customers];

        importedCustomers.forEach(importedCustomer => {
            if (!existingNiks.has(importedCustomer.nik)) {
                // Ensure imported customers have a transaction array
                const customerToadd: Customer = { ...importedCustomer, transactions: importedCustomer.transactions || [] };
                newCustomers.push(customerToadd);
                existingNiks.add(customerToadd.nik);
                addedCount++;
            } else {
                skippedCount++;
            }
        });
        
        setCustomers(newCustomers);
        showToast(`✅ ${addedCount} di-import, ${skippedCount} dilewati.`);
    };

    const filteredAndSortedCustomers = useMemo(() => {
        const filtered = customers.filter(c =>
            (c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.nik.includes(searchTerm)) &&
            (filterType === 'all' || c.type === filterType)
        );

        switch (sortOrder) {
            case 'name-az':
                return filtered.sort((a, b) => a.name.localeCompare(b.name));
            case 'type':
                return filtered.sort((a, b) => {
                    if (a.type === b.type) {
                        return a.name.localeCompare(b.name); // Secondary sort by name
                    }
                    return a.type === CustomerType.RumahTangga ? -1 : 1;
                });
            case 'newest':
            default:
                return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
    }, [customers, searchTerm, filterType, sortOrder]);
    
     useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey || e.metaKey) {
                if (e.key === 'f' || e.key === 'k') {
                    e.preventDefault();
                    searchInputRef.current?.focus();
                } else if (e.key === 'n') {
                    e.preventDefault();
                    nameInputRef.current?.focus();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const totalTransactionsThisWeek = useMemo(() => {
        const startOfWeek = getStartOfWeek(settings.weekStartsOn);
        return customers.reduce((acc, customer) => {
            const weeklyTransactions = (customer.transactions || []).filter(t => new Date(t.date) >= startOfWeek);
            return acc + weeklyTransactions.length;
        }, 0);
    }, [customers, settings.weekStartsOn]);


    return (
        <div className="container mx-auto max-w-2xl p-4 min-h-screen">
            <Header />
            <StatsDashboard customers={customers} settings={settings} />
            <SettingsComponent settings={settings} onSettingsChange={setSettings} />
            <AddCustomerForm onAddCustomer={handleAddCustomer} nameInputRef={nameInputRef} />
            <FilterSearch
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                filterType={filterType}
                onFilterChange={setFilterType}
                sortOrder={sortOrder}
                onSortChange={setSortOrder}
                searchInputRef={searchInputRef}
            />
            <CustomerList
                customers={filteredAndSortedCustomers}
                onDelete={handleDeleteCustomer}
                onCopy={handleCopyNik}
                onEdit={handleOpenEditModal}
                onLogTransaction={handleLogTransaction}
                onTransaction={handleTransaction}
                onOpenHistory={handleOpenHistoryModal}
                settings={settings}
                totalTransactionsThisWeek={totalTransactionsThisWeek}
            />
            <ImportExport customers={customers} onImport={handleImport} showToast={showToast} />
            <Footer />
            <Toast message={toast.message} key={toast.key} />
            {editingCustomer && (
                <EditCustomerModal
                    customer={editingCustomer}
                    onSave={handleUpdateCustomer}
                    onClose={() => setEditingCustomer(null)}
                />
            )}
            {viewingHistoryCustomer && (
                <TransactionHistoryModal
                    customer={viewingHistoryCustomer}
                    onClose={() => setViewingHistoryCustomer(null)}
                    onUndoTransaction={handleUndoTransaction}
                />
            )}
        </div>
    );
};

export default App;