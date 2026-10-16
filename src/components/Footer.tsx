import React from 'react';
import { User, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-8 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-900">Merge Sort Proje 2</span>
          <span>·</span>
          <span>Patika.dev Veri Yapıları ve Algoritmalar</span>
        </div>

        <div className="flex items-center gap-1.5 font-medium text-slate-700">
          <User className="w-3.5 h-3.5 text-indigo-600" />
          <span>Hazırlayan: <strong>Enes Öztürk</strong></span>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 ml-1" />
        </div>

        <div className="text-slate-400">
          Tüm Hakları Saklıdır © 2026
        </div>
      </div>
    </footer>
  );
};
