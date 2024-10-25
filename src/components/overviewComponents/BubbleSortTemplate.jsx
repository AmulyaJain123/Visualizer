import bulletin from "../../assets/bulletin.png";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { useRef, useEffect } from "react";
import selectedNode from "../../assets/legend/bubbleSort/selectedNode.png";
import sortedNode from "../../assets/legend/bubbleSort/sortedNode.png";

const bubbleSort = `function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap
      }
    }
  }
  return arr;
}`;

export default function BubbleSortTemplate() {
  const bubble = useRef(null);

  useEffect(() => {
    if (bubble.current) {
      hljs.highlightElement(bubble.current);
    }
  }, [bubble]);
  return (
    <div className="flex flex-col">
      <h1
        id="bubbleSort"
        className="text-[28px] mb-8 pt-16 mx-auto underline underline-offset-4 text-[#9c6644] py-2 px-8  flex  relative font-extrabold"
      >
        Bubble Sort
      </h1>

      <div className="mx-8  bg-white p-12 px-16 pb-16">
        <div className="flex flex-col ">
          <h2 className="font-bold text-2xl">Algorithm Overview</h2>
          <ul className="pl-12 mt-4 text-lg">
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">What is Bubble Sort?</span>
                <p className="mr-16">
                  Bubble Sort is a simple comparison-based algorithm that
                  repeatedly steps through the list, compares adjacent elements,
                  and swaps them if they are in the wrong order. The process
                  repeats until the list is sorted.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Key Concept</span>
                <p className="mr-16">
                  The largest unsorted element “bubbles up” to its correct
                  position at the end of the list after each full pass.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Step-by-Step Explanation</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">Start at the beginning of the list</li>
            <li className="list-disc">
              Compare each pair of adjacent elements.
            </li>
            <li className="list-disc">
              If the current element is greater than the next element, swap
              them.
            </li>
            <li className="list-disc">
              Repeat the process for the remaining unsorted elements.
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Code Snippet</h2>
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
                  <code className="">O(n²)</code> for worst and average cases,
                  <code className="ml-2">O(n)</code> for best case when the
                  array is already sorted.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Space Complexity</span>
                <p className="mr-16">
                  <code className="">O(1)</code>, as sorting is done in-place.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Animation Legend</h2>
          <div className="flex flex-wrap gap-x-32 px-8 mt-6 gap-y-8">
            <div className="flex gap-x-12 items-center">
              <img src={selectedNode} className="rounded-xl w-[80px]" alt="" />
              <span className="text-lg font-bold">
                <code className="mr-1">j</code> Index Node
              </span>
            </div>
            <div className="flex gap-12 items-center">
              <img src={sortedNode} className="rounded-xl w-[80px]" alt="" />
              <span className="text-lg font-medium">Final Sorted Node</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <h2 className="font-bold text-2xl">Use Cases and Applications</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">
              Mainly used for small datasets where simplicity matters more than
              performance.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
