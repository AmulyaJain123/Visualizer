import bulletin from "../../assets/bulletin.png";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { useRef, useEffect } from "react";
import fw1 from "../../assets/legend/floyd/fw1.png";
import fw2 from "../../assets/legend/floyd/fw2.png";

const bubbleSort = ` floydWarshall(graph) {
    // graph is the Adjacency List representation of the graph
    const dist = getAdjacencyMatrix(graph); // Assumed function to get the Adjacency Matrix

    for (let k = 0; k < this.vertexCount; k++) {
      for (let i = 0; i < this.vertexCount; i++) {
        for (let j = 0; j < this.vertexCount; j++) {
          if (dist[i][k] !== Infinity && dist[k][j] !== Infinity) {
            dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
          }
        }
      }
    }

    return dist;
  }`;

export default function FloydTemplate() {
  const bubble = useRef(null);

  useEffect(() => {
    if (bubble.current) {
      hljs.highlightElement(bubble.current);
    }
  }, [bubble]);
  return (
    <div className="flex flex-col">
      <h1
        id="floyd"
        className="text-[28px] mb-8 pt-16 mx-auto underline underline-offset-8 text-[#9c6644] py-2 px-8  flex  relative font-extrabold"
      >
        Floyd Warshall's Algorithm
      </h1>

      <div className="mx-8 bg-white p-12 px-16 pb-16">
        <div className="flex flex-col ">
          <h2 className="font-bold text-2xl">Algorithm Overview</h2>
          <ul className="pl-12 mt-4 text-lg">
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">
                  What is Floyd Warshall's Algorithm?
                </span>
                <p className="mr-16">
                  Floyd-Warshall Algorithm finds the shortest paths between all
                  pairs of vertices in a weighted graph. It uses dynamic
                  programming to calculate the shortest distances in a matrix.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Key Concept</span>
                <p className="mr-16">
                  It iteratively improves the solution by considering if any
                  intermediate vertex offers a shorter path between two
                  vertices.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">NOTE</span>
                <p className="mr-16">
                  Floyd Warshall's Algorithm can be use for both directed and
                  undirected weighted graphs
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Step-by-Step Explanation</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">
              Initialize a matrix where each entry represents the shortest known
              distance between each pair of vertices.
            </li>
            <li className="list-disc">
              For each pair of vertices, check if a path through another vertex
              offers a shorter distance.
            </li>
            <li className="list-disc">Update the matrix accordingly.</li>
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
                  <code>O(V³)</code>, where <code>V</code> is the number of
                  vertices.
                </p>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <span className="text-xl font-bold">Space Complexity</span>
                <p className="mr-16">
                  <code>O(V²)</code>, for the distance matrix.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mt-6">
          <h2 className="font-bold text-2xl">Animation Legend</h2>

          <div className="flex flex-wrap gap-x-32 px-8 mt-6 gap-y-8">
            <div className="flex gap-x-12 items-center">
              <img src={fw1} className="rounded-xl h-[100px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium text-center">
                  Explanation Text
                </span>
                <p className="max-w-[500px] text-center"></p>
              </div>
            </div>

            <div className="flex gap-x-12 items-center">
              <img src={fw2} className="rounded-xl h-[350px]" alt="" />
              <div className="flex flex-col items-center">
                <span className="text-lg font-medium">Distance Matrix</span>
                <ul className="max-w-[700px] space-y-2 ">
                  <li className="list-disc">
                    Distance Matrix holds the minimum distance between each
                    node. The green nodes are the once that are not iterated for
                    the current iteration i.e. (for A<sup>1</sup> ). The
                    diagonal elements will always be green and for A<sup>n</sup>
                    , the nodes in the n<sup>th</sup> row and n<sup>th</sup>{" "}
                    column will be green.
                  </li>
                  <li className="list-disc">
                    The Node in blue is the current node in the iteration and
                    its being checked with the 2 highlighted green nodes for the
                    given relation:
                    <code className="ml-2">
                      A<sup>n</sup>[x][y] {">"} A<sup>n-1</sup>[x][n] + A
                      <sup>n-1</sup>[n][y]
                    </code>{" "}
                    <br />
                    The 2 green nodes are actually same as the corresponding
                    elements from the previous matrix i.e.{" "}
                    <code className="ml-1">
                      A <sup>n-1</sup>
                    </code>
                  </li>
                  <li className="list-disc">
                    The condition is actually checking(in this figure) if the
                    shortest path from 2 to 3 actually goes through 1 (as a
                    intermediate node). If the above condition is true then tehe
                    value of{" "}
                    <code>
                      A<sup>n</sup>[x][y]
                    </code>{" "}
                    is updated and the node is relaxed. The algorithm terminates
                    when all the iterations are completed i.e. for this figure,
                    when A<sup>5</sup> is finished iterating.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <h2 className="font-bold text-2xl">Use Cases and Applications</h2>
          <ul className="pl-16 mt-4 text-lg">
            <li className="list-disc">
              Floyd-Warshall is used in cases where you need the shortest path
              between all pairs of vertices, such as in network optimization and
              traffic routing.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
