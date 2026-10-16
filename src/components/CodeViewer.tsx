import React, { useState } from 'react';
import { Copy, Check, Code2 } from 'lucide-react';

const PYTHON_CODE = `# Merge Sort (Birleştirme Sıralaması) İmplementasyonu
# Hazırlayan: Enes Öztürk

def merge_sort(arr):
    # Taban Durum (Base Case): Dizi 1 veya daha az elemanlıysa zaten sıralıdır
    if len(arr) <= 1:
        return arr

    # 1. BÖLME (DIVIDE): Diziyi ortadan ikiye böl
    mid = len(arr) // 2
    left_half = merge_sort(arr[:mid])
    right_half = merge_sort(arr[mid:])

    # 2. BİRLEŞTİRME (MERGE & CONQUER): İki sıralı yarıyı birleştir
    return merge(left_half, right_half)


def merge(left, right):
    sorted_arr = []
    i = j = 0

    # İki alt dizinin elemanlarını karşılaştırarak küçük olanı ekle
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            sorted_arr.append(left[i])
            i += 1
        else:
            sorted_arr.append(right[j])
            j += 1

    # Kalan elemanları (varsa) sonuca ekle
    sorted_arr.extend(left[i:])
    sorted_arr.extend(right[j:])
    return sorted_arr


# Proje 2 Örnek Dizisi
orijinal_dizi = [16, 21, 11, 8, 12, 22]
sirali_dizi = merge_sort(orijinal_dizi)
print("Sıralanmış Dizi:", sirali_dizi)
# Çıktı: [8, 11, 12, 16, 21, 22]
`;

const TS_CODE = `/**
 * Merge Sort (Birleştirme Sıralaması) İmplementasyonu
 * Hazırlayan: Enes Öztürk
 */

export function mergeSort(arr: number[]): number[] {
  // Taban Durum (Base Case): 1 elemanlı dizi sıralıdır
  if (arr.length <= 1) {
    return arr;
  }

  // 1. Bölme (Divide)
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  // 2. Birleştirme (Merge)
  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0;
  let j = 0;

  // İki işaretçi ile karşılaştırarak sıralı ekle
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // Kalan elemanları sona ekle
  return result.concat(left.slice(i)).concat(right.slice(j));
}

// Proje 2 Testi
const testArray = [16, 21, 11, 8, 12, 22];
console.log(mergeSort(testArray)); // [8, 11, 12, 16, 21, 22]
`;

export const CodeViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'python' | 'ts'>('python');
  const [copied, setCopied] = useState(false);

  const currentCode = activeTab === 'python' ? PYTHON_CODE : TS_CODE;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="kod-ornekleri" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
              <Code2 className="w-4 h-4" />
              Referans Kod İmplementasyonu
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Merge Sort Kod Yapısı
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Türkçe satır açıklamalı Python ve TypeScript algoritmik kodu
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Tabs */}
            <div className="flex bg-slate-200/80 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('python')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === 'python' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Python
              </button>
              <button
                onClick={() => setActiveTab('ts')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeTab === 'ts' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                TypeScript / JS
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Kodu Kopyala</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Code Box */}
        <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
          <div className="flex items-center justify-between px-5 py-3 bg-slate-950 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="text-xs font-mono text-slate-400 ml-2">
                merge_sort.{activeTab === 'python' ? 'py' : 'ts'}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Hazırlayan: Enes Öztürk
            </span>
          </div>

          <pre className="p-6 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto leading-relaxed">
            <code>{currentCode}</code>
          </pre>
        </div>
      </div>
    </section>
  );
};
