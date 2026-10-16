import React, { useState } from 'react';
import { X, Ruler, CheckCircle } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName?: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, categoryName }) => {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isOpen) return null;

  const sizeData = [
    { size: 'XS', bustIn: '32', bustCm: '81', waistIn: '26', waistCm: '66', hipsIn: '35', hipsCm: '89', inSize: '32 (UK 6)' },
    { size: 'S', bustIn: '34', bustCm: '86', waistIn: '28', waistCm: '71', hipsIn: '37', hipsCm: '94', inSize: '34 (UK 8)' },
    { size: 'M', bustIn: '36', bustCm: '91', waistIn: '30', waistCm: '76', hipsIn: '39', hipsCm: '99', inSize: '36 (UK 10)' },
    { size: 'L', bustIn: '38', bustCm: '97', waistIn: '32', waistCm: '81', hipsIn: '41', hipsCm: '104', inSize: '38 (UK 12)' },
    { size: 'XL', bustIn: '40', bustCm: '102', waistIn: '34', waistCm: '86', hipsIn: '43', hipsCm: '109', inSize: '40 (UK 14)' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 z-10 max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-50 rounded-xl text-rose-600">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-slate-900">
                Aura Western Size Guide
              </h3>
              <p className="text-xs text-slate-500">
                Standard sizing measurements {categoryName ? `for ${categoryName}` : ''}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center justify-end my-4">
          <div className="bg-slate-100 p-1 rounded-lg inline-flex text-xs font-semibold">
            <button
              type="button"
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 rounded-md transition-all ${
                unit === 'inches'
                  ? 'bg-white text-rose-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Inches (in)
            </button>
            <button
              type="button"
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded-md transition-all ${
                unit === 'cm'
                  ? 'bg-white text-rose-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Size Chart Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-700 text-xs uppercase font-bold tracking-wider">
              <tr>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">India / UK</th>
                <th className="py-3 px-4">Bust ({unit === 'inches' ? 'in' : 'cm'})</th>
                <th className="py-3 px-4">Waist ({unit === 'inches' ? 'in' : 'cm'})</th>
                <th className="py-3 px-4">Hips ({unit === 'inches' ? 'in' : 'cm'})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {sizeData.map((row) => (
                <tr key={row.size} className="hover:bg-rose-50/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">{row.size}</td>
                  <td className="py-3 px-4 text-slate-500">{row.inSize}</td>
                  <td className="py-3 px-4">{unit === 'inches' ? row.bustIn : row.bustCm}</td>
                  <td className="py-3 px-4">{unit === 'inches' ? row.waistIn : row.waistCm}</td>
                  <td className="py-3 px-4">{unit === 'inches' ? row.hipsIn : row.hipsCm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* How to Measure Section */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
            How to Measure
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
            <div className="p-3 rounded-lg bg-slate-50">
              <span className="font-semibold text-slate-800 block mb-1">1. Bust</span>
              Measure around the fullest part of your chest, keeping the tape parallel to the floor.
            </div>
            <div className="p-3 rounded-lg bg-slate-50">
              <span className="font-semibold text-slate-800 block mb-1">2. Waist</span>
              Measure around your natural waistline, usually the narrowest part right above your navel.
            </div>
            <div className="p-3 rounded-lg bg-slate-50">
              <span className="font-semibold text-slate-800 block mb-1">3. Hips</span>
              Stand with feet together and measure around the fullest part of your hips.
            </div>
          </div>
        </div>

        {/* Rajasthan Fitting Note */}
        <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-100 flex items-start gap-2 text-xs text-rose-800">
          <CheckCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Need help picking your size?</strong> Our stylists in Rajasthan are available on WhatsApp to recommend the right fit for your body type.
          </span>
        </div>
      </div>
    </div>
  );
};
