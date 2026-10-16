import React from 'react';
import { StepSnapshot } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ComparisonPointerViewProps {
  currentStep: StepSnapshot;
}

export const ComparisonPointerView: React.FC<ComparisonPointerViewProps> = ({ currentStep }) => {
  const { comparing, mergedSoFar, phase } = currentStep;

  if (!comparing && (!mergedSoFar || mergedSoFar.length === 0)) {
    return null;
  }

  return (
    <div className="bg-slate-900 text-white rounded-xl p-5 shadow-sm border border-slate-800">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            Canlı Karşılaştırma & Birleştirme İşaretçisi
          </span>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          {phase === 'merge' ? 'Birleştirme İşlemi (O(n))' : 'Tamamlanma Durumu'}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Comparison active elements */}
        {comparing ? (
          <div className="md:col-span-5 flex items-center justify-center gap-4 bg-slate-800/80 rounded-lg p-4 border border-slate-700">
            <div className={`text-center p-3 rounded-lg border ${comparing.winnerVal === comparing.leftVal ? 'border-emerald-500 bg-emerald-950/40' : 'border-slate-700 bg-slate-900'}`}>
              <div className="text-xs text-slate-400 mb-1">Sol Dizi</div>
              <div className="text-2xl font-bold font-mono text-white">{comparing.leftVal}</div>
              {comparing.winnerVal === comparing.leftVal && (
                <span className="text-[10px] text-emerald-400 font-semibold mt-1 inline-block">Küçük (Seçildi)</span>
              )}
            </div>

            <div className="text-xs font-mono text-slate-400 flex flex-col items-center">
              <span>vs</span>
              <span className="text-slate-500 text-[10px]">kıyasla</span>
            </div>

            <div className={`text-center p-3 rounded-lg border ${comparing.winnerVal === comparing.rightVal ? 'border-emerald-500 bg-emerald-950/40' : 'border-slate-700 bg-slate-900'}`}>
              <div className="text-xs text-slate-400 mb-1">Sağ Dizi</div>
              <div className="text-2xl font-bold font-mono text-white">{comparing.rightVal}</div>
              {comparing.winnerVal === comparing.rightVal && (
                <span className="text-[10px] text-emerald-400 font-semibold mt-1 inline-block">Küçük (Seçildi)</span>
              )}
            </div>
          </div>
        ) : (
          <div className="md:col-span-5 flex items-center justify-center p-4 text-xs text-slate-400">
            Birleştirme tamamlandı veya alt gruplar bir üst seviyeye taşındı.
          </div>
        )}

        <div className="hidden md:flex md:col-span-1 justify-center text-slate-500">
          <ArrowRight className="w-5 h-5 text-indigo-400" />
        </div>

        {/* Target merged array so far */}
        <div className="md:col-span-6 bg-slate-800/80 rounded-lg p-4 border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-medium">Hedef Diziye Yerleşenler:</span>
            <span className="text-xs text-indigo-300 font-mono">
              {mergedSoFar?.length || 0} / 6 eleman
            </span>
          </div>

          <div className="flex flex-wrap gap-2 min-h-[44px] items-center">
            {mergedSoFar && mergedSoFar.length > 0 ? (
              mergedSoFar.map((num, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-emerald-600/30 text-emerald-300 border border-emerald-500/50 rounded-md font-mono font-bold text-sm"
                >
                  {num}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-500 italic">Diziye henüz eleman yazılmadı...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
