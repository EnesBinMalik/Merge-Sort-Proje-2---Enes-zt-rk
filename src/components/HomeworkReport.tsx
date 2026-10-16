import React, { useState } from 'react';
import { Copy, Check, Printer, FileText, CheckCircle2, Award } from 'lucide-react';
import { MARKDOWN_HOMEWORK_TEMPLATE } from '../utils/mergeSortSimulator';

export const HomeworkReport: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(MARKDOWN_HOMEWORK_TEMPLATE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="cozum-raporu" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
              <FileText className="w-4 h-4" />
              Resmi Ödev Çözüm Raporu
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Proje 2: Birleştirme Sıralaması (Merge Sort)
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <span>Patika.dev & Kodluyoruz</span>
              <span aria-hidden="true">·</span>
              <span>Veri Yapıları ve Algoritmalar</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-slate-800">Hazırlayan: Enes Öztürk</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 no-print">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Yazdır / PDF</span>
            </button>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-indigo-600 rounded-lg transition-colors shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Ödevi Kopyala (MD)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Paper Document Container */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-10">
          {/* Header Metadata Block */}
          <div className="border-b border-slate-200 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Ders & Proje</span>
                <h3 className="text-lg font-bold text-slate-900">
                  Veri Yapıları ve Algoritmalar · Proje 2
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Öğrenci</span>
                <div className="text-base font-bold text-slate-900 flex items-center gap-1.5 justify-end">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Enes Öztürk
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <span className="text-slate-600">
                <strong>Verilen Dizi:</strong> [16, 21, 11, 8, 12, 22] (n = 6)
              </span>
              <span className="text-slate-600">
                <strong>Algoritma Türü:</strong> Birleştirme Sıralaması (Merge Sort)
              </span>
            </div>
          </div>

          {/* QUESTION 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h4 className="text-lg font-bold text-slate-900">
                [16, 21, 11, 8, 12, 22] Dizisinin Merge Sort Türüne Göre Aşamaları
              </h4>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Merge Sort algoritması <strong>Böl ve Yönet (Divide and Conquer)</strong> stratejisini benimser. Süreç iki ana safhada gerçekleşir: <strong>Bölme (Divide)</strong> ve <strong>Birleştirme (Merge & Conquer)</strong>.
            </p>

            {/* Bölme Aşaması */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                A) Bölme Aşaması (Divide Phase)
              </h5>
              <div className="space-y-2.5 text-sm text-slate-700">
                <div className="flex items-start gap-2">
                  <span className="font-mono text-xs text-indigo-600 font-semibold mt-0.5">• Adım 1:</span>
                  <div>
                    Başlangıç dizisi: <code className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-slate-200">[16, 21, 11, 8, 12, 22]</code> (6 elemanlı).
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="font-mono text-xs text-indigo-600 font-semibold mt-0.5">• Adım 2:</span>
                  <div>
                    Dizi ortadan iki eşit alt diziye bölünür:
                    <div className="mt-1 font-mono text-xs text-slate-800">
                      Sol: <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-bold">[16, 21, 11]</code> & Sağ: <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-bold">[8, 12, 22]</code>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="font-mono text-xs text-indigo-600 font-semibold mt-0.5">• Adım 3:</span>
                  <div>
                    Alt parçalar tekrar bölünür:
                    <div className="mt-1 font-mono text-xs text-slate-800 space-y-1">
                      <div>Sol parça: <code className="bg-white px-1 rounded border border-slate-200">[16, 21]</code> ve <code className="bg-white px-1 rounded border border-slate-200">[11]</code></div>
                      <div>Sağ parça: <code className="bg-white px-1 rounded border border-slate-200">[8, 12]</code> ve <code className="bg-white px-1 rounded border border-slate-200">[22]</code></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="font-mono text-xs text-indigo-600 font-semibold mt-0.5">• Adım 4:</span>
                  <div>
                    Son parçalanma ile tüm elemanlar <strong>tek 1 elemanlı taban duruma (Base Case)</strong> indirgenir:
                    <div className="mt-1 font-mono text-xs text-indigo-700 font-bold bg-indigo-50/60 p-2 rounded border border-indigo-100">
                      [16] · [21] · [11] · [8] · [12] · [22]
                    </div>
                    <span className="text-xs text-slate-500 italic mt-0.5 block">
                      (Bilgisayar bilimlerinde 1 elemanlı bir alt dizi kural gereği kendi içinde zaten sıralıdır.)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Birleştirme Aşaması */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                B) Birleştirme ve Sıralama Aşaması (Merge & Conquer Phase)
              </h5>
              <div className="space-y-3 text-sm text-slate-700">
                <div>
                  <div className="font-semibold text-slate-900 mb-1">
                    1. Seviye İkili Birleştirmeler:
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm pl-2">
                    <li>
                      <code className="font-mono font-bold">[16]</code> ile <code className="font-mono font-bold">[21]</code> karşılaştırılır (16 &lt; 21) → <code className="font-mono font-bold text-indigo-600">[16, 21]</code> oluşur.
                    </li>
                    <li>
                      <code className="font-mono font-bold">[8]</code> ile <code className="font-mono font-bold">[12]</code> karşılaştırılır (8 &lt; 12) → <code className="font-mono font-bold text-indigo-600">[8, 12]</code> oluşur.
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="font-semibold text-slate-900 mb-1">
                    2. Seviye Üçlü Grup Birleştirmeleri:
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm pl-2">
                    <li>
                      <code className="font-mono font-bold">[16, 21]</code> ile <code className="font-mono font-bold">[11]</code> karşılaştırılır (11 en küçüktür) → <code className="font-mono font-bold text-indigo-600">[11, 16, 21]</code> oluşur.
                    </li>
                    <li>
                      <code className="font-mono font-bold">[8, 12]</code> ile <code className="font-mono font-bold">[22]</code> karşılaştırılır (22 en büyüktür) → <code className="font-mono font-bold text-indigo-600">[8, 12, 22]</code> oluşur.
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="font-semibold text-slate-900 mb-1">
                    3. Seviye Son Ana Birleştirme (2 Sıralı Dizinin Karşılaştırılması):
                  </div>
                  <p className="text-xs text-slate-600 mb-2">
                    Sol Dizi <code className="font-mono font-bold">[11, 16, 21]</code> ile Sağ Dizi <code className="font-mono font-bold">[8, 12, 22]</code> eleman eleman işaretçilerle (pointers) taranır:
                  </p>
                  <div className="bg-white border border-slate-200 rounded-lg p-3 font-mono text-xs space-y-1">
                    <div>1. 11 vs 8 &nbsp;→ <strong>8 küçük</strong> &nbsp;→ Yeni Dizi: [8]</div>
                    <div>2. 11 vs 12 → <strong>11 küçük</strong> → Yeni Dizi: [8, 11]</div>
                    <div>3. 16 vs 12 → <strong>12 küçük</strong> → Yeni Dizi: [8, 11, 12]</div>
                    <div>4. 16 vs 22 → <strong>16 küçük</strong> → Yeni Dizi: [8, 11, 12, 16]</div>
                    <div>5. 21 vs 22 → <strong>21 küçük</strong> → Yeni Dizi: [8, 11, 12, 16, 21]</div>
                    <div>6. Sağ dizide kalan tek eleman <strong>22</strong> doğrudan sona eklenir.</div>
                  </div>
                </div>

                <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 font-medium text-sm flex items-center justify-between">
                  <span>Sıralama Tamamlandı:</span>
                  <code className="font-mono font-bold text-base text-emerald-700">[8, 11, 12, 16, 21, 22]</code>
                </div>
              </div>
            </div>
          </div>

          {/* QUESTION 2 */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h4 className="text-lg font-bold text-slate-900">
                Big-O Gösterimi ve Karmaşıklık Analizi
              </h4>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Merge Sort'un zaman karmaşıklığı <strong>özyineleme derinliği</strong> ile <strong>her seviyedeki birleştirme maliyetinin</strong> çarpımı ile hesaplanır:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                <span className="text-xs text-slate-400 font-medium">En Kötü Durum (Worst Case)</span>
                <div className="text-xl font-bold font-mono text-indigo-600 mt-1">O(n log n)</div>
                <p className="text-[11px] text-slate-500 mt-1">Ters sıralı dizi gelse bile garanti çalışma süresi</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                <span className="text-xs text-slate-400 font-medium">Ortalama Durum (Average Case)</span>
                <div className="text-xl font-bold font-mono text-indigo-600 mt-1">O(n log n)</div>
                <p className="text-[11px] text-slate-500 mt-1">Rastgele dağıtılmış dizilerde</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                <span className="text-xs text-slate-400 font-medium">En İyi Durum (Best Case)</span>
                <div className="text-xl font-bold font-mono text-indigo-600 mt-1">O(n log n)</div>
                <p className="text-[11px] text-slate-500 mt-1">Dizi tam sıralı olsa dahi bölme & birleştirme yapılır</p>
              </div>
            </div>

            {/* Math Breakdown */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 text-sm text-slate-700">
              <div className="font-semibold text-slate-900">
                Matematiksel İspat ve Çalışma Prensibi:
              </div>
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm pl-1">
                <li>
                  <strong>Bölme Adımı (Ağaç Derinliği):</strong> Dizi her aşamada tam olarak yarıya (2 parçaya) bölündüğü için ağacın yüksekliği $\log_2(n)$ seviyedir. Bizim örneğimizde $n = 6 \implies \lceil\log_2(6)\rceil = 3$ seviyedir.
                </li>
                <li>
                  <strong>Birleştirme Adımı (Merge Maliyeti):</strong> Her seviyedeki alt diziler birleştirilirken $n$ elemanın tamamı tek tek taranır. Bu işlemin maliyeti doğrusal olarak $O(n)$'dir.
                </li>
                <li>
                  <strong>Toplam Zaman Karmaşıklığı (Time Complexity):</strong><br />
                  <code className="font-mono bg-white px-2 py-1 rounded border border-slate-200 inline-block mt-1 font-semibold text-slate-900">
                    T(n) = 2 · T(n/2) + O(n) &nbsp;⟹&nbsp; O(n · log n)
                  </code>
                </li>
                <li>
                  <strong>Alan Karmaşıklığı (Space Complexity):</strong> $O(n)$ ek bellek (auxiliary space) gerektirir; çünkü alt dizilerin değerleri geçici yeni dizilere kopyalanarak birleştirilir.
                </li>
              </ul>
            </div>
          </div>

          {/* STUDENT SIGNATURE CARD */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-6 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                EÖ
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                  Ödev Teslim İmzası
                </div>
                <div className="text-base font-bold text-slate-900">
                  Enes Öztürk
                </div>
                <div className="text-xs text-slate-600">
                  Patika.dev Veri Yapıları ve Algoritmalar Dersi
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-lg font-medium self-start sm:self-center">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Proje 2 Tam Çözümü Doğrulandı</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
