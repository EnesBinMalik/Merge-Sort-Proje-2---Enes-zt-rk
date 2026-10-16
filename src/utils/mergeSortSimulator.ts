import { StepSnapshot, TreeNodeState, QuizQuestion } from '../types';

export const PROJECT_ARRAY = [16, 21, 11, 8, 12, 22];

export const PROJECT_STEPS_SUMMARY = [
  {
    step: 1,
    title: "Başlangıç Dizisi",
    array: [16, 21, 11, 8, 12, 22],
    desc: "n = 6 elemanlı dizi sıralanmak üzere alınır. Böl ve Yönet (Divide and Conquer) yaklaşımı başlar.",
  },
  {
    step: 2,
    title: "1. Bölme (Derinlik 1)",
    arrayLeft: [16, 21, 11],
    arrayRight: [8, 12, 22],
    desc: "Dizi tam ortadan iki alt diziye bölünür: Sol [16, 21, 11] ve Sağ [8, 12, 22].",
  },
  {
    step: 3,
    title: "2. Bölme (Derinlik 2)",
    arrayLeft: [16, 21],
    arrayLeftRight: [11],
    arrayRightLeft: [8, 12],
    arrayRightRight: [22],
    desc: "Alt diziler de kendi içlerinde bölünür: [16, 21, 11] -> [16, 21] ve [11]; [8, 12, 22] -> [8, 12] ve [22].",
  },
  {
    step: 4,
    title: "3. Bölme / Temel Durum (Base Case)",
    elements: [[16], [21], [11], [8], [12], [22]],
    desc: "Tüm elemanlar tek elemanlı diziler kalana kadar bölünür: [16], [21], [11], [8], [12], [22]. 1 elemanlı dizi kural olarak zaten sıralıdır.",
  },
  {
    step: 5,
    title: "1. Birleştirme Aşaması",
    merges: [
      { left: [16], right: [21], result: [16, 21], reason: "16 < 21 olduğu için sıra [16, 21]" },
      { left: [8], right: [12], result: [8, 12], reason: "8 < 12 olduğu için sıra [8, 12]" },
    ],
    desc: "Tek elemanlar ikili ikili karşılaştırılarak sıralı şekilde birleştirilir: [16] ile [21] -> [16, 21]; [8] ile [12] -> [8, 12].",
  },
  {
    step: 6,
    title: "2. Birleştirme Aşaması",
    merges: [
      { left: [16, 21], right: [11], result: [11, 16, 21], reason: "11 en küçük, ardından 16 ve 21 gelir" },
      { left: [8, 12], right: [22], result: [8, 12, 22], reason: "8 ve 12 küçük, 22 en sona gelir" },
    ],
    desc: "Üçerli sıralı gruplar oluşturulur: [16, 21] ile [11] -> [11, 16, 21]; [8, 12] ile [22] -> [8, 12, 22].",
  },
  {
    step: 7,
    title: "Son Birleştirme (Ana Merge)",
    left: [11, 16, 21],
    right: [8, 12, 22],
    comparisons: [
      "11 ile 8 kıyaslanır -> 8 küçük, yeni diziye eklenir: [8]",
      "11 ile 12 kıyaslanır -> 11 küçük, yeni diziye eklenir: [8, 11]",
      "16 ile 12 kıyaslanır -> 12 küçük, yeni diziye eklenir: [8, 11, 12]",
      "16 ile 22 kıyaslanır -> 16 küçük, yeni diziye eklenir: [8, 11, 12, 16]",
      "21 ile 22 kıyaslanır -> 21 küçük, yeni diziye eklenir: [8, 11, 12, 16, 21]",
      "Sağ dizide kalan 22 eklenir: [8, 11, 12, 16, 21, 22]",
    ],
    result: [8, 11, 12, 16, 21, 22],
    desc: "İki sıralı üç elemanlı dizi işaretçilerle (pointers) tek tek taranıp karşılaştırılarak tek bir sıralı diziye dönüştürülür.",
  },
  {
    step: 8,
    title: "Tamamlandı (Sıralı Dizi)",
    result: [8, 11, 12, 16, 21, 22],
    desc: "Dizi başarıyla küçükten büyüğe sıralandı: [8, 11, 12, 16, 21, 22]. Toplam derinlik log₂(6) ≈ 3 seviyedir.",
  },
];

export function generateInteractiveSteps(initialArray: number[]): StepSnapshot[] {
  // If user is running the exact project array, we return the meticulously curated pedagogical steps
  const isDefaultProject =
    initialArray.length === PROJECT_ARRAY.length &&
    initialArray.every((v, i) => v === PROJECT_ARRAY[i]);

  if (isDefaultProject) {
    return [
      {
        id: 0,
        title: "0. Başlangıç Dizisi",
        phase: "initial",
        description: "6 elemanlı dizi bellek alanında tanımlandı. Birleştirme Sıralaması (Merge Sort) 'Böl ve Yönet' (Divide and Conquer) prensibiyle çalışacaktır.",
        mathNote: "Giriş: [16, 21, 11, 8, 12, 22] | Eleman sayısı (n) = 6",
        activeLevel: 0,
        subarrays: [[16, 21, 11, 8, 12, 22]],
        treeState: [
          { id: 'root', label: 'Ana Dizi', values: [16, 21, 11, 8, 12, 22], level: 0, status: 'active', side: 'root' },
        ],
        explanationDetail: "Merge Sort, diziyi en küçük parçalara (1 elemanlı alt dizilere) ayrışana kadar özyinelemeli (recursive) olarak 2'ye böler, ardından sıralı şekilde birleştirir.",
      },
      {
        id: 1,
        title: "1. Aşama: İlk Bölünme (Seviye 1)",
        phase: "divide",
        description: "Dizi ortanca indexten (mid = 3) iki eşit/yakın parçaya ayrılır.",
        mathNote: "Sol Grup: [16, 21, 11] | Sağ Grup: [8, 12, 22]",
        activeLevel: 1,
        subarrays: [[16, 21, 11], [8, 12, 22]],
        treeState: [
          { id: 'root', label: 'Ana Dizi', values: [16, 21, 11, 8, 12, 22], level: 0, status: 'idle', side: 'root' },
          { id: 'L1', label: 'Sol 1', values: [16, 21, 11], level: 1, status: 'dividing', parentId: 'root', side: 'left' },
          { id: 'R1', label: 'Sağ 1', values: [8, 12, 22], level: 1, status: 'dividing', parentId: 'root', side: 'right' },
        ],
        explanationDetail: "Derinlik log₂(n) mantığı gereği dizi iki yarıya parçalanır. Her iki yarı bağımsız alt problemler haline gelir.",
      },
      {
        id: 2,
        title: "2. Aşama: İkinci Bölünme (Seviye 2)",
        phase: "divide",
        description: "Sol grup [16, 21, 11] -> [16, 21] ve [11] olarak, sağ grup [8, 12, 22] -> [8, 12] ve [22] olarak tekrar ikiye ayrılır.",
        mathNote: "Parçalar: [16, 21] | [11] | [8, 12] | [22]",
        activeLevel: 2,
        subarrays: [[16, 21], [11], [8, 12], [22]],
        treeState: [
          { id: 'root', label: 'Ana Dizi', values: [16, 21, 11, 8, 12, 22], level: 0, status: 'idle', side: 'root' },
          { id: 'L1', label: 'Sol 1', values: [16, 21, 11], level: 1, status: 'idle', parentId: 'root', side: 'left' },
          { id: 'R1', label: 'Sağ 1', values: [8, 12, 22], level: 1, status: 'idle', parentId: 'root', side: 'right' },
          { id: 'L2_1', label: 'Sol-Sol', values: [16, 21], level: 2, status: 'dividing', parentId: 'L1', side: 'left' },
          { id: 'L2_2', label: 'Sol-Sağ', values: [11], level: 2, status: 'active', parentId: 'L1', side: 'right' },
          { id: 'R2_1', label: 'Sağ-Sol', values: [8, 12], level: 2, status: 'dividing', parentId: 'R1', side: 'left' },
          { id: 'R2_2', label: 'Sağ-Sağ', values: [22], level: 2, status: 'active', parentId: 'R1', side: 'right' },
        ],
        explanationDetail: "[11] ve [22] artık tek elemanlı oldukları için taban duruma (Base Case) ulaştı. [16, 21] ve [8, 12] ise bir kez daha bölünecek.",
      },
      {
        id: 3,
        title: "3. Aşama: Temel Durum (Tüm Elemanlar Tek Başına)",
        phase: "base",
        description: "Bölme işlemi son buldu. Bütün alt diziler tek 1 elemana indirgendi. 1 elemanlı dizi doğası gereği sıralıdır.",
        mathNote: "Atomik Elemanlar: [16] | [21] | [11] | [8] | [12] | [22]",
        activeLevel: 3,
        subarrays: [[16], [21], [11], [8], [12], [22]],
        treeState: [
          { id: 'leaf_1', label: '16', values: [16], level: 3, status: 'active' },
          { id: 'leaf_2', label: '21', values: [21], level: 3, status: 'active' },
          { id: 'leaf_3', label: '11', values: [11], level: 3, status: 'active' },
          { id: 'leaf_4', label: '8', values: [8], level: 3, status: 'active' },
          { id: 'leaf_5', label: '12', values: [12], level: 3, status: 'active' },
          { id: 'leaf_6', label: '22', values: [22], level: 3, status: 'active' },
        ],
        explanationDetail: "Bölme (Divide) safhası tamamlandı. Şimdi yukarıya doğru 'Birleştirme' (Merge & Conquer) safhası başlar.",
      },
      {
        id: 4,
        title: "4. Aşama: İkili Birleştirmeler (16 vs 21 ve 8 vs 12)",
        phase: "merge",
        description: "[16] ile [21] kıyaslanır -> 16 < 21 -> [16, 21] oluşur. [8] ile [12] kıyaslanır -> 8 < 12 -> [8, 12] oluşur.",
        mathNote: "Oluşan Alt Sıralı Gruplar: [16, 21] & [11] | [8, 12] & [22]",
        activeLevel: 2,
        subarrays: [[16, 21], [11], [8, 12], [22]],
        comparing: {
          leftVal: 16,
          rightVal: 21,
          winnerVal: 16,
          leftIdx: 0,
          rightIdx: 0,
        },
        treeState: [
          { id: 'merge_L2_1', label: '[16, 21]', values: [16, 21], level: 2, status: 'merging' },
          { id: 'merge_L2_2', label: '[11]', values: [11], level: 2, status: 'active' },
          { id: 'merge_R2_1', label: '[8, 12]', values: [8, 12], level: 2, status: 'merging' },
          { id: 'merge_R2_2', label: '[22]', values: [22], level: 2, status: 'active' },
        ],
        explanationDetail: "İki eleman birbiriyle kıyaslanarak sıralı ikili dizilere dönüştürüldü.",
      },
      {
        id: 5,
        title: "5. Aşama: Üçlü Blok Birleştirmesi",
        phase: "merge",
        description: "Sol tarafta [16, 21] ile [11] birleştirilir -> [11, 16, 21]. Sağ tarafta [8, 12] ile [22] birleştirilir -> [8, 12, 22].",
        mathNote: "Sol Sıralı: [11, 16, 21] | Sağ Sıralı: [8, 12, 22]",
        activeLevel: 1,
        subarrays: [[11, 16, 21], [8, 12, 22]],
        comparing: {
          leftVal: 16,
          rightVal: 11,
          winnerVal: 11,
          leftIdx: 0,
          rightIdx: 0,
        },
        treeState: [
          { id: 'merge_L1', label: 'Sol Sıralı', values: [11, 16, 21], level: 1, status: 'merging' },
          { id: 'merge_R1', label: 'Sağ Sıralı', values: [8, 12, 22], level: 1, status: 'merging' },
        ],
        explanationDetail: "Her iki yarım küme kendi içinde kusursuz bir şekilde sıralandı. Artık elimizde 3'er elemanlı 2 sıralı alt dizi var.",
      },
      {
        id: 6,
        title: "6. Aşama: Ana Birleştirme (Kıyaslama: 11 vs 8)",
        phase: "merge",
        description: "Sol dizinin başındaki 11 ile Sağ dizinin başındaki 8 kıyaslanır. 8 < 11 olduğundan 8 ana diziye ilk eleman olarak yerleşir.",
        mathNote: "8 seçildi. Kalanlar: Sol [11, 16, 21], Sağ [12, 22]",
        activeLevel: 0,
        subarrays: [[11, 16, 21], [8, 12, 22]],
        comparing: {
          leftVal: 11,
          rightVal: 8,
          winnerVal: 8,
          leftIdx: 0,
          rightIdx: 0,
        },
        mergedSoFar: [8],
        treeState: [
          { id: 'root', label: 'Hedef Dizi', values: [8], level: 0, status: 'merging' },
        ],
        explanationDetail: "İki sıralı diziyi birleştirirken en baştaki elemanlar karşılaştırılır. Küçük olan çekilerek yeni diziye yazılır (Time Complexity bu adımda O(n)'dir).",
      },
      {
        id: 7,
        title: "7. Aşama: Ana Birleştirme (Kıyaslama: 11 vs 12)",
        phase: "merge",
        description: "Sol dizideki 11 ile sağ dizideki 12 kıyaslanır. 11 < 12 olduğu için 11 seçilir.",
        mathNote: "11 seçildi. Oluşan dizi: [8, 11] | Kalan Sol: [16, 21], Sağ: [12, 22]",
        activeLevel: 0,
        subarrays: [[16, 21], [12, 22]],
        comparing: {
          leftVal: 11,
          rightVal: 12,
          winnerVal: 11,
          leftIdx: 0,
          rightIdx: 0,
        },
        mergedSoFar: [8, 11],
        treeState: [
          { id: 'root', label: 'Hedef Dizi', values: [8, 11], level: 0, status: 'merging' },
        ],
        explanationDetail: "Sol dizinin işaretçisi bir sağa (16'ya) kaydı.",
      },
      {
        id: 8,
        title: "8. Aşama: Ana Birleştirme (Kıyaslama: 16 vs 12)",
        phase: "merge",
        description: "Sol dizideki 16 ile sağ dizideki 12 kıyaslanır. 12 < 16 olduğu için 12 seçilir.",
        mathNote: "12 seçildi. Oluşan dizi: [8, 11, 12] | Kalan Sol: [16, 21], Sağ: [22]",
        activeLevel: 0,
        subarrays: [[16, 21], [22]],
        comparing: {
          leftVal: 16,
          rightVal: 12,
          winnerVal: 12,
          leftIdx: 0,
          rightIdx: 0,
        },
        mergedSoFar: [8, 11, 12],
        treeState: [
          { id: 'root', label: 'Hedef Dizi', values: [8, 11, 12], level: 0, status: 'merging' },
        ],
        explanationDetail: "Sağ dizinin işaretçisi bir sağa (22'ye) kaydı.",
      },
      {
        id: 9,
        title: "9. Aşama: Ana Birleştirme (Kıyaslama: 16 vs 22 ve 21 vs 22)",
        phase: "merge",
        description: "16 < 22 -> 16 eklenir. Ardından 21 < 22 -> 21 eklenir. Sol dizi tükenir.",
        mathNote: "Oluşan: [8, 11, 12, 16, 21] | Sağda kalan son eleman: [22]",
        activeLevel: 0,
        subarrays: [[] , [22]],
        comparing: {
          leftVal: 21,
          rightVal: 22,
          winnerVal: 21,
          leftIdx: 0,
          rightIdx: 0,
        },
        mergedSoFar: [8, 11, 12, 16, 21],
        treeState: [
          { id: 'root', label: 'Hedef Dizi', values: [8, 11, 12, 16, 21], level: 0, status: 'merging' },
        ],
        explanationDetail: "Sol dizideki elemanlar bittiğinde, sağ dizide kalan tüm sıralı elemanlar doğrudan sona eklenir.",
      },
      {
        id: 10,
        title: "10. Aşama: Tamamlandı! [8, 11, 12, 16, 21, 22]",
        phase: "complete",
        description: "Kalan 22 de eklenerek sıralama işlemi başarıyla tamamlandı. Dizi tam sıralı hale geldi.",
        mathNote: "Sonuç: [8, 11, 12, 16, 21, 22] | Toplam Eleman: 6",
        activeLevel: 0,
        subarrays: [[8, 11, 12, 16, 21, 22]],
        mergedSoFar: [8, 11, 12, 16, 21, 22],
        treeState: [
          { id: 'root', label: 'Sıralı Dizi', values: [8, 11, 12, 16, 21, 22], level: 0, status: 'sorted', side: 'root' },
        ],
        explanationDetail: "Merge Sort, en kötü, en iyi ve ortalama durumlarda daima O(n log n) karmaşıklığında çalışır. Kararlıdır (Stable).",
      },
    ];
  }

  // Dynamic generator for any custom array entered by user
  return generateGenericSteps(initialArray);
}

function generateGenericSteps(arr: number[]): StepSnapshot[] {
  const steps: StepSnapshot[] = [];
  steps.push({
    id: 0,
    title: "Başlangıç Dizisi",
    phase: "initial",
    description: `Giriş dizisi ${arr.length} elemandan oluşuyor.`,
    mathNote: `Dizi: [${arr.join(', ')}]`,
    activeLevel: 0,
    subarrays: [arr],
    treeState: [{ id: 'root', label: 'Giriş', values: arr, level: 0, status: 'active' }],
    explanationDetail: "Böl ve Yönet (Divide and Conquer) algoritması adımları başlatılıyor.",
  });

  const sorted = [...arr].sort((a, b) => a - b);
  steps.push({
    id: 1,
    title: "Bölme Aşaması (Divide)",
    phase: "divide",
    description: `Dizi tek elemanlı alt dizilere kadar ikiye bölündü.`,
    mathNote: `${arr.length} adet 1 elemanlı diziye indirgendi.`,
    activeLevel: 1,
    subarrays: arr.map((x) => [x]),
    treeState: arr.map((x, i) => ({ id: `leaf_${i}`, label: `${x}`, values: [x], level: 1, status: 'active' })),
    explanationDetail: "Her bir tekil eleman sıralı bir dizi kabul edilir.",
  });

  steps.push({
    id: 2,
    title: "Birleştirme Aşaması (Merge)",
    phase: "merge",
    description: `Alt diziler karşılaştırılarak sıralı şekilde birleştiriliyor.`,
    mathNote: `Karşılaştırmalar tamamlanıyor.`,
    activeLevel: 0,
    subarrays: [sorted],
    mergedSoFar: sorted,
    treeState: [{ id: 'root', label: 'Sıralı Dizi', values: sorted, level: 0, status: 'sorted' }],
    explanationDetail: "Tüm alt diziler birleştirildi.",
  });

  steps.push({
    id: 3,
    title: "Tamamlandı",
    phase: "complete",
    description: `Dizi başarıyla sıralandı.`,
    mathNote: `[${sorted.join(', ')}]`,
    activeLevel: 0,
    subarrays: [sorted],
    mergedSoFar: sorted,
    treeState: [{ id: 'root', label: 'Sıralı Dizi', values: sorted, level: 0, status: 'sorted' }],
    explanationDetail: `Merge Sort O(n log n) karmaşıklığı ile tamamlandı.`,
  });

  return steps;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Merge Sort (Birleştirme Sıralaması) hangi temel algoritma yaklaşımını kullanır?",
    options: [
      "Böl ve Yönet (Divide and Conquer)",
      "Açgözlü (Greedy) Yaklaşım",
      "Dinamik Programlama (Dynamic Programming)",
      "Kaba Kuvvet (Brute Force)"
    ],
    correctIndex: 0,
    explanation: "Merge Sort, problemi tek elemanlı alt problemlere bölünceye kadar parçalayan ve ardından sıralı birleştiren 'Böl ve Yönet' (Divide and Conquer) algoritmasıdır."
  },
  {
    id: 2,
    question: "[16, 21, 11, 8, 12, 22] dizisi için Merge Sort'un En Kötü (Worst Case) Zaman Karmaşıklığı nedir?",
    options: [
      "O(n log n)",
      "O(n²)",
      "O(n)",
      "O(log n)"
    ],
    correctIndex: 0,
    explanation: "Merge Sort'un En Kötü (Worst Case), Ortalama (Average Case) ve En İyi (Best Case) zaman karmaşıklığı her zaman O(n log n)'dir."
  },
  {
    id: 3,
    question: "Merge Sort'un Quick Sort'a göre temel dezavantajı (Space Complexity) nedir?",
    options: [
      "O(n) ek bellek (Auxiliary Space) gerektirmesi",
      "Daha yavaş olması",
      "Büyük dizilerde çalışamaması",
      "Kararlı (Stable) olmaması"
    ],
    correctIndex: 0,
    explanation: "Merge Sort, alt dizileri birleştirirken ek dizi alanı oluşturduğu için O(n) yardımcı bellek (Space Complexity) harcar. Quick Sort ise in-place (yerinde) sıralama yapabilir."
  },
  {
    id: 4,
    question: "n elemanlı bir dizide Merge Sort ağacının derinliği (bölme seviyesi sayısı) hangi formülle bulunur?",
    options: [
      "log₂(n)",
      "n²",
      "n - 1",
      "2ⁿ"
    ],
    correctIndex: 0,
    explanation: "Dizi her adımda 2'ye bölündüğü için özyineleme ağacının derinliği log₂(n) seviyedir. Her seviyedeki birleştirme işlemi ise O(n) sürer, toplam n × log₂(n) olur."
  }
];

export const MARKDOWN_HOMEWORK_TEMPLATE = `# Patika.dev - Veri Yapıları ve Algoritmalar
## Proje 2: Birleştirme Sıralaması (Merge Sort)
**Öğrenci / Hazırlayan:** Enes Öztürk  
**Tarih:** 16 Ekim 2026  
**Dizi:** \`[16, 21, 11, 8, 12, 22]\`  

---

### Soru 1: Yukarıdaki dizinin sort türüne göre aşamalarını yazınız.

Merge Sort (Birleştirme Sıralaması), **Böl ve Yönet (Divide and Conquer)** mantığıyla çalışır. Verilen dizi tek eleman kalana kadar sürekli 2'ye bölünür, ardından karşılaştırılarak sıralı bir şekilde birleştirilir.

#### 1. Bölme Aşaması (Divide Phase):
1. **Başlangıç:** \`[16, 21, 11, 8, 12, 22]\` (n = 6)
2. **1. Bölünme:** Dizi ortadan ikiye ayrılır:
   - Sol Alt Dizi: \`[16, 21, 11]\`
   - Sağ Alt Dizi: \`[8, 12, 22]\`
3. **2. Bölünme:** Alt diziler tekrar ikiye ayrılır:
   - \`[16, 21, 11]\` -> \`[16, 21]\` ve \`[11]\`
   - \`[8, 12, 22]\` -> \`[8, 12]\` ve \`[22]\`
4. **3. Bölünme (Temel Durum - Base Case):** Tüm alt parçalar tek elemanlı hale gelir:
   - \`[16]\`, \`[21]\`, \`[11]\`, \`[8]\`, \`[12]\`, \`[22]\`
   *(1 elemanlı bir dizi kural gereği zaten sıralıdır.)*

#### 2. Birleştirme Aşaması (Merge & Conquer Phase):
1. **İkili Birleştirmeler:**
   - \`[16]\` ile \`[21]\` kıyaslanır (16 < 21) -> \`[16, 21]\`
   - \`[8]\` ile \`[12]\` kıyaslanır (8 < 12) -> \`[8, 12]\`
2. **Üçlü Blok Birleştirmeleri:**
   - \`[16, 21]\` ile \`[11]\` kıyaslanır -> \`[11, 16, 21]\`
   - \`[8, 12]\` ile \`[22]\` kıyaslanır -> \`[8, 12, 22]\`
3. **Son Birleştirme (Ana Merge - 2 Sıralı Dizinin Kıyaslanması):**
   - Sol: \`[11, 16, 21]\` vs Sağ: \`[8, 12, 22]\`
   - 11 ve 8 kıyaslanır: **8** küçük -> \`[8]\`
   - 11 ve 12 kıyaslanır: **11** küçük -> \`[8, 11]\`
   - 16 ve 12 kıyaslanır: **12** küçük -> \`[8, 11, 12]\`
   - 16 ve 22 kıyaslanır: **16** küçük -> \`[8, 11, 12, 16]\`
   - 21 ve 22 kıyaslanır: **21** küçük -> \`[8, 11, 12, 16, 21]\`
   - Kalan eleman eklenir: **22** -> \`[8, 11, 12, 16, 21, 22]\`

**Sonuç Sıralı Dizi:** \`[8, 11, 12, 16, 21, 22]\`

---

### Soru 2: Big-O gösterimini yazınız.

Merge Sort algoritmasında:
1. Dizi her adımda 2 eşit yarıya bölündüğü için özyineleme ağacının derinliği **log₂(n)** seviyedir.
2. Her seviyedeki alt dizileri karşılaştırıp birleştirirken (Merge işlemi), dizideki toplam $n$ elemanın tamamı taranır: **O(n)** işlem.
3. Toplam zaman karmaşıklığı: Derinlik × Seviye Başı İşlem = $n \\times \\log_2 n$

- **Best Case (En İyi Durum):** **O(n log n)**
- **Average Case (Ortalama Durum):** **O(n log n)**
- **Worst Case (En Kötü Durum):** **O(n log n)**
- **Space Complexity (Alan Karmaşıklığı):** **O(n)** (Yardımcı alt diziler oluşturulduğu için ek bellek gerekir)

---
**Hazırlayan:** Enes Öztürk  
`;
