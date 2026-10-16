import React from 'react';
import { BSTStep, ALL_BST_NODES, BSTNode } from '../utils/bstSimulator';

interface BSTCanvasVisualizerProps {
  currentStep: BSTStep;
}

export const BSTCanvasVisualizer: React.FC<BSTCanvasVisualizerProps> = ({ currentStep }) => {
  const { activeNodes, currentNode, comparisonPath } = currentStep;

  // Set of node values in the current comparison path
  const pathNodeVals = new Set(comparisonPath.map((p) => p.nodeVal));

  // Determine active nodes
  const visibleNodes = activeNodes.map((val) => ALL_BST_NODES[val]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-7 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            İkili Arama Ağacı (BST) Topolojisi
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Sol alt ağaç &lt; Düğüm &lt; Sağ alt ağaç | Ağaç Derinliği: 4 seviye
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Ağaçtaki Düğüm:</span>
          <span className="bg-slate-100 px-2.5 py-1 rounded font-bold text-slate-800">
            {activeNodes.length} / 10
          </span>
        </div>
      </div>

      {/* SVG Canvas for Tree Links and Nodes */}
      <div className="relative w-full h-[400px] bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-inner select-none">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />

        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Render Branches (Edges) */}
          {visibleNodes.map((node) => {
            if (node.parentId === null) return null;
            const parent = ALL_BST_NODES[node.parentId];
            if (!parent || !activeNodes.includes(parent.value)) return null;

            const isPathEdge = pathNodeVals.has(parent.value) && pathNodeVals.has(node.value);

            return (
              <line
                key={`edge-${node.value}`}
                x1={`${parent.xPercent}%`}
                y1={parent.yPixel}
                x2={`${node.xPercent}%`}
                y2={node.yPixel}
                stroke={isPathEdge ? '#818cf8' : '#334155'}
                strokeWidth={isPathEdge ? 3 : 2}
                strokeDasharray={isPathEdge ? '4 2' : 'none'}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Render Node Circles (HTML for crisp text and tooltips) */}
        {visibleNodes.map((node) => {
          const isJustAdded = node.value === currentNode;
          const isInPath = pathNodeVals.has(node.value);

          let circleStyle = 'bg-slate-800 border-slate-600 text-white';
          if (isJustAdded) {
            circleStyle = 'bg-emerald-600 border-emerald-400 text-white ring-4 ring-emerald-500/30 shadow-lg scale-110';
          } else if (isInPath) {
            circleStyle = 'bg-indigo-600 border-indigo-400 text-white ring-2 ring-indigo-400/40 shadow';
          }

          return (
            <div
              key={`node-${node.value}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
              style={{
                left: `${node.xPercent}%`,
                top: `${node.yPixel}px`,
              }}
            >
              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 flex flex-col items-center justify-center font-mono font-extrabold text-sm sm:text-base cursor-pointer ${circleStyle}`}
                title={`Değer: ${node.value} (Seviye ${node.level}, ${node.side === 'root' ? 'Kök' : node.side === 'left' ? 'Sol Çocuk' : 'Sağ Çocuk'})`}
              >
                <span>{node.value}</span>
                {node.side === 'root' && (
                  <span className="text-[8px] font-sans text-indigo-200 uppercase -mt-1">KÖK</span>
                )}
              </div>
            </div>
          );
        })}

        {/* Level Guides */}
        <div className="absolute left-3 top-3 space-y-1 text-[10px] text-slate-500 font-mono pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
            <span className="text-slate-300">Yeni Eklenen: [{currentNode}]</span>
          </div>
          {comparisonPath.length > 1 && (
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block"></span>
              <span className="text-slate-300">Kıyaslama Yolu</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
