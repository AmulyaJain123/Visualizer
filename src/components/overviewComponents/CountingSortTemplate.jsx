import bulletin from "../../assets/bulletin.png";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { useRef, useEffect } from "react";
import arrays from "../../assets/legend/countingSort/arrays.png";
import max from "../../assets/legend/countingSort/max.png";
import counting from "../../assets/legend/countingSort/counting.png";
import sorted from "../../assets/legend/countingSort/sortedNode.png";

const bubbleSort = `function countingSort(arr, maxValue) {
    let count = new Array(maxValue + 1).fill(0);
    let output = new Array(arr.length);
    
    // Count the occurrences
    for (let i = 0; i < arr.length; i++) {
      count[arr[i]]++;
    }
    
    // Place elements in output array
    let j =0;
    let ind=0;
    while(j<arr.length){
        while(count[ind]===0){
            ++ind;
        }

        while(count[ind]>0){
            output[j]=ind;
            --count[ind];
            ++j;
        }
    }
    return output;
  }`;

export default function CountingSortTemplate() {
  const bubble = useRef(null);

  useEffect(() => {
    if (bubble.current) {
      hljs.highlightElement(bubble.current);
    }
  }, [bubble]);
  return (
    <div className="flex flex-col">
      <h1
        id="countingSort"
        className="text-[28px] mb-8 pt-16 mx-auto underline underline-offset-8 text-[#9c6644] py-2 px-8  flex  relative font-extrabold"
      >
        Counting Sort
      </h1>

      <div className="mx-8 bg-white p-12 px-16 pb-16">
        <div className="flex flex-col ">
          <h2 className="font-bold text-2xl">Algorithm Overview</h2>
          <ul className="pl-12 mt-4 text-lg">
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">
                  What is Counting Sort?
                </span>
                <p className="mr-16">
                  Counting Sort is a non-comparative sorting algorithm that
                  works by counting the occurrences of each distinct element in
                  the array and using those counts to determine their position
                  in the sorted array.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Key Concept</span>
                <p className="mr-16">
                  It works well when the range of input values is small compared
                  to the number of elements to sort.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Step-by-Step Explanation</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">
              Count the occurrences of each element in the array.
            </li>
            <li className="list-disc">
              Place the elements in their correct position in a new array.
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
                  <code className="">O(n + k)</code>, where n is the number of
                  elements, and <code className="">k</code> is the range of
                  input.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Space Complexity</span>
                <p className="mr-16">
                  <code className="">O(n + k)</code>, as it requires additional
                  space for the counting array.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Animation Legend</h2>
          <div className="flex flex-wrap gap-x-32 px-8 mt-6 gap-y-8">
            <div className="flex gap-x-12 items-center">
              <img src={arrays} className="rounded-xl h-[200px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium text-center">
                  Counting Array & Original Array
                </span>
                <p className="max-w-[300px] text-center">
                  The selected node on Original Array is{" "}
                  <span className="font-bold">
                    <code className="mr-2 font-bold">j</code> Index Node
                  </span>
                  . The selected node on Counting Array is{" "}
                  <span className="font-bold">
                    <code className="mr-2 font-bold">ind</code> Index node
                  </span>
                </p>
              </div>
            </div>
            <div className="flex gap-x-12 items-center">
              <img src={counting} className="rounded-xl h-[100px]" alt="" />
              <span className="text-lg font-medium">Counting Array</span>
            </div>
            <div className="flex gap-x-12 items-center">
              <img src={max} className="rounded-xl w-[80px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">Max Node</span>
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
              Efficient for sorting integers when the range of possible values
              is known and limited.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
