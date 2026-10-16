import React from 'react';
import { ArrowDownRight, CheckCircle2, User, BookOpen, GitFork } from 'lucide-react';

interface BSTHeroBannerProps {
  onScrollToSimulator: () => void;
  onScrollToSolution: () => void;
}

export const BSTHeroBanner: React.FC<BSTHeroBannerProps> = ({
  onScrollToSimulator,
  onScrollToSolution,
}) => {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Unboxed Metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 mb-4">
          <span className="flex items-center gap-1.5 text-indigo-700 font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            Patika.dev & Kodluyoruz
          </span>
          <span aria-hidden="true">·</span>
          <span>Veri Yapıları ve Algoritmalar</span>
          <span aria-hidden="true">·</span>
          <span className="font-semibold text-slate-700">Proje 3: Binary Search Tree (BST)</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1 text-slate-900 font-semibold">
            <User className="w-3.5 h-3.5 text-indigo-600" />
            Hazırlayan: Enes Öztürk
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 text-balance leading-tight">
              [7, 5, 1, 8, 3, 6, 0, 9, 4, 2] Binary Search Tree
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Verilen 10 elemanlı dizinin İkili Arama Ağacı (BST) oluşum adımları, kök (root) ve sol-sağ çocuk hiyerarşisi, ağaç topolojisi ve dolaşma sıraları.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={onScrollToSimulator}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Ağaç Simülatörünü İzle
                <ArrowDownRight className="w-4 h-4" />
              </button>
              <button
                onClick={onScrollToSolution}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Aşama Aşamaları & Çözüm Metni
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Proje 3 Parametreleri & Doğrulama Kartı
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Hedef Dizi</span>
                  <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-xs sm:text-sm">
                    [7, 5, 1, 8, 3, 6, 0, 9, 4, 2]
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Kök Düğüm (Root)</span>
                  <span className="font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    root = 7
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">In-Order Çıktısı</span>
                  <span className="font-mono font-bold text-slate-800 text-xs">
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9 (Sıralı)
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-slate-500">Zaman Karmaşıklığı</span>
                  <span className="font-mono font-bold text-slate-900">
                    O(log n) ortalama
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-500">Hazırlayan</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-slate-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Enes Öztürk
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
