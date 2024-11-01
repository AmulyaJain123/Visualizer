import bulletin from "../../assets/bulletin.png";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { useRef, useEffect } from "react";
import loop1 from "../../assets/legend/selectionSort/loop1.png";
import loop2 from "../../assets/legend/selectionSort/loop2.png";
import max from "../../assets/legend/selectionSort/max.png";
import sorted from "../../assets/legend/selectionSort/sortedNode.png";

const bubbleSort = `function selectionSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]; // Swap
    }
  }
  return arr;
}`;

export default function SelectionSortTemplate() {
  const bubble = useRef(null);

  useEffect(() => {
    if (bubble.current) {
      hljs.highlightElement(bubble.current);
    }
  }, [bubble]);
  return (
    <div className="flex flex-col">
      <h1
        id="selectionSort"
        className="text-[28px] mb-8 pt-16 mx-auto underline underline-offset-4 text-[#9c6644] py-2 px-8  flex  relative font-extrabold"
      >
        Selection Sort
      </h1>

      <div className="mx-8  bg-white p-12 px-16 pb-16">
        <div className="flex flex-col ">
          <h2 className="font-bold text-2xl">Algorithm Overview</h2>
          <ul className="pl-12 mt-4 text-lg">
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">
                  What is Selection Sort?
                </span>
                <p className="mr-16">
                  Selection Sort repeatedly selects the smallest element from
                  the unsorted part of the list and swaps it with the first
                  unsorted element.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Key Concept</span>
                <p className="mr-16">
                  The array is divided into a sorted and an unsorted part, and
                  the smallest unsorted element is selected and swapped with the
                  leftmost unsorted element.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Step-by-Step Explanation</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">
              Traverse the unsorted part to find the smallest element.
            </li>
            <li className="list-disc">
              Swap the smallest element with the first unsorted element.
            </li>
            <li className="list-disc">
              Repeat until the entire array is sorted.
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
                  <code className="">O(n²)</code> in both worst and average
                  cases.
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
              <img src={loop1} className="rounded-xl w-[80px]" alt="" />
              <span className="text-lg font-bold">
                <code className="mr-1">i</code> Index Node
              </span>
            </div>
            <div className="flex gap-x-12 items-center">
              <img src={loop2} className="rounded-xl w-[80px]" alt="" />
              <span className="text-lg font-bold">
                <code className="mr-1">j</code> Index Node
              </span>
            </div>
            <div className="flex gap-x-12 items-center">
              <img src={max} className="rounded-xl w-[80px]" alt="" />
              <div className="flex flex-col items-center ">
                <span className="text-lg font-medium">Min/Max Node</span>
              </div>
            </div>
            <div className="flex gap-x-12 items-center">
              <img src={sorted} className="rounded-xl w-[80px]" alt="" />
              <span className="text-lg font-medium">Final Sorted Node</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <h2 className="font-bold text-2xl">Use Cases and Applications</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">
              Suitable for small datasets or when memory writes are more
              expensive than comparisons.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
