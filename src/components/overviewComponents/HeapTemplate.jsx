import bulletin from "../../assets/bulletin.png";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { useRef, useEffect } from "react";
import heap1 from "../../assets/legend/heap/heap1.png";
import heap2 from "../../assets/legend/heap/heap2.png";
import heap3 from "../../assets/legend/heap/heap3.png";
import heap4 from "../../assets/legend/heap/heap4.png";
import heap5 from "../../assets/legend/heap/heap5.png";
import heap6 from "../../assets/legend/heap/heap6.png";
import heap7 from "../../assets/legend/heap/heap7.png";
import heap8 from "../../assets/legend/heap/heap8.png";

const bubbleSort = `class MaxHeap {
  constructor() {
    this.heap = [];
  }

  // Insert an element into the heap
  insert(value) {
    this.heap.push(value); // Add the value at the end of the array
    this.heapifyUp();      // Restore the heap property by bubbling up
  }

  // Heapify up to maintain the heap property (bubble-up)
  heapifyUp() {
    let index = this.heap.length - 1; // Start at the newly added element
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2); // Parent index formula

      // If the parent is greater or equal, the heap is valid
      if (this.heap[parentIndex] >= this.heap[index]) break;

      // Otherwise, swap and continue heapifying up
      [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
      index = parentIndex; // Move up to the parent
    }
  }

  // Remove the max element (the root)
  extractMax() {
    if (this.heap.length === 0) return null;  // If the heap is empty, return null

    const max = this.heap[0];        // Max value is the root
    const lastElement = this.heap.pop(); // Pop the last element

    if (this.heap.length > 0) {
      this.heap[0] = lastElement; // Replace root with the last element
      this.heapifyDown(0);        // Restore the heap property by bubbling down
    }

    return max; // Return the removed max value
  }

  // Heapify down to restore the heap property (bubble-down)
  heapifyDown(index) {
    const length = this.heap.length;
    let largest = index;

    const leftChild = 2 * index + 1;
    const rightChild = 2 * index + 2;

    // Compare with left child
    if (leftChild < length && this.heap[leftChild] > this.heap[largest]) {
      largest = leftChild;
    }

    // Compare with right child
    if (rightChild < length && this.heap[rightChild] > this.heap[largest]) {
      largest = rightChild;
    }

    // If the largest isn't the current node, swap and continue heapifying down
    if (largest !== index) {
      [this.heap[largest], this.heap[index]] = [this.heap[index], this.heap[largest]];
      this.heapifyDown(largest); // Recurse on the affected child
    }
  }

  // Get the max element (root of the heap) without removing it
  getMax() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

}`;

export default function HeapTemplate() {
  const bubble = useRef(null);

  useEffect(() => {
    if (bubble.current) {
      hljs.highlightElement(bubble.current);
    }
  }, [bubble]);
  return (
    <div className="flex flex-col ">
      <h1
        id="heap"
        className="text-[28px] pt-16 mb-8 mx-auto underline underline-offset-8 text-[#9c6644] py-2 px-8  flex  relative font-extrabold"
      >
        Heap
      </h1>

      <div className="mx-8  bg-white p-12 px-16 pb-16">
        <div className="flex flex-col ">
          <h2 className="font-bold text-2xl">Algorithm Overview</h2>
          <ul className="pl-12 mt-4 text-lg">
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">What is a Heap?</span>
                <p className="mr-16">
                  A Heap is a special tree-based data structure that satisfies
                  the heap property, where for a Max-Heap, the parent node is
                  greater than its children, and for a Min-Heap, the parent node
                  is smaller than its children. Heaps are typically used to
                  implement priority queues.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Key Concept</span>
                <p className="mr-16">
                  Heaps are complete binary trees, and the largest (Max-Heap) or
                  smallest (Min-Heap) element is always at the root, enabling
                  efficient access to the most/least important element.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Min-Heap</span>
                <p className="mr-16">
                  The key of each parent node is less than or equal to the keys
                  of its children. The smallest element is at the root.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Max-Heap</span>
                <p className="mr-16">
                  The key of each parent node is greater than or equal to the
                  keys of its children. The largest element is at the root.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Operations in Heap</h2>
          <div className="flex flex-col pl-12 mt-8">
            <div className="flex relative flex-col">
              <img
                src={bulletin}
                className="h-[18px] absolute left-[-30px] top-[5px]"
                alt=""
              />
              <h3 className="font-bold text-xl">Insertion in Heap</h3>
              <ul className=" mt-4  text-lg">
                <li className="mb-2">
                  Follow the following steps for insertion in heap
                </li>
                <li className="list-disc ml-6">
                  <div className="flex flex-col ">
                    <span className="font-medium min-w-[150px]">
                      Insert the element:{" "}
                    </span>
                    <p>
                      Add the element at the end of the heap (in the next
                      available position to maintain the complete tree
                      property).
                    </p>
                  </div>
                </li>
                <li className="list-disc ml-6">
                  <div className="flex flex-col ">
                    <span className="font-medium min-w-[150px]">
                      Heapify Up:
                    </span>
                    <p>
                      Compare the added element with its parent; if the heap
                      property is violated (in a Min-Heap, if the added element
                      is smaller than the parent), swap the elements.
                    </p>
                  </div>
                </li>
                <li className="list-disc ml-6">
                  <div className="flex flex-col ">
                    <span className="font-medium min-w-[150px]">Repeat:</span>
                    <p className="">
                      Repeat step 2 until the heap property is restored.
                    </p>
                  </div>
                </li>
                <li className="mt-4">
                  <code>insert()</code> and <code>heapifyUp()</code> in the code
                  snippet is the function for insertion in heap.
                </li>
              </ul>
            </div>

            <div className="flex relative mt-8 flex-col">
              <img
                src={bulletin}
                className="h-[18px] absolute left-[-30px] top-[5px]"
                alt=""
              />
              <h3 className="font-bold text-xl">Min/Max in Heap</h3>
              <ul className=" mt-4  text-lg">
                <li className="mb-2">
                  The Min/Max operation in a heap is to get the maximum or the
                  minimum value in the heap.
                </li>
                <ul className=" mt-2 pl-6  text-lg list-disc">
                  <li>
                    In a Min-Heap, the minimum element is always at the root
                    (index 0).
                  </li>
                  <li>
                    In a Max-Heap, the maximum element is always at the root
                    (index 0).
                  </li>
                </ul>
                <li className="mt-4">
                  <code>getMax()</code> in the code snippet is the function for
                  max operation in heap.
                </li>
              </ul>
            </div>

            <div className="mt-8 relative flex flex-col">
              <img
                src={bulletin}
                className="h-[18px] absolute left-[-30px] top-[5px]"
                alt=""
              />
              <h3 className="font-bold text-xl">Deletion in Heap</h3>
              <ul className="mt-4  text-lg ">
                <li className="mb-1">
                  The deletion operation is typically performed on the root of
                  the heap, i.e., the smallest element in a Min-Heap or the
                  largest element in a Max-Heap.
                </li>
                <li className="mb-1">
                  Follow the following steps to delete the root
                </li>
                <ul className="pl-6 text-lg list-disc">
                  <li className=" ">
                    Replace the root with the last element of the heap (to
                    maintain the complete tree property).
                  </li>
                  <li className="">Remove the last element.</li>
                  <li className="">
                    Heapify Down i.e. Compare the new root with its children and
                    swap it with the smallest child (for a Min-Heap) if the heap
                    property is violated.
                  </li>
                  <li>Repeat step 3 until the heap property is restored.</li>
                </ul>
                <li className="mt-4">
                  <code>extractMax()</code> and <code>heapifyDown()</code> in
                  the code snippet is the function for deletion in heap.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">
            Code Snippet{" "}
            <span className="text-xl ml-8 font-medium">(for Max-Heap)</span>
          </h2>
          <div className="mr-16 relative mt-4 ml-12">
            <pre className="">
              <code
                ref={bubble}
                style={{
                  padding: "30px 40px",
                  borderRadius: "10px",
                  fontSize: "18px",
                }}
                className="javascript"
              >
                {bubbleSort}
              </code>
            </pre>
            <span className="absolute right-4 font-semibold text-white top-2">
              Javascript
            </span>
          </div>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Time and Space Complexity</h2>
          <ul className="pl-12 mt-4 text-lg">
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Time Complexity</span>
                <p className="mr-16">
                  (Insert, Delete): <code>O(log n)</code>.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Space Complexity</span>
                <p className="mr-16">
                  <code>O(n)</code>, where <code>n</code> is the number of
                  elements in the heap.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Animation Legend</h2>
          <div className="pl-8 mt-4">
            <h3 className="font-semibold text-xl">Insertion in Heap</h3>
            <div className="flex flex-wrap gap-x-32 px-8 mt-6 gap-y-8">
              <div className="flex gap-x-12 items-center">
                <img src={heap1} className="rounded-xl" alt="" />
                <div className="flex flex-col items-center">
                  <span className="text-lg font-medium text-center">
                    Selected Node
                  </span>
                </div>
              </div>
              <div className="flex gap-x-12 items-center">
                <img src={heap2} className="rounded-xl" alt="" />
                <div className="flex flex-col items-center">
                  <span className="text-lg font-medium text-center">
                    Swap Values
                  </span>
                  <p className="max-w-[300px] text-center">
                    The heap property of the node and parent is violated and
                    hence swap of value is neccessary
                  </p>
                </div>
              </div>
              <div className="flex gap-x-12 items-center">
                <img src={heap3} className="rounded-xl" alt="" />
                <div className="flex flex-col items-center">
                  <span className="text-lg font-medium text-center">
                    No Swap
                  </span>
                  <p className="max-w-[300px] text-center">
                    The heap property of the node and parent is satisfied and
                    hence swap is not necessary.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pl-8 mt-8">
            <h3 className="font-semibold text-xl">Min/Max in Heap</h3>
            <div className="flex flex-wrap gap-x-32 px-8 mt-6 gap-y-8">
              <div className="flex gap-x-12 items-center">
                <img src={heap8} className="rounded-xl" alt="" />
                <div className="flex flex-col items-center">
                  <span className="text-lg font-medium text-center">
                    Root of Heap
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pl-8 mt-8">
            <h3 className="font-semibold text-xl">Deletion in Heap</h3>
            <div className="flex flex-wrap gap-x-32 px-8 mt-6 gap-y-8">
              <div className="flex gap-x-12 items-center">
                <img src={heap4} className="rounded-xl" alt="" />
                <div className="flex flex-col items-center">
                  <span className="text-lg font-medium text-center">
                    Swap Value
                  </span>
                  <p className="max-w-[300px] text-center">
                    Swap of value might be necessary for deletion on during
                    heapify.
                  </p>
                </div>
              </div>
              <div className="flex gap-x-12 items-center">
                <img src={heap5} className="rounded-xl" alt="" />
                <div className="flex flex-col items-center">
                  <span className="text-lg font-medium text-center">
                    Delete Leaf
                  </span>
                </div>
              </div>
              <div className="flex gap-x-12 items-center">
                <img src={heap6} className="rounded-xl" alt="" />
                <div className="flex flex-col items-center">
                  <span className="text-lg font-medium text-center">
                    Child Nodes
                  </span>
                  <p className="max-w-[300px] text-center">
                    The Maximum/Minimum (for Max/Min Heap correspondingly) of
                    the child nodes to chosen to verify the heap property.
                  </p>
                </div>
              </div>
              <div className="flex gap-x-12 items-center">
                <img src={heap7} className="rounded-xl" alt="" />
                <div className="flex flex-col items-center">
                  <span className="text-lg font-medium text-center">
                    No Swap
                  </span>
                  <p className="max-w-[300px] text-center">
                    The heap property is satisfied between the child and the
                    parent node. Hence no swap needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <h2 className="font-bold text-2xl">Use Cases and Applications</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">
              Heaps are used in implementing priority queues, scheduling
              systems, and graph algorithms like Dijkstra's and Prim’s.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
