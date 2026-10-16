import React, { useState } from 'react';
import { Copy, Check, FileText, Printer } from 'lucide-react';
import { MARKDOWN_HOMEWORK_TEMPLATE } from '../utils/mergeSortSimulator';

interface HeaderProps {
  onCopySuccess?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(MARKDOWN_HOMEWORK_TEMPLATE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a href="#simulator" className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block"></span>
          Merge Sort Proje 2
        </a>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#simulator" className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0">
            Simülatör
          </a>
          <a href="#cozum-raporu" className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0">
            Aşama Çözümü
          </a>
          <a href="#big-o-analizi" className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0">
            Big-O Analizi
          </a>
          <a href="#kod-ornekleri" className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0">
            Kod Örnekleri
          </a>
          <a href="#bilgi-testi" className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0">
            Bilgi Testi
          </a>
        </nav>

        {/* Zone 3: 1 primary action button + print icon button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handlePrint}
            title="Ödevi Yazdır / PDF Al"
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Ödevi Yazdır"
          >
            <Printer className="w-4 h-4" />
          </button>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-indigo-600 transition-colors whitespace-nowrap shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Ödev Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Ödevi Kopyala (Markdown)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
