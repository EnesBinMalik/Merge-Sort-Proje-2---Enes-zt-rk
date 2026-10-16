import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';
import { BST_STEPS, BST_PROJECT_ARRAY, BSTStep } from '../utils/bstSimulator';

interface BSTStepPlayerProps {
  currentStepIndex: number;
  onStepChange: (index: number) => void;
}

export const BSTStepPlayer: React.FC<BSTStepPlayerProps> = ({
  currentStepIndex,
  onStepChange,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(1400);

  const totalSteps = BST_STEPS.length;
  const currentStep = BST_STEPS[currentStepIndex] || BST_STEPS[0];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      if (currentStepIndex < totalSteps - 1) {
        timer = setTimeout(() => {
          onStepChange(currentStepIndex + 1);
        }, speedMs);
      } else {
        setIsPlaying(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, totalSteps, speedMs, onStepChange]);

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      onStepChange(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      onStepChange(currentStepIndex - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    onStepChange(0);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
      {/* Current Step Description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
              Adım {currentStepIndex + 1} / {totalSteps}
            </span>
            <h4 className="text-base sm:text-lg font-bold text-slate-900">
              {currentStep.title}
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {currentStep.explanation}
          </p>
        </div>

        <div className="text-xs font-mono bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-emerald-800 font-bold whitespace-nowrap self-start sm:self-center">
          {currentStep.summaryRule}
        </div>
      </div>

      {/* Path Taken in BST Comparisons */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs font-mono">
        <span className="text-slate-400 font-semibold block mb-1.5 uppercase text-[10px] tracking-wider">
          Ağaç Üzerindeki Kıyaslama Yolu:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {currentStep.comparisonPath.map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <span className="px-2 py-1 bg-white border border-slate-200 rounded font-semibold text-slate-800">
                {item.reason}
              </span>
              {idx < currentStep.comparisonPath.length - 1 && (
                <span className="text-slate-400">→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Controls & Speed */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Ağacı Sıfırla"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors"
            title="Önceki Eleman"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs sm:text-sm rounded-lg shadow-sm transition-colors"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Duraklat</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Otomatik Ekle</span>
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            disabled={currentStepIndex === totalSteps - 1}
            className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors"
            title="Sonraki Eleman"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Speed */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Hız:</span>
          <div className="flex bg-slate-100 p-0.5 rounded-lg">
            <button
              onClick={() => setSpeedMs(2000)}
              className={`px-2 py-1 rounded-md transition-colors ${
                speedMs === 2000 ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Yavaş
            </button>
            <button
              onClick={() => setSpeedMs(1400)}
              className={`px-2 py-1 rounded-md transition-colors ${
                speedMs === 1400 ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => setSpeedMs(700)}
              className={`px-2 py-1 rounded-md transition-colors ${
                speedMs === 700 ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hızlı
            </button>
          </div>
        </div>
      </div>

      {/* Array Elements Progress Bar */}
      <div className="pt-2">
        <div className="text-[11px] font-mono text-slate-400 mb-1.5">
          Eklenecek Dizi Sırası:
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {BST_PROJECT_ARRAY.map((val, idx) => {
            const isInserted = idx <= currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            let pillStyle = 'bg-slate-100 text-slate-400 border-slate-200';
            if (isCurrent) {
              pillStyle = 'bg-emerald-600 text-white border-emerald-700 shadow ring-2 ring-emerald-200 font-bold';
            } else if (isInserted) {
              pillStyle = 'bg-indigo-50 text-indigo-700 border-indigo-200 font-semibold';
            }

            return (
              <button
                key={idx}
                onClick={() => {
                  setIsPlaying(false);
                  onStepChange(idx);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer ${pillStyle}`}
                title={`Adım ${idx + 1}: ${val}`}
              >
                {val}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
