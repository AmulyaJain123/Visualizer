import bulletin from "../../assets/bulletin.png";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { useRef, useEffect } from "react";
import hs1 from "../../assets/legend/heapSort/hs1.png";
import hs2 from "../../assets/legend/heapSort/hs2.png";
import hs3 from "../../assets/legend/heapSort/hs3.png";
import hs4 from "../../assets/legend/heapSort/hs4.png";
import hs5 from "../../assets/legend/heapSort/hs5.png";
import hs6 from "../../assets/legend/heapSort/hs6.png";

const bubbleSort = `class MaxHeap {
  constructor() {
    this.heap = [];
  }

  // Insert an element into the heap
  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  // Heapify up to maintain the heap property (bubble-up)
  heapifyUp() {
    let index = this.heap.length - 1; // Start at the newly added element
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2); // Parent index formula

      if (this.heap[parentIndex] >= this.heap[index]) break; // Heap property valid
      [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
      index = parentIndex; // Move up to the parent
    }
  }

  // Remove the max element (root) without modifying the original heap
  extractMaxForSort(tempHeap) {
    const max = tempHeap[0]; // Max value is the root
    const lastElement = tempHeap.pop(); // Pop the last element

    if (tempHeap.length > 0) {
      tempHeap[0] = lastElement; // Replace root with the last element
      this.heapifyDown(0, tempHeap); // Restore the heap property
    }

    return max; // Return the removed max value
  }

  // Heapify down to restore the heap property (bubble-down)
  heapifyDown(index, tempHeap) {
    const length = tempHeap.length;
    let largest = index;

    const leftChild = 2 * index + 1;
    const rightChild = 2 * index + 2;

    if (leftChild < length && tempHeap[leftChild] > tempHeap[largest]) {
      largest = leftChild;
    }

    if (rightChild < length && tempHeap[rightChild] > tempHeap[largest]) {
      largest = rightChild;
    }

    if (largest !== index) {
      [tempHeap[largest], tempHeap[index]] = [tempHeap[index], tempHeap[largest]];
      this.heapifyDown(largest, tempHeap);
    }
  }

  // Get a sorted array from the heap without modifying the original heap
  heapSort() {
    // Create a copy of the heap to preserve the original
    let tempHeap = [...this.heap];
    const sortedArray = [];

    while (tempHeap.length > 0) {
      // Extract max and append to sorted array
      sortedArray.push(this.extractMaxForSort(tempHeap)); 
    }

    return sortedArray; // Return the sorted array
  }
}`;

export default function HeapSortTemplate() {
  const bubble = useRef(null);

  useEffect(() => {
    if (bubble.current) {
      hljs.highlightElement(bubble.current);
    }
  }, [bubble]);
  return (
    <div className="flex flex-col">
      <h1
        id="heapSort"
        className="text-[28px] mb-8 pt-16 mx-auto underline underline-offset-8 text-[#9c6644] py-2 px-8  flex  relative font-extrabold"
      >
        Heap Sort
      </h1>

      <div className="mx-8 bg-white p-12 px-16 pb-16">
        <div className="flex flex-col ">
          <h2 className="font-bold text-2xl">Algorithm Overview</h2>
          <ul className="pl-12 mt-4 text-lg">
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">What is Heap Sort?</span>
                <p className="mr-16">
                  Heap Sort is a comparison-based sorting algorithm that uses a
                  binary heap to sort an array. It repeatedly extracts the
                  maximum (or minimum) element from the heap and rebuilds the
                  heap until all elements are sorted.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Key Concept</span>
                <p className="mr-16">
                  Heap Sort builds a heap from the input data, then repeatedly
                  extracts the root (maximum or minimum) and places it at the
                  end of the sorted section of the array.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Step-by-Step Explanation</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">
              Build a max/min heap from the input array.
            </li>
            <li className="list-disc">
              Extract the maximum/maximum element from the heap and move it to
              the sorted portion of the array.
            </li>
            <li className="list-disc">
              Rebuild the heap (heapify down) and repeat until the array is
              sorted.
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">
            Code Snippet{" "}
            <span className="ml-4 text-xl font-medium">
              (for descending sorting)
            </span>
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
                  <code className="">O(n log n)</code> for both best and worst
                  cases.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Space Complexity</span>
                <p className="mr-16">
                  <code className="">O(1)</code>, since Heap Sort is in-place.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Animation Legend</h2>
          <div className="flex flex-wrap gap-x-32 px-8 mt-6 gap-y-8">
            <div className="flex gap-x-12 items-center">
              <img src={hs1} className="rounded-xl" alt="" />
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
              <img src={hs2} className="rounded-xl" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">Delete Leaf</span>
              </div>
            </div>
            <div className="flex gap-x-12 items-center">
              <img src={hs3} className="rounded-xl" alt="" />
              <span className="text-lg font-medium">Selected Node</span>
            </div>
            <div className="flex gap-x-12 items-center">
              <img src={hs4} className="rounded-xl" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">Child Nodes</span>
                <p className="max-w-[300px] text-center">
                  One of the Child Nodes to be chosen for heapify.
                </p>
              </div>
            </div>
            <div className="flex gap-x-12 items-center">
              <img src={hs5} className="rounded-xl" alt="" />
              <span className="text-lg font-medium">No Swap</span>
            </div>
            <div className="flex gap-x-12 items-center">
              <img src={hs6} className="rounded-xl" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">Sorted Array</span>
                <p className="max-w-[300px] text-center">
                  Extracted elements from the heap are pushed in the sorted
                  array.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <h2 className="font-bold text-2xl">Use Cases and Applications</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">
              Heap Sort is used when a stable, in-place sorting algorithm with
              O(n log n) complexity is required.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
