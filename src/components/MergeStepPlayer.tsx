import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Sliders, RefreshCw } from 'lucide-react';
import { StepSnapshot } from '../types';

interface MergeStepPlayerProps {
  steps: StepSnapshot[];
  currentStepIndex: number;
  onStepChange: (index: number) => void;
  onResetToDefault: () => void;
  onCustomArraySubmit: (numbers: number[]) => void;
  isCustomArray: boolean;
}

export const MergeStepPlayer: React.FC<MergeStepPlayerProps> = ({
  steps,
  currentStepIndex,
  onStepChange,
  onResetToDefault,
  onCustomArraySubmit,
  isCustomArray,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(1200);
  const [customInput, setCustomInput] = useState('');
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [inputError, setInputError] = useState<string | null>(null);

  const currentStep = steps[currentStepIndex] || steps[0];
  const totalSteps = steps.length;

  // Auto-play timer
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

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInputError(null);

    const parts = customInput
      .replace(/[\[\]]/g, '')
      .split(/[,;\s]+/)
      .filter((s) => s.trim() !== '')
      .map(Number);

    if (parts.length < 2) {
      setInputError('Lütfen en az 2 sayı giriniz (örnek: 15, 3, 9, 2, 8).');
      return;
    }

    if (parts.some(isNaN)) {
      setInputError('Lütfen sadece geçerli sayılar giriniz.');
      return;
    }

    if (parts.length > 10) {
      setInputError('Görselleştirme için en fazla 10 sayı önerilir.');
      return;
    }

    onCustomArraySubmit(parts);
    setShowCustomModal(false);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
      {/* Current Step Title & Explanation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
              Adım {currentStepIndex + 1} / {totalSteps}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {currentStep.title}
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {currentStep.description}
          </p>
        </div>

        {currentStep.mathNote && (
          <div className="text-xs font-mono bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-slate-700 whitespace-nowrap self-start sm:self-center">
            {currentStep.mathNote}
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Başa Dön"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors"
            title="Önceki Adım"
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
                <span>Oynat</span>
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            disabled={currentStepIndex === totalSteps - 1}
            className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors"
            title="Sonraki Adım"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Speed Selector & Custom Array Actions */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Hız:</span>
          <div className="flex bg-slate-100 p-0.5 rounded-lg">
            <button
              onClick={() => setSpeedMs(1800)}
              className={`px-2 py-1 rounded-md transition-colors ${
                speedMs === 1800 ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Yavaş
            </button>
            <button
              onClick={() => setSpeedMs(1200)}
              className={`px-2 py-1 rounded-md transition-colors ${
                speedMs === 1200 ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => setSpeedMs(600)}
              className={`px-2 py-1 rounded-md transition-colors ${
                speedMs === 600 ? 'bg-white text-slate-900 font-semibold shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hızlı
            </button>
          </div>

          {isCustomArray && (
            <button
              onClick={onResetToDefault}
              className="ml-2 flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium px-2 py-1 rounded hover:bg-indigo-50 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              Proje Dizisine Dön
            </button>
          )}

          <button
            onClick={() => setShowCustomModal(true)}
            className="flex items-center gap-1 text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Farklı Dizi Dene</span>
          </button>
        </div>
      </div>

      {/* Step Scrubber / Progress Bar */}
      <div className="space-y-1 pt-1">
        <div className="flex justify-between text-[11px] text-slate-400 font-mono">
          <span>01. Başlangıç</span>
          <span>10. Tamamlandı</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 cursor-pointer overflow-hidden flex">
          {steps.map((_, idx) => (
            <div
              key={idx}
              onClick={() => {
                setIsPlaying(false);
                onStepChange(idx);
              }}
              className={`h-full flex-1 transition-all border-r border-white/50 ${
                idx === currentStepIndex
                  ? 'bg-indigo-600'
                  : idx < currentStepIndex
                  ? 'bg-indigo-300'
                  : 'bg-slate-200 hover:bg-slate-300'
              }`}
              title={`Adım ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Custom Array Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <h4 className="text-base font-bold text-slate-900 mb-1">
              Farklı Bir Dizi Girin
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              Virgülle ayırarak 2 ila 8 adet sayı giriniz (örnek: 25, 14, 3, 89, 45, 12).
            </p>

            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="ör: 42, 17, 8, 99, 13, 5"
                  className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {inputError && (
                  <p className="text-xs text-rose-600 mt-1.5">{inputError}</p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold shadow-xs"
                >
                  Uygula ve Görselleştir
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
