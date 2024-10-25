import styled from "styled-components";
import { Link } from "react-router-dom";
import search from "../assets/search.png";
import { useState, useRef } from "react";
import alarm from "../assets/alarm.gif";
import tick from "../assets/hand-tick.png";

const Logo = styled.button`
  font-size: xx-large;
  font-weight: 800;
  font-family: "Bungee Tint";
  color: white;
`;

const col1 = "#c08552";
const col2 = "#f3e9dc";

const bar = [
  {
    name: "sorting",
    path: "/sorting",
  },
  {
    name: "search",
    path: "/search",
  },
  {
    name: "trees",
    path: "/tree",
  },
  {
    name: "stacks & queue",
    path: "/stacksnqueue",
  },
  {
    name: "graphs",
    path: "/graphs",
  },
];

const dictionary = [
  {
    name: "Bubble Sort",
    path: "/sorting/bubble",
  },
  {
    name: "Insertion Sort",
    path: "/sorting/insertion",
  },
  {
    name: "Selection Sort",
    path: "/sorting/selection",
  },
  {
    name: "Counting Sort",
    path: "/sorting/counting",
  },
  {
    name: "Merge Sort",
    path: "/sorting/merge",
  },
  {
    name: "Quick Sort",
    path: "/sorting/quick",
  },
  {
    name: "Linear Search",
    path: "/search/linear",
  },
  {
    name: "Binary Search",
    path: "/search/binary",
  },
  {
    name: "Binary Tree",
    path: "/tree/binary_tree",
  },
  {
    name: "Binary Search Tree",
    path: "/tree/binary_search_tree",
  },
  {
    name: "Heap",
    path: "/tree/heap",
  },
  {
    name: "Heap Sort",
    path: "/tree/heap_sort",
  },

  {
    name: "Stacks",
    path: "/stacksnqueue/stacks",
  },
  {
    name: "Queue",
    path: "/stacksnqueue/queue",
  },
  {
    name: "Graph",
    path: "/graphs/graph",
  },
  {
    name: "BFS & DFS",
    path: "/graphs/bfsdfs",
  },
  {
    name: "Dijkstra's",
    path: "/graphs/dijkstra",
  },
  {
    name: "Bellman Ford's",
    path: "/graphs/bellman",
  },
  {
    name: "Floyd Warshall's",
    path: "/graphs/floyd",
  },
  {
    name: "Prim's",
    path: "/graphs/prims",
  },
  {
    name: "Kruskal's",
    path: "/graphs/kruskal",
  },
];

export default function TopNav() {
  const searchRef = useRef();
  const [query, setQuery] = useState("");
  const [foc, setFoc] = useState(false);
  const [results, setResults] = useState(null);

  function searchChange(event) {
    const str = searchRef.current.value.trim().toLowerCase();
    const ans = [];
    for (let i of dictionary) {
      const name = i.name.trim().toLowerCase();
      if (name.includes(str)) {
        ans.push(i);
      }
    }
    setQuery(event.target.value);
    setResults(ans);
  }

  function setFocFalse() {
    setFoc(false);
    setQuery("");
    searchRef.current.value = "";
  }

  console.log(results);

  return (
    <>
      <div className="flex w-screen bg-inherit ">
        <div className="flex flex-grow  bg-black px-8 items-center justify-between">
          <div className="flex ">
            <Link to={"/"}>
              <Logo>AlgoTrace</Logo>
            </Link>
            <div
              style={{ zIndex: foc ? "40" : "0" }}
              className="flex relative ml-[40px] my-[7px] rounded-full bg-white"
            >
              <span className="flex justify-center items-center px-3">
                <img src={search} className="w-[20px] h-[20px]" alt="" />
              </span>
              <input
                className="rounded-full  mr-6 px-2 caret-tr focus:outline-none "
                onFocus={() => setFoc(true)}
                onChange={(event) => searchChange(event)}
                type="text"
                ref={searchRef}
                placeholder="Search Algorithms"
              />
              {foc ? (
                <>
                  <div className="absolute w-[250px] shadow-md right-[50%] z-50 translate-x-[50%] min-h-[50px] bg-zinc-100 bottom-[-7px] max-h-[500px]  overflow-auto sidebarScroll translate-y-[100%]">
                    <h1 className="text-center mt-4 underline underline-offset-4 text-base font-medium">
                      Search Results
                    </h1>
                    <div className="flex flex-col my-8 ">
                      {query === "" ? (
                        <h2 className="text-center">
                          No Search Query Entered.
                        </h2>
                      ) : (
                        <div className="flex flex-col ">
                          {results.length === 0 ? (
                            <h2 className="text-center">No Match Found.</h2>
                          ) : (
                            <div className="flex flex-col divide-y-2 divide-[#000] border-y-2 w-fit mb-8 mx-auto border-[#000]">
                              {results.map((i, kom) => {
                                return (
                                  <Link
                                    to={i.path}
                                    key={kom}
                                    onClick={() => setFocFalse()}
                                    className="flex justify-center searchTile items-center py-2 w-[170px] mx-auto "
                                  >
                                    {i.name}
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
          <div className="flex">
            <div className="mr-[50px] confirm flex items-center py-1 pr-4 pl-2 rounded-full bg-white">
              <img src={tick} className="w-[25px] h-[25px] mr-4" alt="" />
              <span>Zoom OK</span>
            </div>
            <div className="flex space-x-4 text-lg items-center text-white ">
              {bar.map((i) => {
                return (
                  <Link to={i.path} key={i.name} className="uppercase text-sm ">
                    {i.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        {foc ? (
          <div
            onClick={() => setFocFalse()}
            className="absolute w-screen h-screen z-30 top-0 left-0 bg-black/10"
          ></div>
        ) : null}
      </div>
    </>
  );
}
