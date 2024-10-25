import bulletin from "../../assets/bulletin.png";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { useRef, useEffect } from "react";
import k1 from "../../assets/legend/kruskal/k1.png";
import k2 from "../../assets/legend/kruskal/k2.png";
import k3 from "../../assets/legend/kruskal/k3.png";
import k4 from "../../assets/legend/kruskal/k4.png";

const bubbleSort = `class DisjointSet {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, i) => i);
    this.rank = Array(size).fill(0);
  }

  find(u) {
    if (this.parent[u] !== u) {
      this.parent[u] = this.find(this.parent[u]); // Path compression
    }
    return this.parent[u];
  }

  union(u, v) {
    const rootU = this.find(u);
    const rootV = this.find(v);

    if (rootU !== rootV) {
      // Union by rank
      if (this.rank[rootU] > this.rank[rootV]) {
        this.parent[rootV] = rootU;
      } else if (this.rank[rootU] < this.rank[rootV]) {
        this.parent[rootU] = rootV;
      } else {
        this.parent[rootV] = rootU;
        this.rank[rootU]++;
      }
    }
  }
}

function getEdgeList(graph) {
  // graph is the Adjacency List representation of the graph
  const edges = [];
  const visited = new Set();

  for (const vertex in graph) {
    for (const neighbor of graph[vertex]) {
      const { node, weight } = neighbor;
      // To avoid duplicate edges (undirected graph)
      if (!visited.has(\`\${node}-\${vertex}\`) && !visited.has(\`\${vertex}-\${node}\`)) {
        edges.push({ src: vertex, dest: node, weight });
        visited.add(\`\${vertex}-\${node}\`);
      }
    }
  }

  return edges;
}

function kruskal(graph) {
  // graph is the Adjacency List representation of the graph
  const edges = getEdgeList(graph);
  // Sort edges based on their weights
  edges.sort((a, b) => a.weight - b.weight);

  const ds = new DisjointSet(Object.keys(graph).length);
  const mst = [];

  // Iterate through the sorted edges
  for (const edge of edges) {
    const { src, dest, weight } = edge;
    const srcIndex = Object.keys(graph).indexOf(src);
    const destIndex = Object.keys(graph).indexOf(dest);

    if (ds.find(srcIndex) !== ds.find(destIndex)) {
      ds.union(srcIndex, destIndex);
      mst.push(edge); // Add edge to the MST
    }
  }

  return mst;
}
`;

export default function KruskalTemplate() {
  const bubble = useRef(null);

  useEffect(() => {
    if (bubble.current) {
      hljs.highlightElement(bubble.current);
    }
  }, [bubble]);
  return (
    <div className="flex flex-col">
      <h1
        id="kruskal"
        className="text-[28px] mb-8 pt-16 mx-auto underline underline-offset-8 text-[#9c6644] py-2 px-8  flex  relative font-extrabold"
      >
        Kruskal's Algorithm
      </h1>

      <div className="mx-8 bg-white p-12 px-16 pb-16">
        <div className="flex flex-col ">
          <h2 className="font-bold text-2xl">Algorithm Overview</h2>
          <ul className="pl-12 mt-4 text-lg">
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">
                  What is Kruskal's Algorithm?
                </span>
                <p className="mr-16">
                  Kruskal’s Algorithm is a greedy algorithm used to find the
                  Minimum Spanning Tree (MST) for a graph. It works by sorting
                  all edges and adding them to the MST, ensuring no cycles are
                  formed.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Key Concept</span>
                <p className="mr-16">
                  Kruskal’s Algorithm treats the graph as a collection of edges
                  and adds the smallest edge that doesn’t form a cycle.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">NOTE</span>
                <p className="mr-16">
                  Kruskal's Algorithm can only be used on undirected weighted
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
              Sort all the edges in ascending order based on their weights.
            </li>
            <li className="list-disc">
              Add edges one by one to the MST, making sure to avoid cycles.
            </li>
            <li className="list-disc">
              Repeat until the MST has V - 1 edges (V is the number of
              vertices).
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
                  <code>O(E log E)</code>, where <code>E</code> is the number of
                  edges (due to sorting). The time for the union-find is
                  pratically <code>O(1)</code>
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Space Complexity</span>
                <p className="mr-16">
                  <code>O(V+E)</code> for storing the edge list and the
                  Union-Find structure.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Animation Legend</h2>

          <div className="flex flex-wrap gap-x-32 px-8 mt-6 gap-y-8">
            <div className="flex flex-col gap-y-8 justify-center">
              <img src={k1} className="rounded-xl mx-auto w-[250px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium text-center">
                  Current Edge
                </span>
                <p className="max-w-[300px] text-center">
                  The current will be checked if it forms a cycle. If no, then
                  its added in the MST.
                </p>
              </div>
            </div>

            <div className="flex gap-x-12 justify-center items-center">
              <img src={k4} className="rounded-xl w-[160px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">Sorted Edges</span>
                <p className="max-w-[300px] text-center">
                  List of sorted edges. The ticked edges are included in the MST
                  and the crossed edges are rejected because of cycle formation.
                </p>
              </div>
            </div>

            <div className="flex gap-x-12 items-center">
              <img src={k2} className="rounded-xl h-[100px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">Explanation Text</span>
              </div>
            </div>

            <div className="flex gap-x-12 items-center">
              <img src={k3} className="rounded-xl h-[60px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">Selected Edge</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <h2 className="font-bold text-2xl">Use Cases and Applications</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">
              Kruskal’s Algorithm is used in clustering analysis, network
              design, and solving road network problems.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
