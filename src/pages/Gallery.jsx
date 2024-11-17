import bellmanFord from "../assets/gallery/bellmanFord.png";
import bfs from "../assets/gallery/bfs.png";
import binarySearch from "../assets/gallery/binarySearch.png";
import binaryTree from "../assets/gallery/binaryTree.png";
import bstDeletion from "../assets/gallery/bstDeletion.png";
import bstInsertion from "../assets/gallery/bstInsertion.png";
import bstTraversal from "../assets/gallery/bstTraversal.png";
import bubbleSort from "../assets/gallery/bubbleSort.png";
import countingSort from "../assets/gallery/countingSort.png";
import dfs from "../assets/gallery/dfs.png";
import dijkstra from "../assets/gallery/dijkstra.png";
import floydWarshall from "../assets/gallery/floydWarshall.png";
import graph from "../assets/gallery/graph.png";
import heapDeletion from "../assets/gallery/heapDeletion.png";
import heapInsertion from "../assets/gallery/heapInsertion.png";
import heapSort from "../assets/gallery/heapSort.png";
import insertionSort from "../assets/gallery/insertionSort.png";
import kruskal from "../assets/gallery/kruskal.png";
import linearSearch from "../assets/gallery/linearSearch.png";
import mergeSort from "../assets/gallery/mergeSort.png";
import prims from "../assets/gallery/prims.png";
import queue from "../assets/gallery/queue.png";
import quickSort from "../assets/gallery/quickSort.png";
import selectionSort from "../assets/gallery/selectionSort.png";
import stack from "../assets/gallery/stack.png";
import { Helmet } from "react-helmet-async";

const images = [
  bellmanFord,
  bfs,
  binarySearch,
  binaryTree,
  bstDeletion,
  bstInsertion,
  bstTraversal,
  bubbleSort,
  countingSort,
  dfs,
  dijkstra,
  floydWarshall,
  graph,
  heapDeletion,
  heapInsertion,
  heapSort,
  insertionSort,
  kruskal,
  linearSearch,
  mergeSort,
  prims,
  queue,
  quickSort,
  selectionSort,
  stack,
];

export default function Gallery() {
  return (
    <>
      <Helmet>
        <title>Gallery | AlgoTrace</title>
        <meta
          name="description"
          content="Visit AlgoTrace Gallery to discover what AlgoTrace has to offer."
        />
      </Helmet>
      <div className="flex w-full  h-full flex-col items-center pt-[60px] py-[100px]  ">
        <h1 className="text-center text-[35px] tracking-wide mx-auto  w-fit  text-[#9c6644] rounded-xl font-extrabold mb-16">
          Gallery Wall
        </h1>
        <p className="mx-auto text-lg max-w-[1200px] text-center">
          Welcome to the AlgoTrace Gallery! Here, you'll find a collection of
          snapshots showcasing different algorithms in action. <br /> Each image
          represents the result of an algorithm running on a sample input,
          giving you a quick glimpse into what AlgoTrace has to offer.
        </p>
        <p className="mb-12 mt-4 text-lg text-green-600 text-center">
          Enjoy the View
        </p>
        <div className="p-4 bg-white ">
          <div className="flex  flex-col w-[1300px] overflow-clip relative h-[7000px] p-6 px-12 shadow-lg gradient    ">
            <div className="absolute top-[39px] left-[58px] rotate-45  ">
              <img
                src={dfs}
                className="rounded-3xl  shadow-xl border-stone-500"
                alt=""
              />
              <span className="absolute bg-black text-2xl w-[110px] h-[50px] flex justify-center items-center  rounded-b-3xl top-[80px] left-[-30px] -rotate-90 text-white font-extrabold">
                DFS
              </span>
            </div>

            <div className="absolute top-[0px] left-[690px] rotate-45">
              <img
                src={bfs}
                className="rounded-3xl h-[520px] shadow-xl border-stone-500"
                alt=""
              />
              <span className="absolute bg-black text-2xl w-[110px] h-[50px] bottom-[117px] left-[318px] flex justify-center items-center  rounded-b-3xl  rotate-90 text-white font-extrabold">
                BFS
              </span>
            </div>

            <div className="absolute top-[628px] left-[-196px] -rotate-45">
              <img
                src={prims}
                className="rounded-3xl h-[380px] shadow-xl border-stone-500"
                alt=""
              />
              <span className="absolute bg-black text-2xl w-[120px] h-[50px] flex justify-center items-center  rounded-b-3xl top-[0px] right-[250px]  text-white font-extrabold">
                Prims
              </span>
            </div>

            <div className="absolute top-[1223px] left-[174px] rotate-45">
              <img
                src={bellmanFord}
                className="rounded-3xl shadow-xl w-[1200px]  border-stone-500"
                alt=""
              />
              <span className="absolute bg-black text-2xl w-[210px] h-[50px] flex justify-center items-center  rounded-b-3xl top-0 left-[50px]  text-white font-extrabold">
                Bellman Ford
              </span>
            </div>

            <div className="absolute top-[1604px] left-[-115px] rotate-45">
              <img
                src={countingSort}
                className="rounded-3xl shadow-xl   border-stone-500"
                alt=""
              />
              <span className="absolute bg-black text-2xl w-[220px] h-[50px] flex justify-center items-center  rounded-b-3xl top-0 left-[50px]  text-white font-extrabold">
                Counting Sort
              </span>
            </div>

            <div className="absolute top-[594px] left-[500px] -rotate-45">
              <img
                src={insertionSort}
                className="rounded-3xl shadow-xl   border-stone-500"
                alt=""
              />
              <span className="absolute bg-black text-2xl w-[220px] h-[50px] flex justify-center items-center  rounded-b-3xl top-0 left-[50px]  text-white font-extrabold">
                Insertion Sort
              </span>
            </div>

            <div className="absolute top-[754px] left-[744px] -rotate-45">
              <img
                src={binaryTree}
                className="rounded-3xl shadow-xl min-w-[650px] min-h-[400px] border-stone-500"
                alt=""
              />
              <span className="absolute bg-black text-2xl w-[210px] h-[50px] flex justify-center items-center -rotate-90  rounded-b-3xl bottom-[150px] left-[-79px]  text-white font-extrabold">
                Binary Tree
              </span>
            </div>

            <div className="absolute top-[2285px] left-[611px] rotate-45">
              <img
                src={linearSearch}
                className="rounded-3xl shadow-xl min-w-[900px] min-h-[250px] border-stone-500"
                alt=""
              />
              <span className="absolute bg-black text-2xl w-[220px] h-[50px] flex justify-center items-center  rounded-b-3xl top-0 left-[50px]  text-white font-extrabold">
                Linear Search
              </span>
            </div>

            <div className="absolute top-[2433px] left-[115px] rotate-45">
              <img
                src={graph}
                className="rounded-3xl shadow-xl min-w-[900px] min-h-[707px]  border-stone-500"
                alt=""
              />
              <span className="absolute bg-black text-2xl w-[150px] h-[50px] flex justify-center items-center -rotate-90  rounded-b-3xl bottom-[450px] left-[-50px]  text-white font-extrabold">
                Graph
              </span>
            </div>

            <div className="absolute top-[2008px] left-[-162px] -rotate-45">
              <img
                src={heapSort}
                className="rounded-3xl shadow-xl min-h-[500px] min-w-[650px]  border-stone-500"
                alt=""
              />
              <span className="absolute bg-black text-2xl w-[180px] h-[50px] flex justify-center items-center rotate-90  rounded-b-3xl bottom-[250px] right-[-65px]  text-white font-extrabold">
                Heap Sort
              </span>
            </div>

            <div className="absolute top-[1916px] left-[981px] -rotate-45">
              <img
                src={stack}
                className="rounded-3xl shadow-xl min-h-[250px] min-w-[420px] border-stone-500"
                alt=""
              />
              <span className="absolute bg-black text-2xl w-[130px] h-[50px] flex justify-center items-center   rounded-b-3xl top-[0px] left-[45px]  text-white font-extrabold">
                Stack
              </span>
            </div>

            <div className="absolute top-[3327px] left-[-231px] rotate-45">
              <img
                src={mergeSort}
                className="rounded-3xl shadow-xl  border-stone-500"
                alt=""
              />
              <span className="absolute bg-black text-2xl w-[200px] h-[50px] flex justify-center items-center   rounded-b-3xl top-[0px] left-[45px]  text-white font-extrabold">
                Merge Sort
              </span>
            </div>

            <div className="absolute top-[3437px] left-[622px] -rotate-45">
              <img
                src={binarySearch}
                className="rounded-3xl shadow-xl min-h-[250px] min-w-[800px]  border-stone-500"
                alt=""
              />
              <span className="absolute bg-black text-2xl w-[220px] h-[50px] flex justify-center items-center   rounded-b-3xl top-[0px] left-[45px]  text-white font-extrabold">
                Binary Search
              </span>
            </div>

            <div className="absolute top-[3801px] left-[538px] -rotate-45">
              <img
                src={selectionSort}
                className="rounded-3xl shadow-xl min-h-[200px] min-w-[1000px] border-stone-500"
                alt=""
              />
              <span className="absolute bg-black text-2xl w-[220px] h-[50px] flex justify-center items-center   rounded-b-3xl top-[0px] left-[45px]  text-white font-extrabold">
                Selection Sort
              </span>
            </div>

            <div className="absolute top-[3874px] left-[366px] -rotate-45">
              <img
                src={queue}
                className="rounded-3xl shadow-xl h-[260px] border-stone-500"
                alt=""
              />
              <span className="absolute bg-black text-2xl w-[140px] h-[50px] flex justify-center items-center   rounded-b-3xl top-[0px] left-[45px]  text-white font-extrabold">
                Queue
              </span>
            </div>

            <div className="absolute top-[4178px] left-[718px] -rotate-45">
              <img
                src={bstInsertion}
                className="rounded-3xl shadow-xl min-h-[430px] min-w-[620px] border-stone-500"
                alt=""
              />
              <span className="absolute bg-black text-2xl w-[250px] h-[50px] flex justify-center items-center rotate-90  rounded-b-3xl top-[150px] right-[-100px]  text-white font-extrabold">
                Insertion In BST
              </span>
            </div>

            <div className="absolute top-[3660px] left-[-170px] rotate-45">
              <img
                src={heapDeletion}
                className="rounded-3xl h-[430px] shadow-xl border-stone-500"
                alt=""
              />
              <span className="absolute bg-black text-2xl w-[260px] h-[50px] flex justify-center  items-center  rounded-b-3xl top-[0px] left-[55px]  text-white font-extrabold">
                Deletion in Heap
              </span>
            </div>

            <div className="absolute top-[4440px] left-[-74px] rotate-45">
              <img
                src={dijkstra}
                className="rounded-3xl  shadow-xl border-stone-500"
                alt=""
              />
              <span className="absolute bg-black text-2xl w-[200px] h-[50px] flex justify-center items-center  rounded-b-3xl top-[0px] right-[100px]  text-white font-extrabold">
                Dijkstra
              </span>
            </div>

            <div className="absolute top-[4952px] left-[-207px] rotate-45">
              <img
                src={bubbleSort}
                className="rounded-3xl  shadow-xl border-stone-500"
                alt=""
              />
              <span className="absolute bg-black text-2xl w-[220px] h-[50px] flex justify-center items-center  rounded-b-3xl top-[0px] right-[100px]  text-white font-extrabold">
                Bubble Sort
              </span>
            </div>
            <div className="absolute top-[5106px] left-[717px] -rotate-45">
              <img
                src={bstTraversal}
                className="rounded-3xl min-h-[450px] min-w-[650px] shadow-xl border-stone-500"
                alt=""
              />
              <span className="absolute bg-black text-2xl w-[250px] h-[50px] flex justify-center items-center rotate-90 rounded-b-3xl top-[140px] right-[-100px]  text-white font-extrabold">
                Traversal In BST
              </span>
            </div>

            <div className="absolute top-[5670px] left-[33px] -rotate-45">
              <img
                src={floydWarshall}
                className="rounded-3xl shadow-xl   border-stone-500"
                alt=""
              />
              <span className="absolute bg-black text-2xl w-[250px] h-[50px] flex justify-center items-center -rotate-90  rounded-b-3xl bottom-[190px] left-[-100px]  text-white font-extrabold">
                Floyd Warshall
              </span>
            </div>

            <div className="absolute top-[5410px] left-[-203px] -rotate-45">
              <img
                src={bstDeletion}
                className="rounded-3xl shadow-xl   border-stone-500"
                alt=""
              />
              <span className="absolute bg-black text-2xl w-[250px] h-[50px] flex justify-center items-center rotate-90  rounded-b-3xl bottom-[170px] right-[-100px]  text-white font-extrabold">
                Deletion In BST
              </span>
            </div>

            <div className="absolute top-[5906px] left-[447px] -rotate-45">
              <img
                src={kruskal}
                className="rounded-3xl min-h-[370px] min-w-[900px] shadow-xl border-stone-500"
                alt=""
              />
              <span className="absolute bg-black text-2xl w-[180px] h-[50px] flex justify-center items-center  rounded-b-3xl top-[0px] right-[250px]  text-white font-extrabold">
                Kruskal
              </span>
            </div>

            <div className="absolute top-[6470px] left-[20px] -rotate-45">
              <img
                src={heapInsertion}
                className="rounded-3xl shadow-xl   border-stone-500"
                alt=""
              />
              <span className="absolute bg-black text-2xl w-[250px] h-[50px] flex justify-center items-center rotate-90  rounded-b-3xl bottom-[150px] right-[-100px]  text-white font-extrabold">
                Insertion In Heap
              </span>
            </div>

            <div className="absolute top-[6350px] left-[550px] -rotate-45">
              <img
                src={quickSort}
                className="rounded-3xl shadow-xl min-h-[170px] min-w-[850px] border-stone-500"
                alt=""
              />
              <span className="absolute bg-black text-2xl w-[180px] h-[50px] flex justify-center items-center  rounded-b-3xl top-[0px] left-[100px]  text-white font-extrabold">
                Quick Sort
              </span>
            </div>

            <div className="w-[500px] h-[500px] wall  rotate-45 absolute  rounded-3xl left-[-320px] top-[-285px]"></div>
            <div className="w-[500px] h-[500px] wall rotate-45 absolute  rounded-3xl left-[350px] top-[-365px]"></div>
            <div className="w-[500px] h-[500px] wall rotate-45 absolute  rounded-3xl left-[980px] top-[-395px]"></div>
            <div className="w-[500px] h-[500px] wall rotate-45 absolute  rounded-3xl left-[1240px] top-[75px]"></div>
            <div className="w-[500px] h-[500px] wall  rotate-45 absolute  rounded-3xl left-[-400px] top-[387px]"></div>
            <div className="w-[500px] h-[500px] wall rotate-45 absolute  rounded-3xl left-[1100px] top-[1085px]"></div>
            <div className="w-[500px] h-[500px] wall  rotate-45 absolute  rounded-3xl left-[-385px] top-[1577px]"></div>
            <div className="w-[500px] h-[500px] wall  rotate-45 absolute  rounded-3xl left-[-465px] top-[3987px]"></div>
            <div className="w-[500px] h-[500px] wall rotate-45 absolute  rounded-3xl left-[1215px] top-[3758px]"></div>
            <div className="w-[200px] h-[130px] wall rotate-45 absolute  rounded-3xl left-[520px] top-[4258px]"></div>
            <div className="w-[500px] h-[500px] wall rotate-45 absolute  rounded-3xl left-[1085px] top-[4528px]"></div>
            <div className="w-[500px] h-[500px] wall  rotate-45 absolute  rounded-3xl left-[-405px] top-[4967px]"></div>
            <div className="w-[500px] h-[500px] wall rotate-45 absolute  rounded-3xl left-[1210px] top-[5383px]"></div>
            <div className="w-[500px] h-[500px] wall  rotate-45 absolute  rounded-3xl left-[-305px] top-[6140px]"></div>
            <div className="w-[500px] h-[500px] wall  rotate-45 absolute  rounded-3xl left-[-305px] top-[6840px]"></div>
            <div className="w-[500px] h-[500px] wall rotate-45 absolute  rounded-3xl left-[335px] top-[6783px]"></div>
            <div className="w-[550px] h-[800px] wall rotate-45 absolute  rounded-3xl left-[965px] top-[6325px]"></div>
          </div>
        </div>

        <div className="min-w-[400px] min-h-[200px]"></div>
      </div>
    </>
  );
}
