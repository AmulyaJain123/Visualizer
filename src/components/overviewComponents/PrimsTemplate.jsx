import bulletin from "../../assets/bulletin.png";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { useRef, useEffect } from "react";
import p1 from "../../assets/legend/prims/p1.png";
import p2 from "../../assets/legend/prims/p2.png";
import p3 from "../../assets/legend/prims/p3.png";
import p4 from "../../assets/legend/prims/p4.png";

const bubbleSort = `function prims(graph, start) {
  // graph is the Adjacency List representation of the graph
  const keys = {}; // Stores minimum weights to connect vertices
  const parent = {}; // Tracks the parent nodes in the MST
  const includedInMST = {}; // Tracks whether a node is in the MST
  
  // Initialize keys and includedInMST for all vertices
  for (const vertex in graph) {
    keys[vertex] = Infinity;
    includedInMST[vertex] = false;
  }
  
  // Start from the first vertex in the graph (e.g., A)
  keys[start] = 0; // The key of the starting vertex is 0
  parent[start] = null; // Starting vertex has no parent
  
  // Function to find the vertex with the minimum key value
  function minKey() {
    let min = Infinity;
    let minVertex = null;
    
    for (const vertex in graph) {
      if (!includedInMST[vertex] && keys[vertex] < min) {
        min = keys[vertex];
        minVertex = vertex;
      }
    }
    
    return minVertex;
  }
  
  // Prim's algorithm: repeat until all vertices are included in the MST
  for (let count = 0; count < Object.keys(graph).length - 1; count++) {
    // Pick the vertex with the minimum key value
    const u = minKey();
    includedInMST[u] = true;
    
    // Update the key values and parent index of the adjacent vertices
    for (const neighbor of graph[u]) {
      const { node: v, weight } = neighbor;
      if (!includedInMST[v] && weight < keys[v]) {
        keys[v] = weight;
        parent[v] = u;
      }
    }
  }
  
  // Build the MST
  const MST = [];
  for (const vertex in parent) {
    if (parent[vertex] !== null) {
      MST.push({ src: parent[vertex], dest: vertex, weight: keys[vertex] });
    }
  }
  
  return MST;
}
`;

export default function PrimsTemplate() {
  const bubble = useRef(null);

  useEffect(() => {
    if (bubble.current) {
      hljs.highlightElement(bubble.current);
    }
  }, [bubble]);
  return (
    <div className="flex flex-col">
      <h1
        id="prims"
        className="text-[28px] mb-8 pt-16 mx-auto underline underline-offset-8 text-[#9c6644] py-2 px-8  flex  relative font-extrabold"
      >
        Prim's Algorithm
      </h1>

      <div className="mx-8 bg-white p-12 px-16 pb-16">
        <div className="flex flex-col ">
          <h2 className="font-bold text-2xl">Algorithm Overview</h2>
          <ul className="pl-12 mt-4 text-lg">
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">
                  What is Prim's Algorithm?
                </span>
                <p className="mr-16">
                  Prim’s Algorithm is a greedy algorithm used to find the
                  Minimum Spanning Tree (MST) for a weighted, connected graph.
                  It starts with a single vertex and grows the MST by adding the
                  smallest edge that connects a vertex in the MST to a vertex
                  outside the MST.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Key Concept</span>
                <p className="mr-16">
                  Prim’s algorithm iteratively adds the smallest edge to the
                  spanning tree while avoiding cycles.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">NOTE</span>
                <p className="mr-16">
                  Prim's Algorithm can only be used on undirected weighted
                  graphs
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Step-by-Step Explanation</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">
              Start with any vertex and mark it as visited.
            </li>
            <li className="list-disc">
              Find the smallest edge that connects a visited vertex to an
              unvisited vertex and add it to the MST.
            </li>
            <li className="list-disc">
              Repeat until all vertices are part of the MST.
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
                  <code>O(V²)</code>, where <code>V</code> is the number of
                  vertices.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Space Complexity</span>
                <p className="mr-16">
                  <code>O(V + E)</code>, where <code>E</code> is the number of
                  edges, due to storing the adjacency list and additional
                  arrays.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Animation Legend</h2>
          <p className="mt-1 ml-4">
            NOTE: The numbers above the nodes is the minimum distance of the
            node from its neighbours (i.e. distance from its parent). Its stored
            in the <code>keys</code> array
          </p>
          <div className="flex flex-wrap gap-x-32 px-8 mt-6 gap-y-8">
            <div className="flex gap-x-12 items-center">
              <img src={p1} className="rounded-xl h-[100px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium text-center">
                  Explanation Text
                </span>
                <p className="max-w-[500px] text-center"></p>
              </div>
            </div>

            <div className="flex gap-x-12 items-center">
              <img src={p2} className="rounded-xl " alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">Current Node</span>
              </div>
            </div>

            <div className="flex gap-x-12 items-center">
              <img src={p3} className="rounded-xl " alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">Relaxing Neighbour</span>
                <p className="max-w-[300px] text-center">
                  The neighbour (of the selected node) that is being checked for
                  relaxation.
                </p>
              </div>
            </div>

            <div className="flex gap-x-12 justify-center items-center">
              <img src={p4} className="rounded-xl w-[110px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">Parents Array</span>
                <p className="max-w-[300px] text-center">
                  Keeps Track of the parent of nodes (based on the minimum edge
                  length). Finally, used to deduce the MST.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <h2 className="font-bold text-2xl">Use Cases and Applications</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">
              Prim’s Algorithm is used in network design, such as in laying
              cables or designing electrical grids.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
