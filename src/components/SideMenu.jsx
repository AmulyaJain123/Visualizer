import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import github from "../assets/githubFooter.png";
import linkedin from "../assets/linkedinFooter.png";

const col1 = "#c08552";
const col2 = "#f3e9dc";

const Tile = styled.div`
  background-color: ${(props) => (props.$status == "true" ? col1 : col2)};
  color: ${(props) => (props.$status == "true" ? col2 : col1)};

  &:hover {
    background-color: ${(props) => (props.$status == "true" ? col1 : "#fff")};
  }
`;

export default function SideMenu() {
  const location = useLocation();

  const home = location.pathname === "/";
  const gallery = location.pathname === "/gallery";

  const sorting = location.pathname === "/sorting";
  const search = location.pathname === "/search";
  const stacksNQueue = location.pathname === "/stacksnqueue";
  const tree = location.pathname === "/tree";
  const graphs = location.pathname === "/graphs";

  const bubbleSort = location.pathname === "/sorting/bubble";
  const insertionSort = location.pathname === "/sorting/insertion";
  const selectionSort = location.pathname === "/sorting/selection";
  const countingSort = location.pathname === "/sorting/counting";
  const mergeSort = location.pathname === "/sorting/merge";
  const quickSort = location.pathname === "/sorting/quick";

  const linearSearch = location.pathname === "/search/linear";
  const binarySearch = location.pathname === "/search/binary";

  const binaryTree = location.pathname === "/tree/binary_tree";
  const binarySearchTree = location.pathname === "/tree/binary_search_tree";
  const heap = location.pathname == "/tree/heap";
  const heapSort = location.pathname == "/tree/heap_sort";

  const stacks = location.pathname === "/stacksnqueue/stacks";
  const queue = location.pathname === "/stacksnqueue/queue";

  const graph = location.pathname == "/graphs/graph";
  const bfsdfs = location.pathname == "/graphs/bfsdfs";
  const dijkstra = location.pathname == "/graphs/dijkstra";
  const prims = location.pathname == "/graphs/prims";
  const kruskal = location.pathname == "/graphs/kruskal";
  const bellman = location.pathname == "/graphs/bellman";
  const floyd = location.pathname == "/graphs/floyd";

  const tiles = [
    {
      name: "Sorting",
      children: [
        {
          name: "Overview",
          path: "/sorting",
          status: sorting,
        },
        {
          name: "Bubble Sort",
          path: "/sorting/bubble",
          status: bubbleSort,
        },
        {
          name: "Insertion Sort",
          path: "/sorting/insertion",
          status: insertionSort,
        },
        {
          name: "Selection Sort",
          path: "/sorting/selection",
          status: selectionSort,
        },
        {
          name: "Counting Sort",
          path: "/sorting/counting",
          status: countingSort,
        },
        {
          name: "Merge Sort",
          path: "/sorting/merge",
          status: mergeSort,
        },
        {
          name: "Quick Sort",
          path: "/sorting/quick",
          status: quickSort,
        },
      ],
    },
    {
      name: "Search",
      children: [
        {
          name: "Overview",
          path: "/search",
          status: search,
        },
        {
          name: "Linear Search",
          path: "/search/linear",
          status: linearSearch,
        },
        {
          name: "Binary Search",
          path: "/search/binary",
          status: binarySearch,
        },
      ],
    },
    {
      name: "Trees",
      children: [
        {
          name: "Overview",
          path: "/tree",
          status: tree,
        },
        {
          name: "Binary Tree",
          path: "/tree/binary_tree",
          status: binaryTree,
        },
        {
          name: "Binary Search Tree",
          path: "/tree/binary_search_tree",
          status: binarySearchTree,
        },
        {
          name: "Heap",
          path: "/tree/heap",
          status: heap,
        },
        {
          name: "Heap Sort",
          path: "/tree/heap_sort",
          status: heapSort,
        },
      ],
    },
    {
      name: "Stacks & Queue",
      children: [
        {
          name: "Overview",
          path: "/stacksnqueue",
          status: stacksNQueue,
        },
        {
          name: "Stacks",
          path: "/stacksnqueue/stacks",
          status: stacks,
        },
        {
          name: "Queue",
          path: "/stacksnqueue/queue",
          status: queue,
        },
      ],
    },
    {
      name: "Graphs",
      children: [
        {
          name: "Overview",
          path: "/graphs",
          status: graphs,
        },
        {
          name: "Graph",
          path: "/graphs/graph",
          status: graph,
        },
        {
          name: "BFS & DFS",
          path: "/graphs/bfsdfs",
          status: bfsdfs,
        },
        {
          name: "Dijkstra's",
          path: "/graphs/dijkstra",
          status: dijkstra,
        },
        {
          name: "Bellman Ford's",
          path: "/graphs/bellman",
          status: bellman,
        },
        {
          name: "Floyd Warshall's",
          path: "/graphs/floyd",
          status: floyd,
        },
        {
          name: "Prim's",
          path: "/graphs/prims",
          status: prims,
        },
        {
          name: "Kruskal's",
          path: "/graphs/kruskal",
          status: kruskal,
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto overflow-x-hidden sidebarScroll  pt-2  ">
      <div className="flex flex-col items-center gap-y-6 pb-4">
        <div className="flex flex-col gap-y-6 pb-4 mx-4">
          {/* <div className="text-center flex flex-col uppercase font-bold text-lg">
            Navigation
          </div> */}
          <div className="flex flex-col mt-4 border-y-2 w-[150px] justify-center divide-y-2 divide-[#c08552] border-[#c08552]">
            <Link to={"/"}>
              <Tile
                className="text-center py-1"
                $status={home ? "true" : "false"}
              >
                Home
              </Tile>
            </Link>
            <Link to={"/gallery"}>
              <Tile
                className="text-center py-1"
                $status={gallery ? "true" : "false"}
              >
                Gallery
              </Tile>
            </Link>
          </div>
          {tiles.map((i) => {
            return (
              <div key={i.name} className="w-[150px]">
                <header className="font-semibold uppercase text-center text-sm py-1">
                  {i.name}
                </header>
                <div className="flex flex-col border-b-2 w-[150px] justify-center divide-y-2 divide-[#c08552] border-[#c08552]">
                  {i.children.map((j) => {
                    return (
                      <Link
                        style={{
                          marginBottom: j.name === "Overview" ? "8px" : "0px",
                          fontSize: j.name === "Overview" ? "14px" : "",
                          textTransform:
                            j.name === "Overview" ? "uppercase" : "",
                          letterSpacing: j.name === "Overview" ? "2px" : "",
                          border:
                            j.name === "Overview" ? "1px solid #c08552" : "",
                        }}
                        key={j.name}
                        to={j.path}
                      >
                        <Tile
                          className="text-center py-1"
                          $status={j.status ? "true" : "false"}
                        >
                          {j.name}
                        </Tile>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className=" flex-col border-t-2 mt-8 py-4 border-neutral-400 flex justify-center items-center w-full ">
          <div className="flex gap-x-4 my-3">
            <a target="_blank" href="https://github.com/AmulyaJain123">
              <img src={github} className="w-[20px]" alt="" />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/amulya-jain-a31180255/"
            >
              <img src={linkedin} className="w-[20px]" alt="" />
            </a>
          </div>
          <span className="text-sm">
            Uicons by{" "}
            <a
              className="underline underline-offset-2"
              target="_blank"
              href="https://www.flaticon.com/uicons"
            >
              Flaticon
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}