import React, { useState } from 'react';
import { Copy, Check, FileText, Printer } from 'lucide-react';
import { MARKDOWN_HOMEWORK_TEMPLATE } from '../utils/mergeSortSimulator';
import { MARKDOWN_PROJE3_TEMPLATE } from '../utils/bstSimulator';

interface HeaderProps {
  activeProject: 'proje2' | 'proje3';
  onSelectProject: (p: 'proje2' | 'proje3') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeProject, onSelectProject }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const textToCopy =
      activeProject === 'proje2' ? MARKDOWN_HOMEWORK_TEMPLATE : MARKDOWN_PROJE3_TEMPLATE;
    try {
      await navigator.clipboard.writeText(textToCopy);
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <a href="#" className="text-sm sm:text-base font-bold tracking-tight text-slate-900 whitespace-nowrap flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block"></span>
            Veri Yapıları & Algoritmalar
          </a>
        </div>

        {/* Zone 2: Project Switcher Tabs (Functional interactive buttons) */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => onSelectProject('proje2')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              activeProject === 'proje2'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Proje 2: Merge Sort
          </button>
          <button
            onClick={() => onSelectProject('proje3')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              activeProject === 'proje3'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Proje 3: Binary Search Tree
          </button>
        </div>

        {/* Zone 3: 1 primary action button + print icon */}
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
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-indigo-600 transition-colors whitespace-nowrap shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {activeProject === 'proje2' ? 'Proje 2 Kopyala' : 'Proje 3 Kopyala'}
                </span>
                <span className="sm:hidden">Kopyala</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
