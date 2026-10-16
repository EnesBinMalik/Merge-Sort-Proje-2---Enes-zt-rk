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
import { Footer } from './components/Footer';
import { PROJECT_ARRAY, generateInteractiveSteps } from './utils/mergeSortSimulator';

export default function App() {
  const [currentArray, setCurrentArray] = useState<number[]>(PROJECT_ARRAY);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const steps = useMemo(() => {
    return generateInteractiveSteps(currentArray);
  }, [currentArray]);

  const currentStep = steps[currentStepIndex] || steps[0];

  const isCustomArray = useMemo(() => {
    if (currentArray.length !== PROJECT_ARRAY.length) return true;
    return !currentArray.every((v, i) => v === PROJECT_ARRAY[i]);
  }, [currentArray]);

  const handleStepChange = (index: number) => {
    setCurrentStepIndex(index);
  };

  const handleResetToDefault = () => {
    setCurrentArray(PROJECT_ARRAY);
    setCurrentStepIndex(0);
  };

  const handleCustomArraySubmit = (numbers: number[]) => {
    setCurrentArray(numbers);
    setCurrentStepIndex(0);
  };

  const scrollToSimulator = () => {
    document.getElementById('simulator')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSolution = () => {
    document.getElementById('cozum-raporu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Bar Contract (3 Zones) */}
      <Header />

      <main className="flex-1">
        {/* Hero Section with Enes Öztürk Student Credentials */}
        <HeroProjectBanner
          onScrollToSimulator={scrollToSimulator}
          onScrollToSolution={scrollToSolution}
        />

        {/* Interactive Visualizer Section */}
        <section id="simulator" className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
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

          {/* Controller & Scrubber */}
          <MergeStepPlayer
            steps={steps}
            currentStepIndex={currentStepIndex}
            onStepChange={handleStepChange}
            onResetToDefault={handleResetToDefault}
            onCustomArraySubmit={handleCustomArraySubmit}
            isCustomArray={isCustomArray}
          />

          {/* Pointer Comparison View (Active during merge steps) */}
          <ComparisonPointerView currentStep={currentStep} />

          {/* Visual Divide & Conquer Tree */}
          <TreeVisualizer currentStep={currentStep} />
        </section>

        {/* Official Homework Solution Report (Printable & Markdown-Copyable) */}
        <HomeworkReport />

        {/* Big-O Complexity Deep Dive */}
        <BigOExplainer />

        {/* Source Code Implementation */}
        <CodeViewer />

        {/* Interactive Quiz */}
        <QuizSection />
      </main>

      {/* Quiet Clean Footer */}
      <Footer />
    </div>
  );
}
