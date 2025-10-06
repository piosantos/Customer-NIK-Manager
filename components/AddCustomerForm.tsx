
import React, { useState, ChangeEvent, FormEvent, RefObject } from 'react';
import { Customer, CustomerType } from '../types';
import { HomeIcon, StoreIcon } from './icons/CustomerTypeIcons';

interface AddCustomerFormProps {
    onAddCustomer: (customer: Omit<Customer, 'createdAt'>) => void;
    nameInputRef: RefObject<HTMLInputElement>;
}

const AddCustomerForm: React.FC<AddCustomerFormProps> = ({ onAddCustomer, nameInputRef }) => {
    const [name, setName] = useState('');
    const [nik, setNik] = useState('');
    const [type, setType] = useState<CustomerType>(CustomerType.RumahTangga);
    const [notes, setNotes] = useState('');
    const [nikValidation, setNikValidation] = useState<{ message: string; color: string } | null>(null);

    const validateNIK = (nik: string) => {
        if (nik.length !== 16) {
            return { valid: false, message: '❌ NIK harus 16 digit', color: 'text-red-600' };
        }
        if (!/^\d+$/.test(nik)) {
            return { valid: false, message: '❌ NIK hanya boleh angka', color: 'text-red-600' };
        }
        const provinceCode = parseInt(nik.substring(0, 2));
        if (provinceCode < 11 || provinceCode > 94) {
            return { valid: false, message: '⚠️ Kode provinsi tidak valid', color: 'text-orange-600' };
        }
        let day = parseInt(nik.substring(6, 8));
        if (day > 40) day -= 40;
        const month = parseInt(nik.substring(8, 10));
        if (day < 1 || day > 31 || month < 1 || month > 12) {
            return { valid: false, message: '⚠️ Tanggal lahir tidak valid', color: 'text-orange-600' };
        }
        return { valid: true, message: '✅ Format NIK valid', color: 'text-green-600' };
    };

    const handleNikChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newNik = e.target.value;
        setNik(newNik);
        if (newNik.length > 0) {
            const validation = validateNIK(newNik);
            setNikValidation({ message: validation.message, color: validation.color });
        } else {
            setNikValidation(null);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
    
    return (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Tambah Pelanggan Baru</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="customer-name" className="block text-sm font-medium text-gray-700 mb-1">Nama Pelanggan</label>
                    <input type="text" id="customer-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="contoh: Budi Santoso" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" ref={nameInputRef} />
                </div>
                
                <div className="mb-4">
                    <label htmlFor="customer-nik" className="block text-sm font-medium text-gray-700 mb-1">NIK 16 Digit</label>
                    <input type="text" id="customer-nik" value={nik} onChange={handleNikChange} inputMode="numeric" pattern="\d{16}" maxLength={16} title="NIK harus 16 digit" placeholder="Masukkan NIK 16 digit" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                    {nikValidation && <p className={`text-xs mt-1 ${nikValidation.color}`}>{nikValidation.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Pelanggan</label>
                    <div className="grid grid-cols-2 gap-3">
                        <label className="relative flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
                            <input type="radio" name="customer-type" value={CustomerType.RumahTangga} checked={type === CustomerType.RumahTangga} onChange={() => setType(CustomerType.RumahTangga)} className="sr-only peer" />
                            <div className="peer-checked:border-green-500 peer-checked:bg-green-50 absolute inset-0 rounded-lg border-2 transition-all"></div>
                            <div className="relative z-10 flex items-center w-full">
                                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3"><HomeIcon /></div>
                                <div className="flex-grow"><p className="font-semibold text-gray-800 text-sm">Rumah Tangga</p><p className="text-xs text-gray-600">1 tabung/bulan</p></div>
                            </div>
                        </label>
                        <label className="relative flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                            <input type="radio" name="customer-type" value={CustomerType.UsahaMikro} checked={type === CustomerType.UsahaMikro} onChange={() => setType(CustomerType.UsahaMikro)} className="sr-only peer" />
                            <div className="peer-checked:border-blue-500 peer-checked:bg-blue-50 absolute inset-0 rounded-lg border-2 transition-all"></div>
                            <div className="relative z-10 flex items-center w-full">
                                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3"><StoreIcon /></div>
                                <div className="flex-grow"><p className="font-semibold text-gray-800 text-sm">Usaha Mikro</p><p className="text-xs text-gray-600">2 tabung/bulan</p></div>
                            </div>
                        </label>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="customer-notes" className="block text-sm font-medium text-gray-700 mb-1">Catatan (Opsional)</label>
                    <textarea id="customer-notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="Alamat, nomor HP, atau catatan lainnya..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"></textarea>
                </div>

                <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300">
                    💾 Simpan Pelanggan
                </button>
            </form>
        </div>
    );
};

export default AddCustomerForm;
