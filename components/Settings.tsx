import React from 'react';
import { Settings } from '../types';

interface SettingsProps {
    settings: Settings;
    onSettingsChange: (settings: Settings) => void;
}

const weekDays = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const SettingsComponent: React.FC<SettingsProps> = ({ settings, onSettingsChange }) => {
    
    const handleWeekStartChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSettingsChange({ ...settings, weekStartsOn: parseInt(e.target.value) });
    };
    
    const handleQuotaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSettingsChange({ ...settings, baseQuota: parseInt(e.target.value) || 1 });
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Pengaturan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="week-start" className="block text-sm font-medium text-gray-700 mb-1">Awal Minggu Dimulai</label>
                    <select
                        id="week-start"
                        value={settings.weekStartsOn}
                        onChange={handleWeekStartChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                        {weekDays.map((day, index) => (
                            <option key={index} value={index}>{day}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="quota-pangkalan" className="block text-sm font-medium text-gray-700 mb-1">Kuota Pangkalan</label>
                    <input
                        type="number"
                        id="quota-pangkalan"
                        min="1"
                        value={settings.baseQuota}
                        onChange={handleQuotaChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                </div>
            </div>
        </div>
    );
};

export default SettingsComponent;