import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Wrapper from "./pages/Wrapper";
import Sorting from "./pages/Sorting";
import BubbleSort from "./pages/BubbleSort";
import InsertionSort from "./pages/InsertionSort";
import SelectionSort from "./pages/SelectionSort";
import CountingSort from "./pages/CountingSort";
import LinearSearch from "./pages/LinearSearch";
import BinarySearch from "./pages/BinarySearch";
import MergeSort from "./pages/MergeSort";
import BucketSort from "./pages/BucketSort";
import RadixSort from "./pages/RadixSort";
import QuickSort from "./pages/QuickSort";
import Search from "./pages/Search";
import BST from "./pages/BST";
import BinaryTree from "./pages/BinaryTree";
import BinarySearchTree from "./pages/BinarySearchTree";
import StacksNQueue from "./pages/StacksNQueue";
import Stacks from "./pages/Stacks";
import Queue from "./pages/Queue";
import Graphs from "./pages/Graphs";
import Graph from "./pages/Graph";
import Heap from "./pages/Heap";
import HeapSort from "./pages/HeapSort";

const router = createBrowserRouter([
  {
    path: "",
    element: <Wrapper />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "sorting",
        element: <Sorting />,
        children: [
          {
            path: "bubble",
            element: <BubbleSort />,
          },
          {
            path: "insertion",
            element: <InsertionSort />,
          },
          {
            path: "selection",
            element: <SelectionSort />,
          },
          {
            path: "counting",
            element: <CountingSort />,
          },
          {
            path: "merge",
            element: <MergeSort />,
          },
          {
            path: "quick",
            element: <QuickSort />,
          },
          {
            path: "bucket",
            element: <BucketSort />,
          },
          {
            path: "radix",
            element: <RadixSort />,
          },
        ],
      },
      {
        path: "search",
        element: <Search />,
        children: [
          {
            path: "linear",
            element: <LinearSearch />,
          },
          {
            path: "binary",
            element: <BinarySearch />,
          },
        ],
      },
      {
        path: "tree",
        element: <BST />,
        children: [
          {
            path: "binary_tree",
            element: <BinaryTree />,
          },
          {
            path: "binary_search_tree",
            element: <BinarySearchTree />,
          },
          {
            path: "heap",
            element: <Heap />,
          },
          {
            path: "heap_sort",
            element: <HeapSort />,
          },
        ],
      },
      {
        path: "stacksnqueue",
        element: <StacksNQueue />,
        children: [
          {
            path: "stacks",
            element: <Stacks />,
          },
          {
            path: "queue",
            element: <Queue />,
          },
        ],
      },
      {
        path: "graphs",
        element: <Graphs />,
        children: [
          {
            path: "graph",
            element: <Graph />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
