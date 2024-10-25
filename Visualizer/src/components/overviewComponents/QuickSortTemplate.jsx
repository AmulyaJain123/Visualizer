import bulletin from "../../assets/bulletin.png";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { useRef, useEffect } from "react";
import ind1 from "../../assets/legend/quickSort/ind1.png";
import ind2 from "../../assets/legend/quickSort/ind2.png";
import pivot from "../../assets/legend/quickSort/pivot.png";
import array from "../../assets/legend/quickSort/quickArray.png";
import callStack from "../../assets/legend/quickSort/quickCall.png";
import sorted from "../../assets/legend/quickSort/sortedNode.png";

const bubbleSort = `function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        // Partition the array and get the pivot index
        let pivotIndex = partition(arr, low, high);
        // Recursively sort elements before and after partition
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
}

function partition(arr, low, high) {
    // Choose the leftmost element as pivot
    let pivot = arr[low];
    let left = low + 1;
    let right = high;

    while (left <= right) {
        /* Move left pointer to the right until we find an element 
           greater than or equal to the pivot*/
        while (left <= right && arr[left] < pivot) {
            left++;
        }
        /* Move right pointer to the left until we find an element 
           smaller than or equal to the pivot*/
        while (left <= right && arr[right] > pivot) {
            right--;
        }
        // If left is less than or equal to right, swap the elements
        if (left <= right) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
        }
    }

    // Ensure that both left and right pointers are within bounds before any final swap
    if (right >= low) {
        [arr[low], arr[right]] = [arr[right], arr[low]];
    }

    // Return the pivot index
    return right;
}`;

export default function QuickSortTemplate() {
  const bubble = useRef(null);

  useEffect(() => {
    if (bubble.current) {
      hljs.highlightElement(bubble.current);
    }
  }, [bubble]);
  return (
    <div className="flex flex-col">
      <h1
        id="quickSort"
        className="text-[28px] mb-8 pt-16 mx-auto underline underline-offset-8 text-[#9c6644] py-2 px-8  flex  relative font-extrabold"
      >
        Quick Sort
      </h1>

      <div className="mx-8  bg-white p-12 px-16 pb-16">
        <div className="flex flex-col ">
          <h2 className="font-bold text-2xl">Algorithm Overview</h2>
          <ul className="pl-12 mt-4 text-lg">
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">What is Quick Sort?</span>
                <p className="mr-16">
                  Quick Sort is a highly efficient sorting algorithm that
                  selects a pivot element, partitions the array into elements
                  less than and greater than the pivot, and recursively sorts
                  the subarrays.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Key Concept</span>
                <p className="mr-16">
                  The array is divided based on a pivot element, with the
                  smaller elements on one side and larger elements on the other.
                  The process is repeated for each partition.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Step-by-Step Explanation</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">Choose a pivot element.</li>
            <li className="list-disc">
              Partition the array such that all elements less than the pivot are
              on one side and those greater are on the other.
            </li>
            <li className="list-disc">Recursively sort the subarrays.</li>
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
                  <code>O(n log n)</code> on average, <code>O(n²)</code> in the
                  worst case (if the pivot is poorly chosen).
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Space Complexity</span>
                <p className="mr-16">
                  <code>O(log n)</code> in best case (due to recursive calls),{" "}
                  <code>O(n)</code> in the worst case.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Animation Legend</h2>
          <div className="flex flex-wrap gap-x-32 px-8 mt-6 gap-y-8">
            <div className="flex gap-x-12 items-center">
              <img src={array} className="rounded-xl h-[120px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium text-center">Array</span>
                <p className="max-w-[300px] text-center">
                  Currently <code className="mx-1">partition(0,3)</code> is
                  running.
                </p>
              </div>
            </div>

            <div className="flex gap-x-12 items-center">
              <img src={pivot} className="rounded-xl w-[80px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">Pivot</span>
              </div>
            </div>
            <div className="flex gap-x-12 items-center">
              <img src={ind1} className="rounded-xl w-[80px]" alt="" />
              <span className="text-lg font-medium">Left Node</span>
            </div>
            <div className="flex gap-x-12 items-center">
              <img src={ind2} className="rounded-xl w-[80px]" alt="" />
              <span className="text-lg font-medium">Right Node</span>
            </div>
            <div className="flex gap-x-12 items-center">
              <img src={callStack} className="rounded-xl w-[150px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">Function CallStack</span>
                <p className="max-w-[300px] text-center">
                  The Greyed entries are the sequence of calls that will be
                  pushed in the stack in future.
                </p>
              </div>
            </div>
            <div className="flex gap-x-12 items-center">
              <img src={sorted} className="rounded-xl w-[80px]" alt="" />
              <span className="text-lg font-medium">Sorted Node</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <h2 className="font-bold text-2xl">Use Cases and Applications</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">
              Works well for large datasets and is often faster than Merge Sort
              for in-memory sorting.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
