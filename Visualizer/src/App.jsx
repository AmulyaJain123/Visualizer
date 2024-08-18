import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Wrapper from "./pages/Wrapper";
import Sorting from "./pages/Sorting";
import BubbleSort from "./pages/BubbleSort";
import InsertionSort from "./pages/InsertionSort";
import SelectionSort from "./pages/SelectionSort";
import CountingSort from "./pages/CountingSort";

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
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
