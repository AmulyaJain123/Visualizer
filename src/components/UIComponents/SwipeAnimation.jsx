import bellmanford from "../../assets/gallery/bellmanFord.png";
import bfs from "../../assets/gallery/bfs.png";
import binarySearch from "../../assets/gallery/binarySearch.png";
import binaryTree from "../../assets/gallery/binaryTree.png";
import bstDeletion from "../../assets/gallery/bstDeletion.png";
import bstInsertion from "../../assets/gallery/bstInsertion.png";
import bstTraversal from "../../assets/gallery/bstTraversal.png";
import bubbleSort from "../../assets/gallery/bubbleSort.png";
import countingSort from "../../assets/gallery/countingSort.png";
import dfs from "../../assets/gallery/dfs.png";
import dijkstra from "../../assets/gallery/dijkstra.png";
import floydWarshall from "../../assets/gallery/floydWarshall.png";
import heapDeletion from "../../assets/gallery/heapDeletion.png";
import heapInsertion from "../../assets/gallery/heapInsertion.png";
import heapSort from "../../assets/gallery/heapSort.png";
import insertionSort from "../../assets/gallery/insertionSort.png";
import kruskal from "../../assets/gallery/kruskal.png";
import linearSearch from "../../assets/gallery/linearSearch.png";
import mergeSort from "../../assets/gallery/mergeSort.png";
import prims from "../../assets/gallery/prims.png";
import queue from "../../assets/gallery/queue.png";
import quickSort from "../../assets/gallery/quickSort.png";
import selectionSort from "../../assets/gallery/selectionSort.png";
import stack from "../../assets/gallery/stack.png";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const config = [
  { image: bellmanford, name: "Bellman Ford's Algorithm", width: 950 },
  { image: bfs, name: "BFS", width: 350 },
  { image: binarySearch, name: "Binary Search", width: 700 },
  { image: binaryTree, name: "Binary Tree", width: 550 },
  { image: bstDeletion, name: "BST Deletion", width: 550 },
  { image: bstInsertion, name: "BST Insertion", width: 500 },
  { image: bstTraversal, name: "BST Traversal", width: 550 },
  { image: bubbleSort, name: "Bubble Sort", width: 700 },
  { image: countingSort, name: "Counting Sort", width: 750 },
  { image: dfs, name: "DFS", width: 350 },
  { image: dijkstra, name: "Dijkstra's Algorithm", width: 1000 },
  { image: floydWarshall, name: "Floyd Warshall's Algorithm", width: 700 },
  { image: heapDeletion, name: "Heap Deletion", width: 400 },
  { image: heapInsertion, name: "Heap Insertion", width: 505 },
  { image: heapSort, name: "Heap Sort", width: 550 },
  { image: insertionSort, name: "Insertion Sort", width: 750 },
  { image: kruskal, name: "Kruskal's Algorithm", width: 800 },
  { image: linearSearch, name: "Linear Search", width: 700 },
  { image: mergeSort, name: "Merge Sort", width: 700 },
  { image: prims, name: "Prim's Algorithm", width: 900 },
  { image: queue, name: "Queue", width: 350 },
  { image: quickSort, name: "Quick Sort", width: 750 },
  { image: selectionSort, name: "Selection Sort", width: 750 },
  { image: stack, name: "Stack", width: 350 },
];

export default function SwipeAnimation() {
  const [ind, setInd] = useState(0);
  const [test, setTest] = useState(0);

  useEffect(() => {
    const temp = setInterval(() => {
      setInd((ind) => {
        return (ind + 1) % 24;
      });
    }, [4000]);

    return () => {
      clearInterval(temp);
    };
  }, []);
  return (
    <div className="my-24 pb-[80px] rounded-xl  border-2 border-neutral-400 mx-auto w-full">
      <div className=" relative p-4 h-[500px] w-full flex flex-col justify-center items-center">
        <motion.img
          src={config[ind].image}
          style={{
            width: config[ind].width,
            height: config[ind].height,
          }}
          key={ind}
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-fit "
          alt=""
        />
        <span className="absolute bottom-[-10px] right-[50%] translate-x-[50%] text-xl font-bold">
          {config[ind].name}
        </span>
        <div className="absolute bottom-[-40px] flex space-x-4 right-[50%] translate-x-[50%]">
          {new Array(24).fill(0).map((i, index) => {
            return (
              <div
                style={{ backgroundColor: index === ind ? "black" : "" }}
                className="w-[10px] h-[10px] rounded-full duration-700 border-2 border-black"
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
