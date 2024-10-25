import bulletin from "../../assets/bulletin.png";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { useRef, useEffect } from "react";
import array from "../../assets/legend/stacksNQueue/stackArr.png";
import peek from "../../assets/legend/stacksNQueue/stackPeek.png";

const bubbleSort = `class Stack {
  constructor() {
    this.items = [];
  }

  // Push an element onto the stack
  push(element) {
    this.items.push(element);
  }

  // Pop an element from the stack
  pop() {
    if (this.isEmpty()) return "Stack is empty";
    return this.items.pop();
  }

  // Peek the top element
  peek() {
    if (this.isEmpty()) return "Stack is empty";
    return this.items[this.items.length - 1];
  }

  // Check if the stack is empty
  isEmpty() {
    return this.items.length === 0;
  }
}`;

export default function StacksTemplate() {
  const bubble = useRef(null);

  useEffect(() => {
    if (bubble.current) {
      hljs.highlightElement(bubble.current);
    }
  }, [bubble]);
  return (
    <div className="flex flex-col">
      <h1
        id="stacks"
        className="text-[28px] mb-8 pt-16 mx-auto underline underline-offset-8 text-[#9c6644] py-2 px-8  flex  relative font-extrabold"
      >
        Stacks
      </h1>

      <div className="mx-8  bg-white p-12 px-16 pb-16">
        <div className="flex flex-col ">
          <h2 className="font-bold text-2xl">Algorithm Overview</h2>
          <ul className="pl-12 mt-4 text-lg">
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">What is a Stack?</span>
                <p className="mr-16">
                  A Stack is a linear data structure that follows the Last In,
                  First Out (LIFO) principle. This means the last element added
                  to the stack will be the first to be removed. It allows two
                  primary operations: push (to add an item) and pop (to remove
                  an item).
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Key Concept</span>
                <p className="mr-16">
                  The Stack uses a LIFO approach, meaning the most recently
                  added element is the first to be removed.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Operations</h2>
          <ul className="pl-12 mt-4 text-lg">
            <li className="flex ">
              <span className="font-medium w-[150px]">Push: </span> Add an
              element to the top of the stack.
            </li>
            <li className="flex ">
              <span className="font-medium w-[150px]">Pop: </span>
              Remove the element from the top of the stack.
            </li>
            <li className="flex ">
              <span className="font-medium w-[150px]">Peek/Top: </span>
              View the element at the top of the stack without removing it.
            </li>
            <li className="flex ">
              <span className="font-medium w-[150px]">IsEmpty: </span>
              Check whether the stack is empty.
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
                  (Push, Pop, Peek): <code>O(1)</code> for each operation.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Space Complexity</span>
                <p className="mr-16">
                  <code>O(n)</code>, where n is the number of elements stored in
                  the stack.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Animation Legend</h2>
          <div className="flex flex-wrap gap-x-32 px-8 mt-6 gap-y-8">
            <div className="flex gap-x-12 items-center">
              <img src={array} className="rounded-xl h-[130px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium text-center">Stack</span>
                <p className="max-w-[300px] text-center">
                  The arrow represents the Top of the Stack
                </p>
              </div>
            </div>
            <div className="flex gap-x-12 items-center">
              <img src={peek} className="rounded-xl w-[80px]" alt="" />
              <span className="text-lg font-medium">Peeked Element</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <h2 className="font-bold text-2xl">Use Cases and Applications</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">
              Used in undo mechanisms in editors, expression evaluation (like
              parentheses balancing), recursion management, and browser
              back/forward history.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
