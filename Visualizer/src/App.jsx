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
import BSFNDFS from "./pages/BFSNDFS";
import Dijkstra from "./pages/Dijkstra";
import Prims from "./pages/Prims";
import Kruskal from "./pages/Kruskal";
import BellmanFord from "./pages/BellmanFord";
import FloydWarshall from "./pages/FloydWarshall";
import PageWrapper from "./pages/PageWrapper";
import NotFound from "./pages/NotFound";
import Gallery from "./pages/Gallery";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "",
    element: <Wrapper />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <PageWrapper />,
        errorElement: <Error />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "gallery",
            element: <Gallery />,
          },
          {
            path: "sorting",
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
            ],
          },
          {
            path: "search",
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
            children: [
              {
                path: "graph",
                element: <Graph />,
              },
              {
                path: "bfsdfs",
                element: <BSFNDFS />,
              },
              {
                path: "dijkstra",
                element: <Dijkstra />,
              },
              {
                path: "prims",
                element: <Prims />,
              },
              {
                path: "kruskal",
                element: <Kruskal />,
              },
              {
                path: "bellman",
                element: <BellmanFord />,
              },
              {
                path: "floyd",
                element: <FloydWarshall />,
              },
            ],
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
