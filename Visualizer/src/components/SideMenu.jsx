import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Tile = styled.div`
  background-color: ${(props) =>
    props.$status == "true" ? "#ff87ab" : "#fadde1"};
  color: ${(props) => (props.$status == "true" ? "#fadde1" : "#ff87ab")};

  &:hover {
    background-color: ${(props) =>
      props.$status == "true" ? "#ff87ab" : "#fff"};
  }
`;

export default function SideMenu() {
  const location = useLocation();

  const home = location.pathname === "/";

  const bubbleSort = location.pathname === "/sorting/bubble";
  const insertionSort = location.pathname === "/sorting/insertion";
  const selectionSort = location.pathname === "/sorting/selection";
  const countingSort = location.pathname === "/sorting/counting";
  const mergeSort = location.pathname === "/sorting/merge";
  const bucketSort = location.pathname === "/sorting/bucket";
  const radixSort = location.pathname === "/sorting/radix";
  const quickSort = location.pathname === "/sorting/quick";

  const linearSearch = location.pathname === "/search/linear";
  const binarySearch = location.pathname === "/search/binary";

  const col1 = "#ff87ab";
  const col2 = "#fadde1";

  const tiles = [
    {
      name: "Sorting",
      children: [
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
        {
          name: "Bucket Sort",
          path: "/sorting/bucket",
          status: bucketSort,
        },
        {
          name: "Radix Sort",
          path: "/sorting/radix",
          status: radixSort,
        },
      ],
    },
    {
      name: "Search",
      children: [
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
  ];

  return (
    <div className="flex flex-col w-full h-full px-4 gap-y-6 ">
      <div className="text-center flex flex-col uppercase font-bold text-lg">
        Navigation
      </div>
      <div className="flex flex-col border-y-2 w-[150px] justify-center divide-y-2 divide-[#ff87ab] border-[#ff87ab]">
        <Link to={"/"}>
          <Tile className="text-center py-1" $status={home ? "true" : "false"}>
            Home
          </Tile>
        </Link>
      </div>
      {tiles.map((i) => {
        return (
          <div key={i.name} className="w-[150px]">
            <header className="font-semibold uppercase text-center text-sm py-1">
              {i.name}
            </header>
            <div className="flex flex-col border-y-2 w-[150px] justify-center divide-y-2 divide-[#ff87ab] border-[#ff87ab]">
              {i.children.map((j) => {
                return (
                  <Link key={j.name} to={j.path}>
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
  );
}
