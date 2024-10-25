import bulletin from "../../assets/bulletin.png";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { useRef, useEffect } from "react";
import array from "../../assets/legend/stacksNQueue/queueArr.png";
import peek from "../../assets/legend/stacksNQueue/queuePeek.png";

const bubbleSort = `class Queue {
  constructor() {
    this.items = [];
  }

  // Enqueue an element
  enqueue(element) {
    this.items.push(element);
  }

  // Dequeue an element
  dequeue() {
    if (this.isEmpty()) return "Queue is empty";
    return this.items.shift();
  }

  // Peek the front element
  front() {
    if (this.isEmpty()) return "Queue is empty";
    return this.items[0];
  }

  // Check if the queue is empty
  isEmpty() {
    return this.items.length === 0;
  }
}`;

export default function QueueTemplate() {
  const bubble = useRef(null);

  useEffect(() => {
    if (bubble.current) {
      hljs.highlightElement(bubble.current);
    }
  }, [bubble]);
  return (
    <div className="flex flex-col">
      <h1
        id="queue"
        className="text-[28px] mb-8 pt-16 mx-auto underline underline-offset-8 text-[#9c6644] py-2 px-8  flex  relative font-extrabold"
      >
        Queue
      </h1>

      <div className="mx-8  bg-white p-12 px-16 pb-16">
        <div className="flex flex-col ">
          <h2 className="font-bold text-2xl">Algorithm Overview</h2>
          <ul className="pl-12 mt-4 text-lg">
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">What is a Queue?</span>
                <p className="mr-16">
                  A Queue is a linear data structure that follows the First In,
                  First Out (FIFO) principle. The first element added to the
                  queue is the first one to be removed. It supports operations
                  such as enqueue (to add an item) and dequeue (to remove an
                  item).
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Key Concept</span>
                <p className="mr-16">
                  The Queue uses a FIFO approach, meaning the first element to
                  enter the queue will be the first to leave.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Operations</h2>
          <ul className="pl-12 mt-4 text-lg">
            <li className="flex ">
              <span className="font-medium w-[150px]">Enqueue: </span> Add an
              element to the back of the queue.
            </li>
            <li className="flex ">
              <span className="font-medium w-[150px]">Dequeue:</span>
              Remove the front element from the queue.
            </li>
            <li className="flex ">
              <span className="font-medium w-[150px]">Front/Peek: </span>
              View the front element without removing it.
            </li>
            <li className="flex ">
              <span className="font-medium w-[150px]">IsEmpty: </span>
              Check whether the queue is empty.
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
                  (Enqueue, Dequeue): <code>O(1)</code> for enqueue and{" "}
                  <code>O(n)</code> for dequeue (due to shifting elements in a
                  typical array-based queue implementation).
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Space Complexity</span>
                <p className="mr-16">
                  <code> O(n)</code>, where n is the number of elements in the
                  queue.
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
                <span className="text-lg font-medium text-center">Queue</span>
                <p className="max-w-[300px] text-center">
                  The arrow represents the Front of the Queue
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
              Queues are used in scheduling tasks (like CPU task scheduling),
              managing requests in web servers, handling asynchronous data (like
              IO buffers), and breadth-first search in algorithms.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
