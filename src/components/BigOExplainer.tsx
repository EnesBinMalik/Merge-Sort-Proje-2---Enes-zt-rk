import React, { useState } from 'react';
import { TrendingUp, Layers, Cpu, Database } from 'lucide-react';

export const BigOExplainer: React.FC = () => {
  const [sliderN, setSliderN] = useState<number>(64);

  // Compute values for comparison
  const n = sliderN;
  const log2n = Math.log2(n);
  const mergeSortOps = Math.round(n * log2n);
  const nSquaredOps = n * n;
  const linearOps = n;

  return (
    <section id="big-o-analizi" className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
            Algoritma Verimliliği
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Neden Merge Sort? O(n log n) Derinlemesine Analiz
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Diziyi her seferinde ikiye bölmek, işlem sayısını $O(n^2)$ seviyesinden $O(n \log n)$ seviyesine düşürerek büyük veri kümelerinde muazzam hız kazandırır.
          </p>
        </div>

        {/* Interactive n slider sandbox */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Eleman Sayısına (n) Göre Karşılaştırma Simülatörü
              </h3>
              <p className="text-xs text-slate-500">
                Aşağıdaki kaydırıcıyı hareket ettirerek Merge Sort'un $O(n^2)$ algoritmalara (Insertion/Bubble) karşı üstünlüğünü gözlemleyin.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-mono">Dizi Boyutu (n):</span>
              <span className="font-mono font-bold text-lg text-indigo-600 bg-white border border-slate-200 px-3 py-1 rounded-lg">
                {n.toLocaleString('tr-TR')}
              </span>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between text-xs text-slate-400 font-mono mb-2">
              <span>n = 6 (Proje Dizisi)</span>
              <span>n = 128</span>
              <span>n = 512</span>
              <span>n = 2048</span>
            </div>
            <input
              type="range"
              min={6}
              max={2048}
              step={2}
              value={sliderN}
              onChange={(e) => setSliderN(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Metric Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-indigo-200 rounded-xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-indigo-600">Merge Sort</span>
                <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  O(n log n)
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900">
                {mergeSortOps.toLocaleString('tr-TR')}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Yaklaşık karşılaştırma ve birleştirme adımı
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-rose-600">Insertion / Bubble Sort</span>
                <span className="text-xs font-mono font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                  O(n²)
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900">
                {nSquaredOps.toLocaleString('tr-TR')}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Karesel büyüme (büyük veride kilitlenir)
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-emerald-600">Hız Avantajı</span>
                <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Kat Fark
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-700">
                {(nSquaredOps / Math.max(1, mergeSortOps)).toFixed(1)}x
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Merge Sort bu boyutta { (nSquaredOps / Math.max(1, mergeSortOps)).toFixed(1) } kat daha az işlem yapar
              </p>
            </div>
          </div>
        </div>

        {/* Technical Attributes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border border-slate-200 rounded-xl p-5 bg-white">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <Cpu className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">Zaman Karmaşıklığı</h4>
            <div className="font-mono text-xs font-bold text-indigo-600 mb-2">O(n log n)</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              En iyi, ortalama ve en kötü durumların tümünde $O(n \log n)$ çalışma garantisi sunar.
            </p>
          </div>

          <div className="border border-slate-200 rounded-xl p-5 bg-white">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <Database className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">Alan (Space) Karmaşıklığı</h4>
            <div className="font-mono text-xs font-bold text-amber-600 mb-2">O(n) Ek Bellek</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Alt dizileri geçici olarak saklamak için dizinin boyutu ($n$) kadar yardımcı belleğe ihtiyaç duyar.
            </p>
          </div>

          <div className="border border-slate-200 rounded-xl p-5 bg-white">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">Kararlılık (Stability)</h4>
            <div className="font-mono text-xs font-bold text-emerald-600 mb-2">Kararlı (Stable)</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Eşit değere sahip elemanların orijinal dizideki göreceli sırası birleştirme işleminde asla bozulmaz.
            </p>
          </div>

          <div className="border border-slate-200 rounded-xl p-5 bg-white">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">Algoritma Paradigması</h4>
            <div className="font-mono text-xs font-bold text-slate-800 mb-2">Böl ve Yönet</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Problemi tek tek çözülebilecek en küçük alt parçalara ayırır (Divide), çözer (Conquer) ve birleştirir (Combine).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
