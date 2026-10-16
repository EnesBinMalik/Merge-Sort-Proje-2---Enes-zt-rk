import React from 'react';
import { StepSnapshot } from '../types';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface TreeVisualizerProps {
  currentStep: StepSnapshot;
}

export const TreeVisualizer: React.FC<TreeVisualizerProps> = ({ currentStep }) => {
  const { id: stepId, phase, activeLevel } = currentStep;

  // Visual state flags based on stepId for the project array
  const isDivided1 = stepId >= 1;
  const isDivided2 = stepId >= 2;
  const isDivided3 = stepId >= 3;
  const isMerged1 = stepId >= 4;
  const isMerged2 = stepId >= 5;
  const isMainMerge = stepId >= 6;
  const isComplete = stepId >= 10;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-7 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Böl ve Yönet (Divide and Conquer) Ağacı
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Yukarıdan aşağıya bölme (log₂ n derinlik), aşağıdan yukarıya sıralı birleştirme
          </p>
        </div>

        {/* Phase Indicator */}
        <div className="flex items-center gap-2 text-xs font-medium">
          <span className="text-slate-500">Mevcut Aşama:</span>
          {phase === 'initial' && <span className="text-slate-700 font-semibold">Başlangıç</span>}
          {phase === 'divide' && (
            <span className="inline-flex items-center gap-1 text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded">
              <ArrowDown className="w-3 h-3 text-amber-600" />
              Bölme Safhası (Divide)
            </span>
          )}
          {phase === 'base' && (
            <span className="text-indigo-700 font-semibold bg-indigo-50 px-2 py-0.5 rounded">
              Temel Durum (1 Elemanlı)
            </span>
          )}
          {phase === 'merge' && (
            <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
              <ArrowUp className="w-3 h-3 text-emerald-600" />
              Birleştirme Safhası (Merge)
            </span>
          )}
          {phase === 'complete' && (
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
              Kusursuz Sıralandı
            </span>
          )}
        </div>
      </div>

      {/* Tree Visualization Canvas */}
      <div className="space-y-6 sm:space-y-8 overflow-x-auto py-2">
        {/* LEVEL 0: Initial Array */}
        <div className="flex flex-col items-center">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Seviye 0 · Orijinal Dizi (n = 6)
          </div>
          <div
            className={`px-4 py-2 rounded-lg border font-mono font-bold text-sm sm:text-base transition-all duration-300 ${
              stepId === 0
                ? 'bg-indigo-50 border-indigo-400 text-indigo-900 shadow-sm ring-2 ring-indigo-200'
                : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            [16, 21, 11, 8, 12, 22]
          </div>
        </div>

        {/* Tree Branch Visual 1 */}
        <div className="relative flex justify-center items-center">
          <div className="w-48 sm:w-80 h-4 border-b-2 border-l-2 border-r-2 border-slate-300 rounded-b-md"></div>
        </div>

        {/* LEVEL 1: First Split */}
        <div className="flex justify-around items-center gap-4">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400 font-mono mb-1">Sol Alt Dizi</span>
            <div
              className={`px-3 py-1.5 rounded-lg border font-mono font-semibold text-xs sm:text-sm transition-all duration-300 ${
                isDivided1 && !isDivided2
                  ? 'bg-amber-50 border-amber-400 text-amber-900 ring-2 ring-amber-200'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              [16, 21, 11]
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400 font-mono mb-1">Sağ Alt Dizi</span>
            <div
              className={`px-3 py-1.5 rounded-lg border font-mono font-semibold text-xs sm:text-sm transition-all duration-300 ${
                isDivided1 && !isDivided2
                  ? 'bg-amber-50 border-amber-400 text-amber-900 ring-2 ring-amber-200'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              [8, 12, 22]
            </div>
          </div>
        </div>

        {/* LEVEL 2: Second Split */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-2xl mx-auto text-center">
          <div className="flex flex-col items-center">
            <div
              className={`px-2.5 py-1 rounded-md border font-mono text-xs sm:text-sm transition-all duration-300 ${
                isDivided2 && stepId < 4
                  ? 'bg-amber-50 border-amber-400 text-amber-900 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              [16, 21]
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div
              className={`px-2.5 py-1 rounded-md border font-mono text-xs sm:text-sm transition-all duration-300 ${
                isDivided2 && stepId < 4
                  ? 'bg-indigo-50 border-indigo-400 text-indigo-900 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              [11]
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div
              className={`px-2.5 py-1 rounded-md border font-mono text-xs sm:text-sm transition-all duration-300 ${
                isDivided2 && stepId < 4
                  ? 'bg-amber-50 border-amber-400 text-amber-900 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              [8, 12]
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div
              className={`px-2.5 py-1 rounded-md border font-mono text-xs sm:text-sm transition-all duration-300 ${
                isDivided2 && stepId < 4
                  ? 'bg-indigo-50 border-indigo-400 text-indigo-900 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              [22]
            </div>
          </div>
        </div>

        {/* LEVEL 3: Atomic Base Case (Single Elements) */}
        <div className="border-t border-b border-dashed border-slate-200 py-3 my-2">
          <div className="text-center text-[11px] font-semibold text-indigo-600 uppercase tracking-wider mb-2">
            Temel Durum (Base Case) · Tek Elemanlı Bağımsız Parçalar
          </div>
          <div className="grid grid-cols-6 gap-2 sm:gap-3 max-w-lg mx-auto">
            {[16, 21, 11, 8, 12, 22].map((num, i) => (
              <div
                key={i}
                className={`py-2 px-1 text-center font-mono font-bold text-xs sm:text-sm rounded-lg border transition-all duration-300 ${
                  stepId === 3
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow ring-2 ring-indigo-200 scale-105'
                    : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                [{num}]
              </div>
            ))}
          </div>
        </div>

        {/* MERGE PHASE 1: Pairs Merging */}
        <div className="flex justify-around items-center gap-4">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400 font-mono mb-1">16 & 21 Birleşimi</span>
            <div
              className={`px-3 py-1.5 rounded-lg border font-mono font-semibold text-xs sm:text-sm transition-all duration-300 ${
                isMerged1
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                  : 'bg-slate-50/50 border-slate-200/60 text-slate-400'
              }`}
            >
              {isMerged1 ? '[16, 21]' : '· · ·'}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400 font-mono mb-1">8 & 12 Birleşimi</span>
            <div
              className={`px-3 py-1.5 rounded-lg border font-mono font-semibold text-xs sm:text-sm transition-all duration-300 ${
                isMerged1
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                  : 'bg-slate-50/50 border-slate-200/60 text-slate-400'
              }`}
            >
              {isMerged1 ? '[8, 12]' : '· · ·'}
            </div>
          </div>
        </div>

        {/* MERGE PHASE 2: Triplet Blocks Merging */}
        <div className="flex justify-around items-center gap-4">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400 font-mono mb-1">Sol Sıralı Blok</span>
            <div
              className={`px-4 py-2 rounded-lg border font-mono font-semibold text-xs sm:text-sm transition-all duration-300 ${
                isMerged2
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                  : 'bg-slate-50/50 border-slate-200/60 text-slate-400'
              }`}
            >
              {isMerged2 ? '[11, 16, 21]' : '· · ·'}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400 font-mono mb-1">Sağ Sıralı Blok</span>
            <div
              className={`px-4 py-2 rounded-lg border font-mono font-semibold text-xs sm:text-sm transition-all duration-300 ${
                isMerged2
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                  : 'bg-slate-50/50 border-slate-200/60 text-slate-400'
              }`}
            >
              {isMerged2 ? '[8, 12, 22]' : '· · ·'}
            </div>
          </div>
        </div>

        {/* FINAL RESULT LEVEL: Fully Merged Sorted Array */}
        <div className="flex flex-col items-center pt-2">
          <div className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            Sonuç: Tam Sıralı Dizi
          </div>
          <div
            className={`px-5 py-2.5 rounded-xl border font-mono font-bold text-sm sm:text-lg transition-all duration-500 ${
              isComplete
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-md ring-4 ring-emerald-100 scale-105'
                : isMainMerge
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-slate-50/50 border-slate-200/60 text-slate-400'
            }`}
          >
            {isComplete ? '[8, 11, 12, 16, 21, 22]' : isMainMerge ? '[8, 11, 12, 16, 21, ...]' : '[ bekliyor... ]'}
          </div>
        </div>
      </div>
    </div>
  );
};
