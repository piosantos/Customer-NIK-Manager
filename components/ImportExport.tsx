
import React, { useRef, ChangeEvent } from 'react';
import { Customer, CustomerType } from '../types';

interface ImportExportProps {
    customers: Customer[];
    onImport: (customers: Customer[]) => void;
    showToast: (message: string) => void;
}

const ImportExport: React.FC<ImportExportProps> = ({ customers, onImport, showToast }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const text = event.target?.result as string;
                const lines = text.split(/\r\n|\n/).slice(1);
                const importedCustomers: Customer[] = [];

                lines.forEach(line => {
                    if (!line.trim()) return;
                    const parts = line.split(',').map(s => s.trim().replace(/^"|"$/g, '').replace(/^'/, ''));
                    if (parts.length < 2) return;
                    
                    const [name, nik, type, notes = '', createdAt = new Date().toISOString()] = parts;
                    
                    if (name && nik && nik.length === 16 && /^\d+$/.test(nik)) {
                        const customerType = (type || '').toLowerCase().includes('mikro') ? CustomerType.UsahaMikro : CustomerType.RumahTangga;
                        importedCustomers.push({ name, nik, type: customerType, notes, createdAt });
                    }
                });
                
                onImport(importedCustomers);
            } catch (err) {
                showToast('❌ Format file tidak valid.');
                console.error("Import Error:", err);
            }
        };
        reader.readAsText(file);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <>
            <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                 <button onClick={handleExport} className="w-full text-sm bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
                    📥 Export Data
                </button>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Import Data CSV</h3>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".csv" className="hidden" />
                <button onClick={handleImportClick} className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition text-sm">
                    📤 Import dari CSV
                </button>
                <p className="text-xs text-gray-500 mt-2">Format: Nama,NIK,Jenis (rumah_tangga/usaha_mikro),Catatan</p>
            </div>
        </>
    );
};

export default ImportExport;
