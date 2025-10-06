import React, { useState, useEffect } from 'react';
import { Customer, CustomerType } from '../types';
import { HomeIcon, StoreIcon } from './icons/CustomerTypeIcons';

interface EditCustomerModalProps {
    customer: Customer;
    onSave: (updatedCustomer: Customer) => void;
    onClose: () => void;
}

const EditCustomerModal: React.FC<EditCustomerModalProps> = ({ customer, onSave, onClose }) => {
    const [name, setName] = useState(customer.name);
    const [type, setType] = useState<CustomerType>(customer.type);
    const [notes, setNotes] = useState(customer.notes);

    useEffect(() => {
        setName(customer.name);
        setType(customer.type);
        setNotes(customer.notes);
    }, [customer]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...customer,
            name: name.trim(),
            type,
            notes: notes.trim(),
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Pelanggan</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="edit-customer-name" className="block text-sm font-medium text-gray-700 mb-1">Nama Pelanggan</label>
                        <input
                            type="text"
                            id="edit-customer-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="edit-customer-nik" className="block text-sm font-medium text-gray-700 mb-1">NIK (Tidak dapat diubah)</label>
                        <input
                            type="text"
                            id="edit-customer-nik"
                            value={customer.nik}
                            disabled
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Pelanggan</label>
                         <div className="grid grid-cols-2 gap-3">
                            <label className="relative flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
                                <input type="radio" name="edit-customer-type" value={CustomerType.RumahTangga} checked={type === CustomerType.RumahTangga} onChange={() => setType(CustomerType.RumahTangga)} className="sr-only peer" />
                                <div className="peer-checked:border-green-500 peer-checked:bg-green-50 absolute inset-0 rounded-lg border-2 transition-all"></div>
                                <div className="relative z-10 flex items-center w-full">
                                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3"><HomeIcon /></div>
                                    <div className="flex-grow"><p className="font-semibold text-gray-800 text-sm">Rumah Tangga</p></div>
                                </div>
                            </label>
                            <label className="relative flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                                <input type="radio" name="edit-customer-type" value={CustomerType.UsahaMikro} checked={type === CustomerType.UsahaMikro} onChange={() => setType(CustomerType.UsahaMikro)} className="sr-only peer" />
                                <div className="peer-checked:border-blue-500 peer-checked:bg-blue-50 absolute inset-0 rounded-lg border-2 transition-all"></div>
                                <div className="relative z-10 flex items-center w-full">
                                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3"><StoreIcon /></div>
                                    <div className="flex-grow"><p className="font-semibold text-gray-800 text-sm">Usaha Mikro</p></div>
                                </div>
                            </label>
                        </div>
                    </div>

                     <div className="mb-6">
                        <label htmlFor="edit-customer-notes" className="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
                        <textarea
                            id="edit-customer-notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        ></textarea>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition">
                            Batal
                        </button>
                        <button type="submit" className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition">
                            Simpan Perubahan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCustomerModal;