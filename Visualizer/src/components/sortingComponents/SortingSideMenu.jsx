import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function SortingSideMenu() {
  const location = useLocation();

  const bubbleSort = location.pathname === "/sorting/bubble";
  const insertionSort = location.pathname === "/sorting/insertion";
  const selectionSort = location.pathname === "/sorting/selection";
  const countingSort = location.pathname === "/sorting/counting";

  const col1 = "#ff87ab";
  const col2 = "#fadde1";

  return (
    <div className="flex flex-col w-full h-full px-8 items-center justify-center">
      <div className="flex flex-col border-y-2 w-[150px] justify-center divide-y-2 divide-[#ff87ab] border-[#ff87ab]">
        <Link
          style={{
            backgroundColor: bubbleSort ? col1 : col2,
            color: bubbleSort ? col2 : col1,
          }}
          className="text-center py-1  hover:bg-[#ff87ab] hover:text-[#fadde1]"
          to={"/sorting/bubble"}
        >
          Bubble Sort
        </Link>
        <Link
          style={{
            backgroundColor: insertionSort ? col1 : col2,
            color: insertionSort ? col2 : col1,
          }}
          className="text-center py-1 hover:bg-[#ff87ab] hover:text-[#fadde1]"
          to={"/sorting/insertion"}
        >
          Insertion Sort
        </Link>
        <Link
          style={{
            backgroundColor: selectionSort ? col1 : col2,
            color: selectionSort ? col2 : col1,
          }}
          className="text-center py-1 hover:bg-[#ff87ab] hover:text-[#fadde1]"
          to={"/sorting/selection"}
        >
          Selection Sort
        </Link>
        <Link
          style={{
            backgroundColor: countingSort ? col1 : col2,
            color: countingSort ? col2 : col1,
          }}
          className="text-center py-1 hover:bg-[#ff87ab] hover:text-[#fadde1]"
          to={"/sorting/counting"}
        >
          Counting Sort
        </Link>
      </div>
    </div>
  );
}
