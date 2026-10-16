import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../utils/mergeSortSimulator';
import { HelpCircle, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

export const QuizSection: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (questionId: number, optionIdx: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const correctCount = QUIZ_QUESTIONS.filter(
    (q) => selectedAnswers[q.id] === q.correctIndex
  ).length;

  return (
    <section id="bilgi-testi" className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
              <HelpCircle className="w-4 h-4" />
              Öğrenme Pekiştirme
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Merge Sort Bilgi Testi (4 Soru)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Algoritma mantığını, Big-O analizini ve bellek dinamiklerini test edin
            </p>
          </div>

          <div className="flex items-center gap-2">
            {showResults && (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Yeniden Başlat</span>
              </button>
            )}
            {!showResults && Object.keys(selectedAnswers).length > 0 && (
              <button
                onClick={() => setShowResults(true)}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-2xs"
              >
                Cevapları Kontrol Et
              </button>
            )}
          </div>
        </div>

        {/* Results Banner if submitted */}
        {showResults && (
          <div className="mb-8 p-4 rounded-xl border bg-slate-50 border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-slate-900">
                Test Sonucu: {correctCount} / {QUIZ_QUESTIONS.length} Doğru
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {correctCount === QUIZ_QUESTIONS.length
                  ? 'Tebrikler! Merge Sort konusunu eksiksiz anladınız.'
                  : 'Aşağıdaki açıklamaları inceleyerek eksiklerinizi tamamlayabilirsiniz.'}
              </p>
            </div>
            <span className="font-mono text-xl font-bold text-indigo-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
              %{Math.round((correctCount / QUIZ_QUESTIONS.length) * 100)}
            </span>
          </div>
        )}

        {/* Question Cards */}
        <div className="space-y-6">
          {QUIZ_QUESTIONS.map((q, qIdx) => {
            const userAnswer = selectedAnswers[q.id];
            const isAnswered = userAnswer !== undefined;
            const isCorrect = userAnswer === q.correctIndex;

            return (
              <div
                key={q.id}
                className="bg-slate-50/70 border border-slate-200 rounded-xl p-5 sm:p-6"
              >
                <div className="flex items-start gap-3 mb-4">
                  <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {qIdx + 1}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    {q.question}
                  </h3>
                </div>

                {/* Options */}
                <div className="space-y-2 pl-9">
                  {q.options.map((opt: string, optIdx: number) => {
                    const isSelected = userAnswer === optIdx;

                    let optionStyle = 'bg-white border-slate-200 hover:border-slate-300 text-slate-700';

                    if (showResults) {
                      if (optIdx === q.correctIndex) {
                        optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'bg-rose-50 border-rose-300 text-rose-900';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-indigo-50 border-indigo-400 text-indigo-900 font-semibold';
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={showResults}
                        onClick={() => handleSelect(q.id, optIdx)}
                        className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition-all flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{opt}</span>
                        {showResults && optIdx === q.correctIndex && (
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {showResults && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {showResults && (
                  <div className="mt-4 ml-9 p-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 leading-relaxed">
                    <strong className="text-slate-900">Açıklama: </strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
