import bulletin from "../../assets/bulletin.png";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { useRef, useEffect } from "react";
import b1 from "../../assets/legend/bellman/b1.png";
import b2 from "../../assets/legend/bellman/b2.png";
import b3 from "../../assets/legend/bellman/b3.png";
import b4 from "../../assets/legend/bellman/b4.png";

const bubbleSort = `function bellmanFord(graph, start) {
  // graph is the Adjacency List representation of the graph
  const distances = {};
  for (let node in graph) {
    distances[node] = Infinity;
  }
  distances[start] = 0;

  let flag = true;
  for (let i = 0; i < Object.keys(graph).length - 1; i++) {
    for (let vertex in graph) {
      graph[vertex].forEach(neighbor => {
        const distance = distances[vertex] + neighbor.weight;
        if (distance < distances[neighbor.node]) {
          flag = false;
          distances[neighbor.node] = distance;
        }
      });
    }
  }
  if(flag){
    return distances;
  }

  return distances;
}`;

export default function BellmanTemplate() {
  const bubble = useRef(null);

  useEffect(() => {
    if (bubble.current) {
      hljs.highlightElement(bubble.current);
    }
  }, [bubble]);
  return (
    <div className="flex flex-col">
      <h1
        id="bellman"
        className="text-[28px] mb-8 pt-16 mx-auto underline underline-offset-8 text-[#9c6644] py-2 px-8  flex  relative font-extrabold"
      >
        Bellman Ford's Algorithm
      </h1>

      <div className="mx-8 bg-white p-12 px-16 pb-16">
        <div className="flex flex-col ">
          <h2 className="font-bold text-2xl">Algorithm Overview</h2>
          <ul className="pl-12 mt-4 text-lg">
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">
                  What is Bellman Ford's Algorithm?
                </span>
                <p className="mr-16">
                  Bellman-Ford Algorithm is used to find the shortest path from
                  a single source node to all other nodes in a graph, even if
                  the graph contains negative weight edges. Unlike Dijkstra's
                  algorithm, it can handle graphs with negative weights.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Key Concept</span>
                <p className="mr-16">
                  Bellman-Ford works by relaxing each edge repeatedly, ensuring
                  that the shortest known distance is updated.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">NOTE</span>
                <p className="mr-16">
                  Though Bellman Ford's Algorithm can be used for undirected
                  graphs as well, it will result into a negative cycle if the
                  edges are not chosen appropriately.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Step-by-Step Explanation</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">
              Initialize the distance to the source as 0 and all other nodes as
              infinity.
            </li>
            <li className="list-disc">
              For each edge, if the path through the edge offers a shorter
              distance to the destination vertex, update the shortest path.
            </li>
            <li className="list-disc">
              Repeat Step 2 for V - 1 times (V is the number of vertices).
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
                  <code>O(V * E)</code>, where <code>V</code> is vertices and{" "}
                  <code>E</code> is edges.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Space Complexity</span>
                <p className="mr-16">
                  <code>O(V)</code>, for storing distances.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Animation Legend</h2>
          <p className="mt-1 ml-4">
            NOTE: The numbers above the node are the distances of the nodes from
            the starting point. The <code>distance</code> array hold these
            values.
          </p>
          <div className="flex flex-wrap gap-x-32 px-8 mt-6 gap-y-8">
            <div className="flex gap-x-12 items-center">
              <img src={b1} className="rounded-xl h-[80px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium text-center">
                  Selected Edge
                </span>
                <p className="max-w-[500px] text-center"></p>
              </div>
            </div>

            <div className="flex gap-x-12 items-center">
              <img src={b2} className="rounded-xl h-[100px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">Explanation text</span>
                <p className="max-w-[300px] text-center">
                  Explanation text for Relaxation.
                </p>
              </div>
            </div>

            <div className="flex gap-x-12 items-center">
              <img src={b3} className="rounded-xl w-[150px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">Edges</span>
              </div>
            </div>

            <div className="flex gap-y-8 justify-center flex-col items-center">
              <img src={b4} className="rounded-xl h-[250px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">Distance Table</span>
                <p className="max-w-[300px] text-center">
                  Minimum distances to all other nodes from the Start for each
                  Iteration.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <h2 className="font-bold text-2xl">Use Cases and Applications</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">
              Bellman-Ford is used when graphs may contain negative weight
              edges, such as in currency exchange or network routing with
              varying latencies. Its also used for detection of Negative-Cycle
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
