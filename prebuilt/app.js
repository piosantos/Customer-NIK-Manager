
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// --- Transpiled from types.ts ---
const CustomerType = {
    RumahTangga: 'rumah_tangga',
    UsahaMikro: 'usaha_mikro',
};

// --- Transpiled from components/icons/ActionIcons.tsx ---
const CopyIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" }));
const TrashIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" }));
const EditIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" }));
const TransactionIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" }));
const CheckCircleIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }));
const HistoryIcon = () => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: "2" }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }));

// --- Transpiled from components/icons/CustomerTypeIcons.tsx ---
const HomeIcon = () => React.createElement("svg", { className: "w-6 h-6 text-green-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" }));
const StoreIcon = () => React.createElement("svg", { className: "w-6 h-6 text-blue-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }));

// --- Transpiled from components/Header.tsx ---
const Header = () => {
    return React.createElement("header", { className: "text-center my-6" },
        React.createElement("h1", { className: "text-3xl font-bold text-green-700" }, "Customer NIK Manager"),
        React.createElement("p", { className: "text-gray-600 mt-2" }, "LPG 3Kg Subsidi - Pertamina")
    );
};

// --- Transpiled from components/StatsDashboard.tsx ---
const StatsDashboard = ({ customers, settings }) => {
    const getStartOfWeek = (weekStartsOn) => {
        const today = new Date();
        const day = today.getDay();
        let diff = day - weekStartsOn;
        if (diff < 0) {
            diff += 7;
        }
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - diff);
        startOfWeek.setHours(0, 0, 0, 0);
        return startOfWeek;
    };

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

    return React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 mb-6" },
        React.createElement("div", { className: "bg-white p-4 rounded-lg shadow-md text-center" },
            React.createElement("p", { className: "text-2xl font-bold text-gray-800" }, stats.totalCustomers),
            React.createElement("p", { className: "text-xs text-gray-600" }, "Total Pelanggan")
        ),
        React.createElement("div", { className: "bg-orange-50 p-4 rounded-lg shadow-md text-center" },
            React.createElement("p", { className: "text-2xl font-bold text-orange-700" },
                stats.transactionsThisWeek,
                React.createElement("span", { className: "text-lg text-gray-500 font-medium" }, `/${settings.baseQuota}`)
            ),
            React.createElement("p", { className: "text-xs text-gray-600" }, "Transaksi / Kuota Pangkalan")
        ),
        React.createElement("div", { className: "bg-green-50 p-4 rounded-lg shadow-md text-center" },
            React.createElement("p", { className: "text-2xl font-bold text-green-700" }, stats.rumahTangga),
            React.createElement("p", { className: "text-xs text-gray-600" }, "Rumah Tangga")
        ),
        React.createElement("div", { className: "bg-blue-50 p-4 rounded-lg shadow-md text-center" },
            React.createElement("p", { className: "text-2xl font-bold text-blue-700" }, stats.usahaMikro),
            React.createElement("p", { className: "text-xs text-gray-600" }, "Usaha Mikro")
        )
    );
};

// --- Transpiled from components/AddCustomerForm.tsx ---
const AddCustomerForm = ({ onAddCustomer, nameInputRef }) => {
    const [name, setName] = useState('');
    const [nik, setNik] = useState('');
    const [type, setType] = useState(CustomerType.RumahTangga);
    const [notes, setNotes] = useState('');
    const [nikValidation, setNikValidation] = useState(null);

    const validateNIK = (nik) => {
        if (nik.length !== 16) return { valid: false, message: '❌ NIK harus 16 digit', color: 'text-red-600' };
        if (!/^\d+$/.test(nik)) return { valid: false, message: '❌ NIK hanya boleh angka', color: 'text-red-600' };
        const provinceCode = parseInt(nik.substring(0, 2));
        if (provinceCode < 11 || provinceCode > 94) return { valid: false, message: '⚠️ Kode provinsi tidak valid', color: 'text-orange-600' };
        let day = parseInt(nik.substring(6, 8));
        if (day > 40) day -= 40;
        const month = parseInt(nik.substring(8, 10));
        if (day < 1 || day > 31 || month < 1 || month > 12) return { valid: false, message: '⚠️ Tanggal lahir tidak valid', color: 'text-orange-600' };
        return { valid: true, message: '✅ Format NIK valid', color: 'text-green-600' };
    };

    const handleNikChange = (e) => {
        const newNik = e.target.value;
        setNik(newNik);
        if (newNik.length > 0) {
            const validation = validateNIK(newNik);
            setNikValidation({ message: validation.message, color: validation.color });
        } else {
            setNikValidation(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validation = validateNIK(nik);
        if (name.trim() && validation.valid) {
            onAddCustomer({ name: name.trim(), nik: nik.trim(), type, notes: notes.trim() });
            setName('');
            setNik('');
            setNotes('');
            setType(CustomerType.RumahTangga);
            setNikValidation(null);
            nameInputRef.current?.focus();
        } else {
            alert('Periksa kembali nama dan NIK!');
        }
    };

    return React.createElement("div", { className: "bg-white p-6 rounded-xl shadow-md mb-6" },
        React.createElement("h2", { className: "text-xl font-semibold mb-4 text-gray-800" }, "Tambah Pelanggan Baru"),
        React.createElement("form", { onSubmit: handleSubmit },
            React.createElement("div", { className: "mb-4" },
                React.createElement("label", { htmlFor: "customer-name", className: "block text-sm font-medium text-gray-700 mb-1" }, "Nama Pelanggan"),
                React.createElement("input", { type: "text", id: "customer-name", value: name, onChange: (e) => setName(e.target.value), placeholder: "contoh: Budi Santoso", required: true, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500", ref: nameInputRef })
            ),
            React.createElement("div", { className: "mb-4" },
                React.createElement("label", { htmlFor: "customer-nik", className: "block text-sm font-medium text-gray-700 mb-1" }, "NIK 16 Digit"),
                React.createElement("input", { type: "text", id: "customer-nik", value: nik, onChange: handleNikChange, inputMode: "numeric", pattern: "\\d{16}", maxLength: 16, title: "NIK harus 16 digit", placeholder: "Masukkan NIK 16 digit", required: true, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" }),
                nikValidation && React.createElement("p", { className: `text-xs mt-1 ${nikValidation.color}` }, nikValidation.message)
            ),
            React.createElement("div", { className: "mb-4" },
                React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "Jenis Pelanggan"),
                React.createElement("div", { className: "grid grid-cols-2 gap-3" },
                    React.createElement("label", { className: "relative flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-500 transition-colors" },
                        React.createElement("input", { type: "radio", name: "customer-type", value: CustomerType.RumahTangga, checked: type === CustomerType.RumahTangga, onChange: () => setType(CustomerType.RumahTangga), className: "sr-only peer" }),
                        React.createElement("div", { className: "peer-checked:border-green-500 peer-checked:bg-green-50 absolute inset-0 rounded-lg border-2 transition-all" }),
                        React.createElement("div", { className: "relative z-10 flex items-center w-full" },
                            React.createElement("div", { className: "flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3" }, React.createElement(HomeIcon)),
                            React.createElement("div", { className: "flex-grow" }, React.createElement("p", { className: "font-semibold text-gray-800 text-sm" }, "Rumah Tangga"), React.createElement("p", { className: "text-xs text-gray-600" }, "1 tabung/bulan"))
                        )
                    ),
                    React.createElement("label", { className: "relative flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors" },
                        React.createElement("input", { type: "radio", name: "customer-type", value: CustomerType.UsahaMikro, checked: type === CustomerType.UsahaMikro, onChange: () => setType(CustomerType.UsahaMikro), className: "sr-only peer" }),
                        React.createElement("div", { className: "peer-checked:border-blue-500 peer-checked:bg-blue-50 absolute inset-0 rounded-lg border-2 transition-all" }),
                        React.createElement("div", { className: "relative z-10 flex items-center w-full" },
                            React.createElement("div", { className: "flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3" }, React.createElement(StoreIcon)),
                            React.createElement("div", { className: "flex-grow" }, React.createElement("p", { className: "font-semibold text-gray-800 text-sm" }, "Usaha Mikro"), React.createElement("p", { className: "text-xs text-gray-600" }, "2 tabung/bulan"))
                        )
                    )
                )
            ),
            React.createElement("div", { className: "mb-4" },
                React.createElement("label", { htmlFor: "customer-notes", className: "block text-sm font-medium text-gray-700 mb-1" }, "Catatan (Opsional)"),
                React.createElement("textarea", { id: "customer-notes", value: notes, onChange: (e) => setNotes(e.target.value), rows: 2, placeholder: "Alamat, nomor HP, atau catatan lainnya...", className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" })
            ),
            React.createElement("button", { type: "submit", className: "w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300" }, "💾 Simpan Pelanggan")
        )
    );
};

// --- Transpiled from components/FilterSearch.tsx ---
const FilterSearch = ({ searchTerm, onSearchChange, filterType, onFilterChange, sortOrder, onSortChange, searchInputRef }) => {
    return React.createElement("div", { className: "bg-white p-4 rounded-xl shadow-md mb-6" },
        React.createElement("div", { className: "flex flex-col md:flex-row gap-3" },
            React.createElement("input", { type: "text", value: searchTerm, onChange: (e) => onSearchChange(e.target.value), placeholder: "Cari nama atau NIK... (Ctrl+F)", className: "flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500", ref: searchInputRef }),
            React.createElement("div", { className: "flex gap-3" },
                React.createElement("select", { value: filterType, onChange: (e) => onFilterChange(e.target.value), className: "w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" },
                    React.createElement("option", { value: "all" }, "Semua Jenis"),
                    React.createElement("option", { value: CustomerType.RumahTangga }, "Rumah Tangga"),
                    React.createElement("option", { value: CustomerType.UsahaMikro }, "Usaha Mikro")
                ),
                React.createElement("select", { value: sortOrder, onChange: (e) => onSortChange(e.target.value), className: "w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500", "aria-label": "Urutkan" },
                    React.createElement("option", { value: "newest" }, "Urutkan: Terbaru"),
                    React.createElement("option", { value: "name-az" }, "Urutkan: Nama (A-Z)"),
                    React.createElement("option", { value: "type" }, "Urutkan: Jenis")
                )
            )
        )
    );
};

// --- Transpiled from components/CustomerItem.tsx ---
const CustomerItem = ({ customer, settings, onDelete, onCopy, onEdit, onLogTransaction, onTransaction, onOpenHistory }) => {
    const { name, nik, type, notes, transactions = [] } = customer;

    const getStartOfWeek = (weekStartsOn) => {
        const today = new Date();
        const day = today.getDay();
        let diff = day - weekStartsOn;
        if (diff < 0) {
            diff += 7;
        }
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - diff);
        startOfWeek.setHours(0, 0, 0, 0);
        return startOfWeek;
    };

    const quotaType = type === CustomerType.RumahTangga ? 'Rumah Tangga' : 'Usaha Mikro';
    const badgeClass = type === CustomerType.RumahTangga ? 'badge-rumah-tangga' : 'badge-usaha-mikro';
    const formattedNik = nik.replace(/(\d{6})(\d{6})(\d{4})/, '$1-$2-$3');

    const startOfWeek = getStartOfWeek(settings.weekStartsOn);
    const transactionsThisWeek = transactions.filter(t => new Date(t.date) >= startOfWeek);
    
    const individualQuota = type === CustomerType.UsahaMikro ? 2 : 1;
    const isIndividualQuotaMet = transactionsThisWeek.length >= individualQuota;
    
    const isPartiallyMet = type === CustomerType.UsahaMikro && transactionsThisWeek.length === 1;

    const itemBgClass = isIndividualQuotaMet ? 'bg-green-100 border-green-200' : isPartiallyMet ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200';

    return React.createElement("div", { className: `list-item p-4 rounded-lg border hover:shadow-md transition-shadow ${itemBgClass}` },
        React.createElement("div", { className: "flex items-start justify-between" },
            React.createElement("div", { className: "flex-grow" },
                React.createElement("div", { className: "flex items-center gap-2 mb-2" },
                    React.createElement("p", { className: "font-semibold text-gray-800" }, name),
                    React.createElement("span", { className: `${badgeClass} text-white text-xs px-2 py-1 rounded-full` }, quotaType)
                ),
                React.createElement("p", { className: "text-sm text-gray-600 font-mono" }, formattedNik),
                notes && React.createElement("p", { className: "text-xs text-gray-500 mt-2 whitespace-pre-wrap" }, `📝 ${notes}`),
                React.createElement("div", { className: "mt-3 bg-white/60 rounded-md p-3 text-sm" },
                    React.createElement("div", { className: "flex items-center justify-between" },
                        React.createElement("p", { className: "font-semibold text-gray-700" },
                            "Pembelian Minggu Ini: ",
                            React.createElement("span", { className: `font-bold ${isIndividualQuotaMet ? 'text-green-600' : 'text-gray-800'}` }, ` ${transactionsThisWeek.length}/${individualQuota}`)
                        ),
                        React.createElement("button", { onClick: () => onOpenHistory(nik), className: "flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline transition-colors", title: "Lihat riwayat transaksi" },
                            React.createElement(HistoryIcon),
                            React.createElement("span", null, `Riwayat (${transactions.length})`)
                        )
                    )
                )
            ),
            React.createElement("div", { className: "flex flex-col items-end space-y-2 ml-4" },
                React.createElement("button", { onClick: () => onLogTransaction(nik), disabled: isIndividualQuotaMet, className: "w-full flex items-center justify-center gap-2 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition disabled:bg-gray-400 disabled:cursor-not-allowed", title: "Catat Pembelian" },
                    React.createElement(CheckCircleIcon),
                    React.createElement("span", { className: "text-xs font-bold" }, "Beli")
                ),
                React.createElement("div", { className: "flex items-center space-x-2" },
                    React.createElement("button", { onClick: () => onTransaction(nik), className: "bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition", title: "Mulai Transaksi di Web" }, React.createElement(TransactionIcon)),
                    React.createElement("button", { onClick: () => onEdit(nik), className: "bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition", title: "Edit Pelanggan" }, React.createElement(EditIcon)),
                    React.createElement("button", { onClick: () => onCopy(nik), className: "bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition", title: "Salin NIK" }, React.createElement(CopyIcon)),
                    React.createElement("button", { onClick: () => onDelete(nik), className: "bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition", title: "Hapus Pelanggan" }, React.createElement(TrashIcon))
                )
            )
        )
    );
};

// --- Transpiled from components/CustomerList.tsx ---
const CustomerList = ({ customers, onDelete, onCopy, onEdit, onLogTransaction, onTransaction, onOpenHistory, settings }) => {
    return React.createElement("div", { className: "bg-white p-6 rounded-xl shadow-md mb-6" },
        React.createElement("h2", { className: "text-xl font-semibold text-gray-800 mb-4" }, "Daftar Pelanggan"),
        customers.length === 0 ?
        React.createElement("p", { className: "text-center text-gray-500" }, "Belum ada pelanggan. Silakan tambahkan pelanggan baru.") :
        React.createElement("div", { className: "space-y-4" },
            customers.map((customer) =>
                React.createElement(CustomerItem, {
                    key: customer.nik,
                    customer: customer,
                    onDelete: onDelete,
                    onCopy: onCopy,
                    onEdit: onEdit,
                    onLogTransaction: onLogTransaction,
                    onTransaction: onTransaction,
                    onOpenHistory: onOpenHistory,
                    settings: settings
                })
            )
        )
    );
};

// --- Transpiled from components/ImportExport.tsx ---
const ImportExport = ({ customers, onImport, showToast }) => {
    const fileInputRef = useRef(null);
    const handleExport = () => {
        if (customers.length === 0) {
            showToast('⚠️ Tidak ada data untuk di-export');
            return;
        }
        const csvContent = [
            ['Nama', 'NIK', 'Jenis', 'Catatan', 'Tanggal Dibuat'].join(','),
            ...customers.map(c => [
                `"${c.name.replace(/"/g, '""')}"`,
                `'${c.nik}`,
                c.type,
                `"${(c.notes || '').replace(/"/g, '""')}"`,
                c.createdAt
            ].join(','))
        ].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `pelanggan_lpg_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('📥 Data berhasil di-export!');
    };
    const handleImportClick = () => fileInputRef.current?.click();
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const text = event.target?.result;
                const lines = text.split(/\r\n|\n/).slice(1);
                const importedCustomers = [];
                lines.forEach(line => {
                    if (!line.trim()) return;
                    const parts = line.split(',').map(s => s.trim().replace(/^"|"$/g, '').replace(/^'/, ''));
                    if (parts.length < 2) return;
                    const [name, nik, type, notes = '', createdAt = new Date().toISOString()] = parts;
                    if (name && nik && nik.length === 16 && /^\d+$/.test(nik)) {
                        const customerType = (type || '').toLowerCase().includes('mikro') ? CustomerType.UsahaMikro : CustomerType.RumahTangga;
                        importedCustomers.push({ name, nik, type: customerType, notes, createdAt, transactions: [] });
                    }
                });
                onImport(importedCustomers);
            } catch (err) {
                showToast('❌ Format file tidak valid.');
                console.error("Import Error:", err);
            }
        };
        reader.readAsText(file);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return React.createElement(React.Fragment, null,
        React.createElement("div", { className: "bg-white p-6 rounded-xl shadow-md mb-6" },
            React.createElement("button", { onClick: handleExport, className: "w-full text-sm bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition" }, "📥 Export Data")
        ),
        React.createElement("div", { className: "bg-white p-4 rounded-xl shadow-md mb-6" },
            React.createElement("h3", { className: "text-sm font-semibold text-gray-700 mb-2" }, "Import Data CSV"),
            React.createElement("input", { type: "file", ref: fileInputRef, onChange: handleFileChange, accept: ".csv", className: "hidden" }),
            React.createElement("button", { onClick: handleImportClick, className: "w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition text-sm" }, "📤 Import dari CSV"),
            React.createElement("p", { className: "text-xs text-gray-500 mt-2" }, "Format: Nama,NIK,Jenis (rumah_tangga/usaha_mikro),Catatan")
        )
    );
};

// --- Transpiled from components/Footer.tsx ---
const Footer = () => {
    return React.createElement("footer", { className: "text-center text-xs text-gray-500 mt-8 pb-4" },
        React.createElement("p", null,
            React.createElement("strong", null, "Privasi Terjamin:"), " Semua data tersimpan lokal di perangkat Anda dan tidak dikirim ke server manapun."
        )
    );
};

// --- Transpiled from components/Toast.tsx ---
const Toast = ({ message, key }) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => { setVisible(false); }, 2500);
            return () => clearTimeout(timer);
        }
    }, [message, key]);
    if (!message) return null;
    return React.createElement("div", { className: `fixed bottom-5 right-5 bg-gray-800 text-white py-3 px-5 rounded-lg shadow-lg transition-all duration-300 z-50 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}` },
        React.createElement("p", null, message)
    );
};

// --- Transpiled from components/Settings.tsx ---
const SettingsComponent = ({ settings, onSettingsChange }) => {
    const weekDays = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const handleWeekStartChange = (e) => onSettingsChange({ ...settings, weekStartsOn: parseInt(e.target.value) });
    const handleQuotaChange = (e) => onSettingsChange({ ...settings, baseQuota: parseInt(e.target.value) || 1 });

    return React.createElement("div", { className: "bg-white p-6 rounded-xl shadow-md mb-6" },
        React.createElement("h2", { className: "text-xl font-semibold mb-4 text-gray-800" }, "Pengaturan"),
        React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
            React.createElement("div", null,
                React.createElement("label", { htmlFor: "week-start", className: "block text-sm font-medium text-gray-700 mb-1" }, "Awal Minggu Dimulai"),
                React.createElement("select", { id: "week-start", value: settings.weekStartsOn, onChange: handleWeekStartChange, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" },
                    weekDays.map((day, index) => React.createElement("option", { key: index, value: index }, day))
                )
            ),
            React.createElement("div", null,
                React.createElement("label", { htmlFor: "quota-pangkalan", className: "block text-sm font-medium text-gray-700 mb-1" }, "Kuota Pangkalan"),
                React.createElement("input", { type: "number", id: "quota-pangkalan", min: "1", value: settings.baseQuota, onChange: handleQuotaChange, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" })
            )
        )
    );
};

// --- Transpiled from components/EditCustomerModal.tsx ---
const EditCustomerModal = ({ customer, onSave, onClose }) => {
    const [name, setName] = useState(customer.name);
    const [type, setType] = useState(customer.type);
    const [notes, setNotes] = useState(customer.notes);
    useEffect(() => {
        setName(customer.name);
        setType(customer.type);
        setNotes(customer.notes);
    }, [customer]);
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...customer, name: name.trim(), type, notes: notes.trim() });
    };
    return React.createElement("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", onClick: onClose },
        React.createElement("div", { className: "bg-white p-6 rounded-xl shadow-lg w-full max-w-md", onClick: (e) => e.stopPropagation() },
            React.createElement("h2", { className: "text-xl font-semibold mb-4 text-gray-800" }, "Edit Pelanggan"),
            React.createElement("form", { onSubmit: handleSubmit },
                React.createElement("div", { className: "mb-4" },
                    React.createElement("label", { htmlFor: "edit-customer-name", className: "block text-sm font-medium text-gray-700 mb-1" }, "Nama Pelanggan"),
                    React.createElement("input", { type: "text", id: "edit-customer-name", value: name, onChange: (e) => setName(e.target.value), required: true, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" })
                ),
                React.createElement("div", { className: "mb-4" },
                    React.createElement("label", { htmlFor: "edit-customer-nik", className: "block text-sm font-medium text-gray-700 mb-1" }, "NIK (Tidak dapat diubah)"),
                    React.createElement("input", { type: "text", id: "edit-customer-nik", value: customer.nik, disabled: true, className: "w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" })
                ),
                React.createElement("div", { className: "mb-4" },
                     React.createElement("label", { className: "block text-sm font-medium text-gray-700 mb-2" }, "Jenis Pelanggan"),
                     React.createElement("div", { className: "grid grid-cols-2 gap-3" },
                        React.createElement("label", { className: "relative flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-500 transition-colors" },
                           React.createElement("input", { type: "radio", name: "edit-customer-type", value: CustomerType.RumahTangga, checked: type === CustomerType.RumahTangga, onChange: () => setType(CustomerType.RumahTangga), className: "sr-only peer" }),
                           React.createElement("div", { className: "peer-checked:border-green-500 peer-checked:bg-green-50 absolute inset-0 rounded-lg border-2 transition-all" }),
                           React.createElement("div", { className: "relative z-10 flex items-center w-full" },
                               React.createElement("div", { className: "flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3" }, React.createElement(HomeIcon)),
                               React.createElement("div", { className: "flex-grow" }, React.createElement("p", { className: "font-semibold text-gray-800 text-sm" }, "Rumah Tangga"))
                           )
                        ),
                        React.createElement("label", { className: "relative flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors" },
                            React.createElement("input", { type: "radio", name: "edit-customer-type", value: CustomerType.UsahaMikro, checked: type === CustomerType.UsahaMikro, onChange: () => setType(CustomerType.UsahaMikro), className: "sr-only peer" }),
                            React.createElement("div", { className: "peer-checked:border-blue-500 peer-checked:bg-blue-50 absolute inset-0 rounded-lg border-2 transition-all" }),
                            React.createElement("div", { className: "relative z-10 flex items-center w-full" },
                                React.createElement("div", { className: "flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3" }, React.createElement(StoreIcon)),
                                React.createElement("div", { className: "flex-grow" }, React.createElement("p", { className: "font-semibold text-gray-800 text-sm" }, "Usaha Mikro"))
                            )
                        )
                     )
                ),
                 React.createElement("div", { className: "mb-6" },
                    React.createElement("label", { htmlFor: "edit-customer-notes", className: "block text-sm font-medium text-gray-700 mb-1" }, "Catatan"),
                    React.createElement("textarea", { id: "edit-customer-notes", value: notes, onChange: (e) => setNotes(e.target.value), rows: 3, className: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" })
                ),
                React.createElement("div", { className: "flex justify-end gap-3" },
                    React.createElement("button", { type: "button", onClick: onClose, className: "bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition" }, "Batal"),
                    React.createElement("button", { type: "submit", className: "bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition" }, "Simpan Perubahan")
                )
            )
        )
    );
};

// --- Transpiled from components/TransactionHistoryModal.tsx ---
const TransactionHistoryModal = ({ customer, onClose, onUndoTransaction }) => {
    const formatDate = (isoString) => new Date(isoString).toLocaleString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    const sortedTransactions = [...(customer.transactions || [])].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return React.createElement("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4", onClick: onClose },
        React.createElement("div", { className: "bg-white p-6 rounded-xl shadow-lg w-full max-w-lg max-h-[80vh] flex flex-col", onClick: (e) => e.stopPropagation() },
            React.createElement("div", { className: "flex-shrink-0" },
                React.createElement("h2", { className: "text-xl font-semibold text-gray-800" }, "Riwayat Transaksi"),
                React.createElement("p", { className: "text-gray-600 mb-4" }, customer.name)
            ),
            React.createElement("div", { className: "flex-grow overflow-y-auto pr-2" },
                sortedTransactions.length === 0 ?
                React.createElement("p", { className: "text-center text-gray-500 py-8" }, "Belum ada riwayat transaksi.") :
                React.createElement("ul", { className: "space-y-3" },
                    sortedTransactions.map(tx =>
                        React.createElement("li", { key: tx.id, className: "flex items-center justify-between bg-gray-50 p-3 rounded-lg" },
                            React.createElement("p", { className: "text-sm text-gray-700" }, formatDate(tx.date)),
                            React.createElement("button", { onClick: () => onUndoTransaction(customer.nik, tx.id), className: "flex items-center gap-1.5 text-xs text-red-600 bg-red-100 hover:bg-red-200 px-2 py-1 rounded-md transition", title: "Batalkan Transaksi" },
                                React.createElement(TrashIcon), "Batalkan"
                            )
                        )
                    )
                )
            ),
            React.createElement("div", { className: "mt-6 flex justify-end flex-shrink-0" },
                React.createElement("button", { type: "button", onClick: onClose, className: "bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition" }, "Tutup")
            )
        )
    );
};


// --- Transpiled from App.tsx ---
const App = () => {
    const DEFAULT_SETTINGS = { weekStartsOn: 1, baseQuota: 200 };
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [sortOrder, setSortOrder] = useState('newest');
    const [toast, setToast] = useState({ message: '', key: 0 });
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [viewingHistoryCustomer, setViewingHistoryCustomer] = useState(null);
    const searchInputRef = useRef(null);
    const nameInputRef = useRef(null);

    const getStartOfWeek = (weekStartsOn) => {
        const today = new Date();
        const day = today.getDay();
        let diff = day - weekStartsOn;
        if (diff < 0) diff += 7;
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - diff);
        startOfWeek.setHours(0, 0, 0, 0);
        return startOfWeek;
    };

    useEffect(() => {
        try {
            const storedCustomers = localStorage.getItem('customers');
            if (storedCustomers) {
                const parsedCustomers = JSON.parse(storedCustomers);
                setCustomers(parsedCustomers.map(c => ({ ...c, transactions: c.transactions || [] })));
            }
            const storedSettings = localStorage.getItem('settings');
            if (storedSettings) {
                let parsedSettings = JSON.parse(storedSettings);
                if (parsedSettings.weeklyQuota) {
                    parsedSettings.baseQuota = parsedSettings.weeklyQuota;
                    delete parsedSettings.weeklyQuota;
                } else if (parsedSettings.quotaRumahTangga || parsedSettings.quotaUsahaMikro) {
                    parsedSettings.baseQuota = 200;
                    delete parsedSettings.quotaRumahTangga;
                    delete parsedSettings.quotaUsahaMikro;
                }
                setSettings(s => ({ ...s, ...parsedSettings }));
            }
        } catch (error) { console.error("Failed to load data from localStorage", error); }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('customers', JSON.stringify(customers));
            localStorage.setItem('settings', JSON.stringify(settings));
        } catch (error) { console.error("Failed to save data to localStorage", error); }
    }, [customers, settings]);

    const showToast = useCallback((message) => { setToast({ message, key: Date.now() }); }, []);

    const handleAddCustomer = (newCustomer) => {
        if (customers.some(c => c.nik === newCustomer.nik)) {
            showToast('⚠️ NIK ini sudah terdaftar!');
            return;
        }
        const customerWithDate = { ...newCustomer, createdAt: new Date().toISOString(), transactions: [] };
        setCustomers(prev => [customerWithDate, ...prev]);
        showToast('✅ Pelanggan berhasil disimpan!');
    };
    
    const handleUpdateCustomer = (updatedCustomer) => {
        setCustomers(prev => prev.map(c => c.nik === updatedCustomer.nik ? updatedCustomer : c));
        setEditingCustomer(null);
        showToast('✅ Data pelanggan berhasil diperbarui!');
    };

    const handleDeleteCustomer = (nik) => {
        const customer = customers.find(c => c.nik === nik);
        if (customer && window.confirm(`Hapus pelanggan ${customer.name}?`)) {
            setCustomers(prev => prev.filter(c => c.nik !== nik));
            showToast('🗑️ Pelanggan berhasil dihapus');
        }
    };
    
    const handleCopyNik = (nik) => {
        navigator.clipboard.writeText(nik).then(() => showToast('✅ NIK berhasil disalin!')).catch(() => showToast('❌ Gagal menyalin NIK'));
    };
    
    const handleLogTransaction = (nik) => {
        setCustomers(prev => prev.map(c => {
            if (c.nik === nik) {
                const newTransaction = { id: Date.now().toString(), date: new Date().toISOString() };
                return { ...c, transactions: [...(c.transactions || []), newTransaction] };
            }
            return c;
        }));
        showToast('✅ Pembelian berhasil dicatat!');
    };

    const handleUndoTransaction = (nik, transactionId) => {
        if (window.confirm('Anda yakin ingin membatalkan transaksi ini? Tindakan ini tidak dapat diurungkan.')) {
            setCustomers(prev => prev.map(c => {
                if (c.nik === nik) {
                    const updatedTransactions = (c.transactions || []).filter(t => t.id !== transactionId);
                    if (viewingHistoryCustomer && viewingHistoryCustomer.nik === nik) {
                        setViewingHistoryCustomer({ ...c, transactions: updatedTransactions });
                    }
                    return { ...c, transactions: updatedTransactions };
                }
                return c;
            }));
            showToast('↩️ Transaksi berhasil dibatalkan');
        }
    };

    const handleTransaction = (nik) => {
        navigator.clipboard.writeText(nik).then(() => {
            window.open('https://subsiditepatlpg.mypertamina.id/merchant/app/verification-nik', '_blank', 'noopener,noreferrer');
            showToast('✅ NIK disalin, membuka web transaksi...');
        }).catch(() => showToast('❌ Gagal menyalin NIK'));
    };

    const handleOpenEditModal = (nik) => {
        const customerToEdit = customers.find(c => c.nik === nik);
        if (customerToEdit) setEditingCustomer(customerToEdit);
    };

    const handleOpenHistoryModal = (nik) => {
        const customerToView = customers.find(c => c.nik === nik);
        if (customerToView) setViewingHistoryCustomer(customerToView);
    };

    const handleImport = (importedCustomers) => {
        let addedCount = 0, skippedCount = 0;
        const existingNiks = new Set(customers.map(c => c.nik));
        const newCustomers = [...customers];
        importedCustomers.forEach(importedCustomer => {
            if (!existingNiks.has(importedCustomer.nik)) {
                const customerToAdd = { ...importedCustomer, transactions: importedCustomer.transactions || [] };
                newCustomers.push(customerToAdd);
                existingNiks.add(customerToAdd.nik);
                addedCount++;
            } else { skippedCount++; }
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
            case 'name-az': return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
            case 'type': return [...filtered].sort((a, b) => a.type === b.type ? a.name.localeCompare(b.name) : a.type === CustomerType.RumahTangga ? -1 : 1);
            case 'newest':
            default: return [...filtered].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
    }, [customers, searchTerm, filterType, sortOrder]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey || e.metaKey) {
                if (e.key === 'f' || e.key === 'k') { e.preventDefault(); searchInputRef.current?.focus(); }
                else if (e.key === 'n') { e.preventDefault(); nameInputRef.current?.focus(); }
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const totalTransactionsThisWeek = useMemo(() => {
        const startOfWeek = getStartOfWeek(settings.weekStartsOn);
        return customers.reduce((acc, c) => acc + (c.transactions || []).filter(t => new Date(t.date) >= startOfWeek).length, 0);
    }, [customers, settings.weekStartsOn]);

    return React.createElement("div", { className: "container mx-auto max-w-2xl p-4 min-h-screen" },
        React.createElement(Header),
        React.createElement(StatsDashboard, { customers: customers, settings: settings }),
        React.createElement(SettingsComponent, { settings: settings, onSettingsChange: setSettings }),
        React.createElement(AddCustomerForm, { onAddCustomer: handleAddCustomer, nameInputRef: nameInputRef }),
        React.createElement(FilterSearch, { searchTerm: searchTerm, onSearchChange: setSearchTerm, filterType: filterType, onFilterChange: setFilterType, sortOrder: sortOrder, onSortChange: setSortOrder, searchInputRef: searchInputRef }),
        React.createElement(CustomerList, { customers: filteredAndSortedCustomers, onDelete: handleDeleteCustomer, onCopy: handleCopyNik, onEdit: handleOpenEditModal, onLogTransaction: handleLogTransaction, onTransaction: handleTransaction, onOpenHistory: handleOpenHistoryModal, settings: settings, totalTransactionsThisWeek: totalTransactionsThisWeek }),
        React.createElement(ImportExport, { customers: customers, onImport: handleImport, showToast: showToast }),
        React.createElement(Footer),
        React.createElement(Toast, { message: toast.message, key: toast.key }),
        editingCustomer && React.createElement(EditCustomerModal, { customer: editingCustomer, onSave: handleUpdateCustomer, onClose: () => setEditingCustomer(null) }),
        viewingHistoryCustomer && React.createElement(TransactionHistoryModal, { customer: viewingHistoryCustomer, onClose: () => setViewingHistoryCustomer(null), onUndoTransaction: handleUndoTransaction })
    );
};

// --- Transpiled from index.tsx ---
const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error("Could not find root element to mount to");
}

const root = createRoot(rootElement);
root.render(React.createElement(React.StrictMode, null, React.createElement(App)));
