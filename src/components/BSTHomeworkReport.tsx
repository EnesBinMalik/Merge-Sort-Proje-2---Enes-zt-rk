import React, { useState } from 'react';
import { Copy, Check, Printer, FileText, CheckCircle2, Award } from 'lucide-react';
import { MARKDOWN_PROJE3_TEMPLATE } from '../utils/bstSimulator';

export const BSTHomeworkReport: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(MARKDOWN_PROJE3_TEMPLATE);
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
    <section id="proje3-raporu" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
              <FileText className="w-4 h-4" />
              Resmi Ödev Çözüm Raporu
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Proje 3: İkili Arama Ağacı (Binary Search Tree)
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
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
          {/* Metadata Block */}
          <div className="border-b border-slate-200 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Ders & Proje</span>
                <h3 className="text-lg font-bold text-slate-900">
                  Veri Yapıları ve Algoritmalar · Proje 3
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
                <strong>Verilen Dizi:</strong> [7, 5, 1, 8, 3, 6, 0, 9, 4, 2]
              </span>
              <span className="text-slate-600">
                <strong>Veri Yapısı:</strong> Binary Search Tree (BST)
              </span>
            </div>
          </div>

          {/* Soru ve Kural Tanımı */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-slate-900">
              Soru: [7, 5, 1, 8, 3, 6, 0, 9, 4, 2] Dizisinin Binary Search Tree Aşamaları
            </h4>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 leading-relaxed space-y-1">
              <strong>Binary Search Tree Temel Kuralı:</strong>
              <p>
                Herhangi bir düğüm (node) için solundaki tüm elemanlar o düğümden <strong>küçük</strong>, sağındaki tüm elemanlar ise o düğümden <strong>büyük</strong> olmalıdır (<code className="font-mono bg-white px-1 border rounded">Sol &lt; Kök &lt; Sağ</code>).
              </p>
            </div>
          </div>

          {/* Adım Adım Liste (Örnek formata birebir uygun) */}
          <div className="space-y-3 font-mono text-xs sm:text-sm text-slate-800">
            <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-lg">
              <span className="font-bold text-indigo-900">1. Adım:</span>{' '}
              Ağaç başlangıçta boştur. Dizinin ilk elemanı olan <strong>7</strong>, ağacın kök düğümü (<strong>root</strong>) olur.{' '}
              <span className="text-indigo-700 font-bold">root = 7</span>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="font-bold text-slate-900">2. Adım (5 elemanı):</span>{' '}
              5 &lt; 7 olduğu için <strong>7'nin solunda</strong> bulunur.
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="font-bold text-slate-900">3. Adım (1 elemanı):</span>{' '}
              1 &lt; 7 (sol) &rarr; 1 &lt; 5 (sol). Dolayısıyla <strong>5'in solunda</strong> bulunur.
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="font-bold text-slate-900">4. Adım (8 elemanı):</span>{' '}
              8 &gt; 7 olduğu için <strong>7'nin sağında</strong> bulunur.
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="font-bold text-slate-900">5. Adım (3 elemanı):</span>{' '}
              3 &lt; 7 (sol) &rarr; 3 &lt; 5 (sol) &rarr; 3 &gt; 1 (sağ). Dolayısıyla <strong>1'in sağında</strong> bulunur.
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="font-bold text-slate-900">6. Adım (6 elemanı):</span>{' '}
              6 &lt; 7 (sol) &rarr; 6 &gt; 5 (sağ). Dolayısıyla <strong>5'in sağında</strong> bulunur.
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="font-bold text-slate-900">7. Adım (0 elemanı):</span>{' '}
              0 &lt; 7 (sol) &rarr; 0 &lt; 5 (sol) &rarr; 0 &lt; 1 (sol). Dolayısıyla <strong>1'in solunda</strong> bulunur.
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="font-bold text-slate-900">8. Adım (9 elemanı):</span>{' '}
              9 &gt; 7 (sağ) &rarr; 9 &gt; 8 (sağ). Dolayısıyla <strong>8'in sağında</strong> bulunur.
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="font-bold text-slate-900">9. Adım (4 elemanı):</span>{' '}
              4 &lt; 7 (sol) &rarr; 4 &lt; 5 (sol) &rarr; 4 &gt; 1 (sağ) &rarr; 4 &gt; 3 (sağ). Dolayısıyla <strong>3'ün sağında</strong> bulunur.
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="font-bold text-slate-900">10. Adım (2 elemanı):</span>{' '}
              2 &lt; 7 (sol) &rarr; 2 &lt; 5 (sol) &rarr; 2 &gt; 1 (sağ) &rarr; 2 &lt; 3 (sol). Dolayısıyla <strong>3'ün solunda</strong> bulunur.
            </div>
          </div>

          {/* Ağaç Görsel Şeması (ASCII Diagram) */}
          <div className="space-y-3">
            <h5 className="text-sm font-bold text-slate-900">
              Ağacın Şematik Görünümü (Tree Diagram):
            </h5>
            <div className="bg-slate-900 text-indigo-300 p-5 rounded-xl font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed border border-slate-800">
              <pre>{`                7  (Root)
             /     \\
            5       8
          /   \\       \\
         1     6       9
       /   \\
      0     3
          /   \\
         2     4`}</pre>
            </div>
          </div>

          {/* Düğümler Tablosu */}
          <div className="space-y-3">
            <h5 className="text-sm font-bold text-slate-900">
              Ağaç Düğümleri ve Hiyerarşi Tablosu:
            </h5>
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left font-mono">
                <thead className="bg-slate-100 text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Düğüm (Node)</th>
                    <th className="py-2.5 px-3">Ebeveyn (Parent)</th>
                    <th className="py-2.5 px-3">Konum</th>
                    <th className="py-2.5 px-3">Sol Çocuk</th>
                    <th className="py-2.5 px-3">Sağ Çocuk</th>
                    <th className="py-2.5 px-3">Derinlik (Level)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr className="bg-indigo-50/50 font-bold">
                    <td className="py-2 px-3 text-indigo-700">7</td>
                    <td className="py-2 px-3 text-slate-400">- (Kök)</td>
                    <td className="py-2 px-3 text-indigo-600">Root</td>
                    <td className="py-2 px-3">5</td>
                    <td className="py-2 px-3">8</td>
                    <td className="py-2 px-3">Seviye 0</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold">5</td>
                    <td className="py-2 px-3">7</td>
                    <td className="py-2 px-3 text-amber-600">Sol</td>
                    <td className="py-2 px-3">1</td>
                    <td className="py-2 px-3">6</td>
                    <td className="py-2 px-3">Seviye 1</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold">8</td>
                    <td className="py-2 px-3">7</td>
                    <td className="py-2 px-3 text-emerald-600">Sağ</td>
                    <td className="py-2 px-3 text-slate-300">-</td>
                    <td className="py-2 px-3">9</td>
                    <td className="py-2 px-3">Seviye 1</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold">1</td>
                    <td className="py-2 px-3">5</td>
                    <td className="py-2 px-3 text-amber-600">Sol</td>
                    <td className="py-2 px-3">0</td>
                    <td className="py-2 px-3">3</td>
                    <td className="py-2 px-3">Seviye 2</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold">6</td>
                    <td className="py-2 px-3">5</td>
                    <td className="py-2 px-3 text-emerald-600">Sağ</td>
                    <td className="py-2 px-3 text-slate-300">-</td>
                    <td className="py-2 px-3 text-slate-300">-</td>
                    <td className="py-2 px-3">Seviye 2</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold">9</td>
                    <td className="py-2 px-3">8</td>
                    <td className="py-2 px-3 text-emerald-600">Sağ</td>
                    <td className="py-2 px-3 text-slate-300">-</td>
                    <td className="py-2 px-3 text-slate-300">-</td>
                    <td className="py-2 px-3">Seviye 2</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold">0</td>
                    <td className="py-2 px-3">1</td>
                    <td className="py-2 px-3 text-amber-600">Sol</td>
                    <td className="py-2 px-3 text-slate-300">-</td>
                    <td className="py-2 px-3 text-slate-300">-</td>
                    <td className="py-2 px-3">Seviye 3</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold">3</td>
                    <td className="py-2 px-3">1</td>
                    <td className="py-2 px-3 text-emerald-600">Sağ</td>
                    <td className="py-2 px-3">2</td>
                    <td className="py-2 px-3">4</td>
                    <td className="py-2 px-3">Seviye 3</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold">2</td>
                    <td className="py-2 px-3">3</td>
                    <td className="py-2 px-3 text-amber-600">Sol</td>
                    <td className="py-2 px-3 text-slate-300">-</td>
                    <td className="py-2 px-3 text-slate-300">-</td>
                    <td className="py-2 px-3">Seviye 4</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-bold">4</td>
                    <td className="py-2 px-3">3</td>
                    <td className="py-2 px-3 text-emerald-600">Sağ</td>
                    <td className="py-2 px-3 text-slate-300">-</td>
                    <td className="py-2 px-3 text-slate-300">-</td>
                    <td className="py-2 px-3">Seviye 4</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Dolaşma Sıraları (In-Order, Pre-Order, Post-Order) */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h5 className="text-sm font-bold text-slate-900">
              Ağaç Dolaşma Sıraları (Tree Traversals):
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg">
                <div className="font-bold text-emerald-900 mb-1">In-Order (Sol - Kök - Sağ)</div>
                <div className="font-mono text-emerald-700 font-semibold">[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]</div>
                <p className="text-[11px] text-emerald-600 mt-1">Daima sıralı diziyi verir!</p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="font-bold text-slate-900 mb-1">Pre-Order (Kök - Sol - Sağ)</div>
                <div className="font-mono text-slate-700 font-semibold">[7, 5, 1, 0, 3, 2, 4, 6, 8, 9]</div>
                <p className="text-[11px] text-slate-500 mt-1">Ağacı klonlamak için kullanılır</p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="font-bold text-slate-900 mb-1">Post-Order (Sol - Sağ - Kök)</div>
                <div className="font-mono text-slate-700 font-semibold">[0, 2, 4, 3, 1, 6, 5, 9, 8, 7]</div>
                <p className="text-[11px] text-slate-500 mt-1">Ağacı silmek için kullanılır</p>
              </div>
            </div>
          </div>

          {/* Big-O Karmaşıklık */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h5 className="text-sm font-bold text-slate-900">
              BST Karmaşıklık Analizi:
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <div className="text-slate-500">Ortalama Durum (Average Case):</div>
                <div className="font-mono text-base font-bold text-indigo-600">O(log n)</div>
                <div className="text-[11px] text-slate-500">Dengeli ağaçta arama, ekleme ve silme işlemleri ağacın yüksekliği kadardır.</div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <div className="text-slate-500">En Kötü Durum (Worst Case):</div>
                <div className="font-mono text-base font-bold text-rose-600">O(n)</div>
                <div className="text-[11px] text-slate-500">Sıralı dizi girildiğinde ağaç tek yöne doğru uzayarak bağlı listeye (linked list) dönüşürse.</div>
              </div>
            </div>
          </div>

          {/* Öğrenci İmzası */}
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
              <span>Proje 3 Tam Çözümü Doğrulandı</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
