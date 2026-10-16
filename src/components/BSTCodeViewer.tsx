import React, { useState } from 'react';
import { Copy, Check, Code2 } from 'lucide-react';

const PYTHON_BST_CODE = `# Binary Search Tree (İkili Arama Ağacı) İmplementasyonu
# Hazırlayan: Enes Öztürk

class Node:
    def __init__(self, key):
        self.val = key
        self.left = None
        self.right = None

class BinarySearchTree:
    def __init__(self):
        self.root = None

    def insert(self, key):
        if self.root is None:
            self.root = Node(key)
        else:
            self._insert_recursive(self.root, key)

    def _insert_recursive(self, current, key):
        # Kural: Küçükler SOLA, Büyükler SAĞA
        if key < current.val:
            if current.left is None:
                current.left = Node(key)
            else:
                self._insert_recursive(current.left, key)
        elif key > current.val:
            if current.right is None:
                current.right = Node(key)
            else:
                self._insert_recursive(current.right, key)

    def in_order_traversal(self, node, result=None):
        if result is None:
            result = []
        if node:
            self.in_order_traversal(node.left, result)
            result.append(node.val)
            self.in_order_traversal(node.right, result)
        return result

# Proje 3 Test Dizisi
dizi = [7, 5, 1, 8, 3, 6, 0, 9, 4, 2]
bst = BinarySearchTree()
for sayi in dizi:
    bst.insert(sayi)

print("Kök (Root):", bst.root.val) # 7
print("In-Order Sıralı Dolaşım:", bst.in_order_traversal(bst.root))
# Çıktı: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
`;

const TS_BST_CODE = `/**
 * Binary Search Tree (İkili Arama Ağacı) İmplementasyonu
 * Hazırlayan: Enes Öztürk
 */

export class BSTNode {
  value: number;
  left: BSTNode | null = null;
  right: BSTNode | null = null;

  constructor(val: number) {
    this.value = val;
  }
}

export class BinarySearchTree {
  root: BSTNode | null = null;

  insert(val: number): void {
    const newNode = new BSTNode(val);
    if (!this.root) {
      this.root = newNode; // İlk eleman root olur
      return;
    }
    this.insertNode(this.root, newNode);
  }

  private insertNode(node: BSTNode, newNode: BSTNode): void {
    // Kural: Küçük sola, büyük sağa
    if (newNode.value < node.value) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else if (newNode.value > node.value) {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  inOrder(node: BSTNode | null = this.root, result: number[] = []): number[] {
    if (node) {
      this.inOrder(node.left, result);
      result.push(node.value);
      this.inOrder(node.right, result);
    }
    return result;
  }
}

// Proje 3 Testi: [7, 5, 1, 8, 3, 6, 0, 9, 4, 2]
const tree = new BinarySearchTree();
[7, 5, 1, 8, 3, 6, 0, 9, 4, 2].forEach(n => tree.insert(n));
console.log("Root:", tree.root?.value); // 7
console.log("In-Order:", tree.inOrder()); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
`;

export const BSTCodeViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'python' | 'ts'>('python');
  const [copied, setCopied] = useState(false);

  const currentCode = activeTab === 'python' ? PYTHON_BST_CODE : TS_BST_CODE;

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
    <section id="proje3-kod" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
              <Code2 className="w-4 h-4" />
              Referans BST Kodu
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Binary Search Tree Kod Mimarisi
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Python ve TypeScript ile nesne yönelimli BST ve In-Order dolaşım
            </p>
          </div>

          <div className="flex items-center gap-3">
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

        <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
          <div className="flex items-center justify-between px-5 py-3 bg-slate-950 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="text-xs font-mono text-slate-400 ml-2">
                binary_search_tree.{activeTab === 'python' ? 'py' : 'ts'}
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
