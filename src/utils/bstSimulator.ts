export interface BSTNode {
  value: number;
  parentId: number | null;
  side: 'left' | 'right' | 'root';
  level: number;
  xPercent: number; // 0 to 100%
  yPixel: number;
  stepInserted: number;
}

export interface BSTStep {
  step: number;
  value: number;
  title: string;
  comparisonPath: {
    nodeVal: number;
    decision: 'left' | 'right' | 'placed';
    reason: string;
  }[];
  explanation: string;
  summaryRule: string;
  activeNodes: number[]; // values in tree up to this step
  currentNode: number;
  parentOfCurrent: number | null;
  treeSnapshot: BSTNode[];
}

export const BST_PROJECT_ARRAY = [7, 5, 1, 8, 3, 6, 0, 9, 4, 2];

// Precomputed geometrical nodes following mathematical in-order projection
export const ALL_BST_NODES: Record<number, BSTNode> = {
  7: { value: 7, parentId: null, side: 'root', level: 0, xPercent: 73, yPixel: 55, stepInserted: 1 },
  5: { value: 5, parentId: 7, side: 'left', level: 1, xPercent: 53, yPixel: 130, stepInserted: 2 },
  1: { value: 1, parentId: 5, side: 'left', level: 2, xPercent: 20, yPixel: 205, stepInserted: 3 },
  8: { value: 8, parentId: 7, side: 'right', level: 1, xPercent: 86, yPixel: 130, stepInserted: 4 },
  3: { value: 3, parentId: 1, side: 'right', level: 3, xPercent: 36, yPixel: 280, stepInserted: 5 },
  6: { value: 6, parentId: 5, side: 'right', level: 2, xPercent: 63, yPixel: 205, stepInserted: 6 },
  0: { value: 0, parentId: 1, side: 'left', level: 3, xPercent: 9, yPixel: 280, stepInserted: 7 },
  9: { value: 9, parentId: 8, side: 'right', level: 2, xPercent: 94, yPixel: 205, stepInserted: 8 },
  4: { value: 4, parentId: 3, side: 'right', level: 4, xPercent: 44, yPixel: 355, stepInserted: 9 },
  2: { value: 2, parentId: 3, side: 'left', level: 4, xPercent: 28, yPixel: 355, stepInserted: 10 },
};

export const BST_STEPS: BSTStep[] = [
  {
    step: 1,
    value: 7,
    title: "1. Eleman: 7 (Kök / Root)",
    comparisonPath: [
      { nodeVal: 7, decision: 'placed', reason: "Ağaç boştur. İlk eleman olan 7, Binary Search Tree'nin Kökü (Root) olarak belirlenir." },
    ],
    explanation: "Dizinin ilk elemanı olan 7, ağacın kök düğümü (root) olarak yerleştirilir. Sonraki tüm elemanlar 7 ile kıyaslanarak sol veya sağ dala yönlendirilecektir.",
    summaryRule: "root = 7",
    activeNodes: [7],
    currentNode: 7,
    parentOfCurrent: null,
    treeSnapshot: [ALL_BST_NODES[7]],
  },
  {
    step: 2,
    value: 5,
    title: "2. Eleman: 5",
    comparisonPath: [
      { nodeVal: 7, decision: 'left', reason: "5 < 7 olduğundan 7'nin soluna gidilir. Sol çocuk boş olduğu için 5 buraya yerleşir." },
    ],
    explanation: "5 değeri kök olan 7'den küçüktür (5 < 7). Bu nedenle 7'nin soluna (left child) yerleşir.",
    summaryRule: "7'nin solunda 5 bulunur.",
    activeNodes: [7, 5],
    currentNode: 5,
    parentOfCurrent: 7,
    treeSnapshot: [ALL_BST_NODES[7], ALL_BST_NODES[5]],
  },
  {
    step: 3,
    value: 1,
    title: "3. Eleman: 1",
    comparisonPath: [
      { nodeVal: 7, decision: 'left', reason: "1 < 7 olduğundan sola (5'e) gidilir." },
      { nodeVal: 5, decision: 'left', reason: "1 < 5 olduğundan 5'in soluna gidilir. Sol çocuk boş olduğu için 1 buraya yerleşir." },
    ],
    explanation: "1 < 7 (sola git) -> 1 < 5 (sola git). 5'in sol çocuğu boştur, 1 buraya yerleşir.",
    summaryRule: "5'in solunda 1 bulunur.",
    activeNodes: [7, 5, 1],
    currentNode: 1,
    parentOfCurrent: 5,
    treeSnapshot: [ALL_BST_NODES[7], ALL_BST_NODES[5], ALL_BST_NODES[1]],
  },
  {
    step: 4,
    value: 8,
    title: "4. Eleman: 8",
    comparisonPath: [
      { nodeVal: 7, decision: 'right', reason: "8 > 7 olduğundan 7'nin sağına gidilir. Sağ çocuk boş olduğu için 8 buraya yerleşir." },
    ],
    explanation: "8 değeri kök olan 7'den büyüktür (8 > 7). Bu nedenle 7'nin sağına (right child) yerleşir.",
    summaryRule: "7'nin sağında 8 bulunur.",
    activeNodes: [7, 5, 1, 8],
    currentNode: 8,
    parentOfCurrent: 7,
    treeSnapshot: [ALL_BST_NODES[7], ALL_BST_NODES[5], ALL_BST_NODES[1], ALL_BST_NODES[8]],
  },
  {
    step: 5,
    value: 3,
    title: "5. Eleman: 3",
    comparisonPath: [
      { nodeVal: 7, decision: 'left', reason: "3 < 7 olduğundan sola (5'e) gidilir." },
      { nodeVal: 5, decision: 'left', reason: "3 < 5 olduğundan sola (1'e) gidilir." },
      { nodeVal: 1, decision: 'right', reason: "3 > 1 olduğundan 1'in sağına gidilir. Sağ çocuk boş olduğundan 3 buraya yerleşir." },
    ],
    explanation: "3 < 7 (sol) -> 3 < 5 (sol) -> 3 > 1 (sağ). 1'in sağ çocuğu boştur, 3 buraya eklenir.",
    summaryRule: "1'in sağında 3 bulunur.",
    activeNodes: [7, 5, 1, 8, 3],
    currentNode: 3,
    parentOfCurrent: 1,
    treeSnapshot: [ALL_BST_NODES[7], ALL_BST_NODES[5], ALL_BST_NODES[1], ALL_BST_NODES[8], ALL_BST_NODES[3]],
  },
  {
    step: 6,
    value: 6,
    title: "6. Eleman: 6",
    comparisonPath: [
      { nodeVal: 7, decision: 'left', reason: "6 < 7 olduğundan sola (5'e) gidilir." },
      { nodeVal: 5, decision: 'right', reason: "6 > 5 olduğundan 5'in sağına gidilir. Sağ çocuk boş olduğundan 6 buraya yerleşir." },
    ],
    explanation: "6 < 7 (sol) -> 6 > 5 (sağ). 5'in sağ çocuğu boştur, 6 buraya yerleşir.",
    summaryRule: "5'in sağında 6 bulunur.",
    activeNodes: [7, 5, 1, 8, 3, 6],
    currentNode: 6,
    parentOfCurrent: 5,
    treeSnapshot: [ALL_BST_NODES[7], ALL_BST_NODES[5], ALL_BST_NODES[1], ALL_BST_NODES[8], ALL_BST_NODES[3], ALL_BST_NODES[6]],
  },
  {
    step: 7,
    value: 0,
    title: "7. Eleman: 0",
    comparisonPath: [
      { nodeVal: 7, decision: 'left', reason: "0 < 7 olduğundan sola (5'e) gidilir." },
      { nodeVal: 5, decision: 'left', reason: "0 < 5 olduğundan sola (1'e) gidilir." },
      { nodeVal: 1, decision: 'left', reason: "0 < 1 olduğundan 1'in soluna gidilir. Sol çocuk boş olduğundan 0 buraya yerleşir." },
    ],
    explanation: "0 < 7 (sol) -> 0 < 5 (sol) -> 0 < 1 (sol). 1'in sol çocuğu boştur, 0 buraya yerleşir.",
    summaryRule: "1'in solunda 0 bulunur.",
    activeNodes: [7, 5, 1, 8, 3, 6, 0],
    currentNode: 0,
    parentOfCurrent: 1,
    treeSnapshot: [ALL_BST_NODES[7], ALL_BST_NODES[5], ALL_BST_NODES[1], ALL_BST_NODES[8], ALL_BST_NODES[3], ALL_BST_NODES[6], ALL_BST_NODES[0]],
  },
  {
    step: 8,
    value: 9,
    title: "8. Eleman: 9",
    comparisonPath: [
      { nodeVal: 7, decision: 'right', reason: "9 > 7 olduğundan sağa (8'e) gidilir." },
      { nodeVal: 8, decision: 'right', reason: "9 > 8 olduğundan 8'in sağına gidilir. Sağ çocuk boş olduğundan 9 buraya yerleşir." },
    ],
    explanation: "9 > 7 (sağ) -> 9 > 8 (sağ). 8'in sağ çocuğu boştur, 9 buraya yerleşir.",
    summaryRule: "8'in sağında 9 bulunur.",
    activeNodes: [7, 5, 1, 8, 3, 6, 0, 9],
    currentNode: 9,
    parentOfCurrent: 8,
    treeSnapshot: [ALL_BST_NODES[7], ALL_BST_NODES[5], ALL_BST_NODES[1], ALL_BST_NODES[8], ALL_BST_NODES[3], ALL_BST_NODES[6], ALL_BST_NODES[0], ALL_BST_NODES[9]],
  },
  {
    step: 9,
    value: 4,
    title: "9. Eleman: 4",
    comparisonPath: [
      { nodeVal: 7, decision: 'left', reason: "4 < 7 olduğundan sola (5'e) gidilir." },
      { nodeVal: 5, decision: 'left', reason: "4 < 5 olduğundan sola (1'e) gidilir." },
      { nodeVal: 1, decision: 'right', reason: "4 > 1 olduğundan sağa (3'e) gidilir." },
      { nodeVal: 3, decision: 'right', reason: "4 > 3 olduğundan 3'ün sağına gidilir. Sağ çocuk boş olduğundan 4 buraya yerleşir." },
    ],
    explanation: "4 < 7 (sol) -> 4 < 5 (sol) -> 4 > 1 (sağ) -> 4 > 3 (sağ). 3'ün sağ çocuğu boştur, 4 buraya yerleşir.",
    summaryRule: "3'ün sağında 4 bulunur.",
    activeNodes: [7, 5, 1, 8, 3, 6, 0, 9, 4],
    currentNode: 4,
    parentOfCurrent: 3,
    treeSnapshot: [ALL_BST_NODES[7], ALL_BST_NODES[5], ALL_BST_NODES[1], ALL_BST_NODES[8], ALL_BST_NODES[3], ALL_BST_NODES[6], ALL_BST_NODES[0], ALL_BST_NODES[9], ALL_BST_NODES[4]],
  },
  {
    step: 10,
    value: 2,
    title: "10. Eleman: 2",
    comparisonPath: [
      { nodeVal: 7, decision: 'left', reason: "2 < 7 olduğundan sola (5'e) gidilir." },
      { nodeVal: 5, decision: 'left', reason: "2 < 5 olduğundan sola (1'e) gidilir." },
      { nodeVal: 1, decision: 'right', reason: "2 > 1 olduğundan sağa (3'e) gidilir." },
      { nodeVal: 3, decision: 'left', reason: "2 < 3 olduğundan 3'ün soluna gidilir. Sol çocuk boş olduğundan 2 buraya yerleşir." },
    ],
    explanation: "2 < 7 (sol) -> 2 < 5 (sol) -> 2 > 1 (sağ) -> 2 < 3 (sol). 3'ün sol çocuğu boştur, 2 buraya yerleşir. Tüm elemanlar ağaca eklendi!",
    summaryRule: "3'ün solunda 2 bulunur.",
    activeNodes: [7, 5, 1, 8, 3, 6, 0, 9, 4, 2],
    currentNode: 2,
    parentOfCurrent: 3,
    treeSnapshot: Object.values(ALL_BST_NODES),
  },
];

export const MARKDOWN_PROJE3_TEMPLATE = `# Patika.dev - Veri Yapıları ve Algoritmalar
## Proje 3: İkili Arama Ağacı (Binary Search Tree - BST)
**Öğrenci / Hazırlayan:** Enes Öztürk  
**Tarih:** 16 Ekim 2026  
**Dizi:** \`[7, 5, 1, 8, 3, 6, 0, 9, 4, 2]\`  

---

### Soru: Yukarıdaki dizinin Binary Search Tree (BST) aşamalarını yazınız.

Binary Search Tree kuralı gereğince:
- Her düğümün **solundaki (left child)** elemanlar o düğümden **küçük** olmalıdır.
- Her düğümün **sağındaki (right child)** elemanlar o düğümden **büyük** olmalıdır.

---

### Adım Adım BST Oluşum Aşamaları:

1. **root 7'dir.**  
   Ağaç başlangıçta boştur. Dizinin ilk elemanı olan **7**, ağacın kök düğümü (root) olarak yerleşir.

2. **5 elemanı için:**  
   $5 < 7$ olduğu için **7'nin solunda** bulunur.

3. **1 elemanı için:**  
   $1 < 7$ (sol) $\\rightarrow$ $1 < 5$ (sol). Dolayısıyla **5'in solunda** bulunur.

4. **8 elemanı için:**  
   $8 > 7$ olduğu için **7'nin sağında** bulunur.

5. **3 elemanı için:**  
   $3 < 7$ (sol) $\\rightarrow$ $3 < 5$ (sol) $\\rightarrow$ $3 > 1$ (sağ). Dolayısıyla **1'in sağında** bulunur.

6. **6 elemanı için:**  
   $6 < 7$ (sol) $\\rightarrow$ $6 > 5$ (sağ). Dolayısıyla **5'in sağında** bulunur.

7. **0 elemanı için:**  
   $0 < 7$ (sol) $\\rightarrow$ $0 < 5$ (sol) $\\rightarrow$ $0 < 1$ (sol). Dolayısıyla **1'in solunda** bulunur.

8. **9 elemanı için:**  
   $9 > 7$ (sağ) $\\rightarrow$ $9 > 8$ (sağ). Dolayısıyla **8'in sağında** bulunur.

9. **4 elemanı için:**  
   $4 < 7$ (sol) $\\rightarrow$ $4 < 5$ (sol) $\\rightarrow$ $4 > 1$ (sağ) $\\rightarrow$ $4 > 3$ (sağ). Dolayısıyla **3'ün sağında** bulunur.

10. **2 elemanı için:**  
    $2 < 7$ (sol) $\\rightarrow$ $2 < 5$ (sol) $\\rightarrow$ $2 > 1$ (sağ) $\\rightarrow$ $2 < 3$ (sol). Dolayısıyla **3'ün solunda** bulunur.

---

### Ağacın Şematik Görünümü (Tree Topology):

\`\`\`
                 7  (Root)
              /     \\
             5       8
           /   \\       \\
          1     6       9
        /   \\
       0     3
           /   \\
          2     4
\`\`\`

---

### Ağaç Düğümleri Özeti:

| Düğüm (Node) | Ebeveyn (Parent) | Konum (Side) | Sol Çocuk | Sağ Çocuk | Derinlik (Level) |
|:---:|:---:|:---:|:---:|:---:|:---:|
| **7** | *Yok (Kök)* | Root | 5 | 8 | Seviye 0 |
| **5** | 7 | Sol | 1 | 6 | Seviye 1 |
| **8** | 7 | Sağ | - | 9 | Seviye 1 |
| **1** | 5 | Sol | 0 | 3 | Seviye 2 |
| **6** | 5 | Sağ | - | - | Seviye 2 |
| **9** | 8 | Sağ | - | - | Seviye 2 |
| **0** | 1 | Sol | - | - | Seviye 3 |
| **3** | 1 | Sağ | 2 | 4 | Seviye 3 |
| **2** | 3 | Sol | - | - | Seviye 4 |
| **4** | 3 | Sağ | - | - | Seviye 4 |

---

### Dolaşma Sıraları (Tree Traversals):
- **In-Order Traversal (Sol - Kök - Sağ):** \`0, 1, 2, 3, 4, 5, 6, 7, 8, 9\` *(BST'de In-Order dolaşım daima küçükten büyüğe sıralı listeyi verir!)*
- **Pre-Order Traversal (Kök - Sol - Sağ):** \`7, 5, 1, 0, 3, 2, 4, 6, 8, 9\`
- **Post-Order Traversal (Sol - Sağ - Kök):** \`0, 2, 4, 3, 1, 6, 5, 9, 8, 7\`

---

### Big-O Zaman Karmaşıklığı Analizi:
- **Arama (Search):** Ortalama $O(\\log n)$, En Kötü $O(n)$ *(çarpık ağaç durumunda)*
- **Ekleme (Insertion):** Ortalama $O(\\log n)$, En Kötü $O(n)$
- **Silme (Deletion):** Ortalama $O(\\log n)$, En Kötü $O(n)$
- **Alan Karmaşıklığı (Space Complexity):** $O(n)$

---
**Hazırlayan:** Enes Öztürk  
`;
