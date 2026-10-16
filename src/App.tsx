/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroProjectBanner } from './components/HeroProjectBanner';
import { TreeVisualizer } from './components/TreeVisualizer';
import { MergeStepPlayer } from './components/MergeStepPlayer';
import { ComparisonPointerView } from './components/ComparisonPointerView';
import { HomeworkReport } from './components/HomeworkReport';
import { BigOExplainer } from './components/BigOExplainer';
import { CodeViewer } from './components/CodeViewer';
import { QuizSection } from './components/QuizSection';

// Proje 3 (BST) Components
import { BSTHeroBanner } from './components/BSTHeroBanner';
import { BSTCanvasVisualizer } from './components/BSTCanvasVisualizer';
import { BSTStepPlayer } from './components/BSTStepPlayer';
import { BSTHomeworkReport } from './components/BSTHomeworkReport';
import { BSTCodeViewer } from './components/BSTCodeViewer';

import { Footer } from './components/Footer';
import { PROJECT_ARRAY, generateInteractiveSteps } from './utils/mergeSortSimulator';
import { BST_STEPS } from './utils/bstSimulator';

export default function App() {
  const [activeProject, setActiveProject] = useState<'proje2' | 'proje3'>('proje3');

  // Proje 2 (Merge Sort) State
  const [mergeArray, setMergeArray] = useState<number[]>(PROJECT_ARRAY);
  const [mergeStepIndex, setMergeStepIndex] = useState<number>(0);

  // Proje 3 (BST) State
  const [bstStepIndex, setBstStepIndex] = useState<number>(0);

  const mergeSteps = useMemo(() => {
    return generateInteractiveSteps(mergeArray);
  }, [mergeArray]);

  const currentMergeStep = mergeSteps[mergeStepIndex] || mergeSteps[0];
  const currentBstStep = BST_STEPS[bstStepIndex] || BST_STEPS[0];

  const isCustomMergeArray = useMemo(() => {
    if (mergeArray.length !== PROJECT_ARRAY.length) return true;
    return !mergeArray.every((v, i) => v === PROJECT_ARRAY[i]);
  }, [mergeArray]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Bar with Project Switcher & Copy Action */}
      <Header
        activeProject={activeProject}
        onSelectProject={(p) => setActiveProject(p)}
      />

      <main className="flex-1">
        {/* Render Proje 3: Binary Search Tree */}
        {activeProject === 'proje3' && (
          <div className="animate-fade-in">
            {/* Proje 3 Hero Banner */}
            <BSTHeroBanner
              onScrollToSimulator={() => scrollToSection('bst-simulator')}
              onScrollToSolution={() => scrollToSection('proje3-raporu')}
            />

            {/* Proje 3 Interactive Simulator */}
            <section id="bst-simulator" className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
                    İnteraktif Ağaç Oluşumu
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Binary Search Tree Adım Adım İnşası
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    [7, 5, 1, 8, 3, 6, 0, 9, 4, 2] dizisinin köke ve sol/sağ alt dallara yerleşimi
                  </p>
                </div>
              </div>

              {/* Step Controller */}
              <BSTStepPlayer
                currentStepIndex={bstStepIndex}
                onStepChange={(idx) => setBstStepIndex(idx)}
              />

              {/* 2D Canvas Visualizer */}
              <BSTCanvasVisualizer currentStep={currentBstStep} />
            </section>

            {/* Official Written Solution for Proje 3 */}
            <BSTHomeworkReport />

            {/* Code Implementation */}
            <BSTCodeViewer />
          </div>
        )}

        {/* Render Proje 2: Merge Sort */}
        {activeProject === 'proje2' && (
          <div className="animate-fade-in">
            {/* Proje 2 Hero Banner */}
            <HeroProjectBanner
              onScrollToSimulator={() => scrollToSection('merge-simulator')}
              onScrollToSolution={() => scrollToSection('cozum-raporu')}
            />

            {/* Proje 2 Interactive Visualizer */}
            <section id="merge-simulator" className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
                    İnteraktif Simülasyon
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Merge Sort Adım Adım Çalışma Görseli
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Dizinin nasıl ikiye ayrıldığını, tek elemana indiğini ve sıralı olarak nasıl birleştiğini izleyin.
                  </p>
                </div>
              </div>

              <MergeStepPlayer
                steps={mergeSteps}
                currentStepIndex={mergeStepIndex}
                onStepChange={(idx) => setMergeStepIndex(idx)}
                onResetToDefault={() => {
                  setMergeArray(PROJECT_ARRAY);
                  setMergeStepIndex(0);
                }}
                onCustomArraySubmit={(nums) => {
                  setMergeArray(nums);
                  setMergeStepIndex(0);
                }}
                isCustomArray={isCustomMergeArray}
              />

              <ComparisonPointerView currentStep={currentMergeStep} />
              <TreeVisualizer currentStep={currentMergeStep} />
            </section>

            {/* Proje 2 Official Homework Report */}
            <HomeworkReport />

            {/* Big-O Complexity */}
            <BigOExplainer />

            {/* Source Code */}
            <CodeViewer />

            {/* Knowledge Quiz */}
            <QuizSection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
