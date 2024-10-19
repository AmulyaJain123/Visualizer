import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { graphsActions } from "../store/main";
import Fig from "../components/primsComponents/Fig";
import { options } from "../algorithms/options";
import rightArrow from "../assets/right-arrow.png";
import right from "../assets/next.png";
import {
  bfsTimeline,
  dfsTimeline,
  dijkstraTimeline,
  primsTimeline,
} from "../algorithms/graphs";
import next from "../assets/next.png";
// import Table from "../components/dijkstraComponents/Table";

const types = [
  "undirected",
  "directed",
  "weighted Undirected",
  "weigted Directed",
];

const unweightedPos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 14, 15, 16, 17, 18, 19];
const weightedPos = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
];

function getPos(val, type) {
  if (type < 2) {
    return unweightedPos.findIndex((i) => i === val);
  }
  return weightedPos.findIndex((i) => i === val);
}

function getSize(type) {
  if (type < 2) {
    return unweightedPos.length;
  }
  return weightedPos.length;
}

function getInd(val, type) {
  if (type < 2) {
    return unweightedPos[val];
  }
  return weightedPos[val];
}

export default function Prims() {
  const [chosenGraph, setChosenGraph] = useState(undefined);
  const [graphType, setGraphType] = useState(2);
  const dispatch = useDispatch();
  const edgesArr = useSelector((state) => state.graphs.edgesArr);
  const list = useSelector((state) => state.graphs.list);
  const [algoName, setAlgoName] = useState(null);
  const ind = useSelector((state) => state.graphs.ind);
  const timeline = useSelector((state) => state.graphs.timeline);
  const insertionRef = useRef();
  const [insertion, setInsertion] = useState(undefined);

  useEffect(() => {
    dispatch(graphsActions.resetAll());
  }, []);

  function keyClick(num) {
    insertionRef.current.value = "";
    setInsertion(undefined);
    let graphNo;
    if (chosenGraph === undefined) {
      graphNo = 0;
    } else {
      graphNo = getPos(chosenGraph, graphType) + num;
      if (graphNo < 0) {
        graphNo += getSize(graphType);
      }
      graphNo = graphNo % getSize(graphType);
    }
    graphNo = getInd(graphNo, graphType);
    setChosenGraph(graphNo);

    const res = options[graphNo];
    dispatch(
      graphsActions.setEdgesArr([
        JSON.parse(JSON.stringify(res)),
        graphNo,
        graphType,
      ])
    );
  }

  function begin(option) {
    if (option === 1) {
      const res = primsTimeline(list, edgesArr, insertion);
      dispatch(graphsActions.setTimeline(res));
      setAlgoName("Prims");
    }
  }

  function typeClick(num) {
    insertionRef.current.value = "";
    setInsertion(undefined);
    let newInd;
    if (graphType === 2) {
      newInd = 3;
    } else {
      newInd = 2;
    }
    setGraphType(newInd);
    setChosenGraph(undefined);
    dispatch(graphsActions.resetAll());
  }

  function reset() {
    setAlgoName(null);
    dispatch(graphsActions.resetAlgo());
    insertionRef.current.value = "";
    setInsertion(undefined);
  }

  function restart() {
    dispatch(graphsActions.setInd("restart"));
  }

  function forward() {
    dispatch(graphsActions.setInd(1));
  }

  function backward() {
    dispatch(graphsActions.setInd(-1));
  }

  function insertionClick(event) {
    if (event.key === "Enter") {
      const str = insertionRef.current.value.trim();
      let ans = "";
      for (let i of str) {
        if (i.charCodeAt(0) >= 48 && i.charCodeAt(0) <= 57) {
          ans += i;
        } else {
          setInsertion(null);
          return;
        }
      }
      ans = parseInt(ans);
      if (isNaN(ans) || ans < 0 || ans > list.length) {
        setInsertion(null);
        return;
      }
      setInsertion(ans);
      insertionRef.current.value = "";
    }
  }

  return (
    <>
      <div className="flex flex-col w-full py-16 pt-12 px-8 h-full mb-[200px]">
        <h1 className="text-center text-3xl tracking-wide mx-auto w-fit  text-[#9c6644] rounded-xl font-extrabold mb-12">
          Prim's Algorithm
        </h1>
        <div className="flex   mx-auto">
          <div className="flex  border-2 text-[#c08552]   border-neutral-200">
            <div className="flex  flex-col min-w-[350px]">
              <p className="text-lg px-3 m-1 p-1 h-[40px]  bg-[#f3e9dc] justify-center border-2 border-[#c08552] rounded-xl flex items-center font-bold">
                Choose Graph
              </p>
              <div className="bg-[#f3e9dc] border-2 border-[#c08552] m-1 rounded-xl flex justify-between items-center">
                <span className="capitalize mx-auto my-3 px-2 bg-white rounded-md text-black">
                  {types[graphType]}
                </span>
              </div>
              <div className="bg-[#f3e9dc] border-2 border-[#c08552] m-1 rounded-xl flex justify-between items-center">
                <button
                  disabled={algoName != null}
                  onClick={() => {
                    keyClick(-1);
                  }}
                  className="m-2 disabled:opacity-40"
                >
                  <img
                    src={right}
                    className="w-[30px] rotate-180 h-[30px]"
                    alt=""
                  />
                </button>
                <span className="capitalize mx-6 px-2 bg-white rounded-md text-black">
                  {chosenGraph === undefined
                    ? "not selected"
                    : `Graph ${chosenGraph + 1} Selected`}
                </span>
                <button
                  disabled={algoName != null}
                  onClick={() => {
                    keyClick(1);
                  }}
                  className="m-2 disabled:opacity-40"
                >
                  <img src={right} className="w-[30px] h-[30px]" alt="" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex  border-2 text-[#c08552]   border-neutral-200">
            <div className="flex  flex-col min-w-[200px] ">
              <p className="text-lg px-3 m-1 p-1 h-[40px]  bg-[#f3e9dc] justify-center border-2 border-[#c08552] rounded-xl flex items-center font-bold">
                Enter Start Node
              </p>
              <div className="bg-[#f3e9dc] border-2 border-[#c08552] m-1 rounded-xl flex justify-between items-center">
                <input
                  className="px-3 p-1 text-black text-sm min-w-[150px] mx-2 my-2 disabled:opacity-50 disabled:bg-white rounded-md focus:outline-none"
                  placeholder="4 Press Enter"
                  type="text"
                  disabled={list === null || algoName != null}
                  ref={insertionRef}
                  onKeyDown={(event) => insertionClick(event)}
                />
              </div>
              <div className="bg-[#f3e9dc] border-2 flex-grow border-[#c08552] m-1 rounded-xl text-sm flex justify-between items-center">
                {insertion === undefined ? (
                  <p className="mx-auto">Start Node Not Selected</p>
                ) : insertion === null ? (
                  <p className="mx-auto text-red-500">Invalid Value Entered</p>
                ) : (
                  <p className="mx-auto">{`${insertion} is the Starting Node`}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex  border-2 text-[#c08552]   border-neutral-200">
            <div className="flex  flex-col min-w-[200px] ">
              <p className="text-lg px-3 m-1 p-1 h-[40px]  bg-[#f3e9dc] justify-center border-2 border-[#c08552] rounded-xl flex items-center font-bold">
                Begin
              </p>
              <div className="bg-[#f3e9dc] border-2 border-[#c08552] m-1 rounded-xl flex justify-between items-center">
                <button
                  disabled={
                    chosenGraph === undefined ||
                    algoName != null ||
                    insertion === null ||
                    insertion === undefined
                  }
                  onClick={() => {
                    begin(1);
                  }}
                  className="m-2 mx-auto px-4 py-1  font-bold rounded-lg disabled:opacity-30 disabled:pointer-events-none bg-[#87b38d]  border-[2px] duration-700 border-[#87b38d] hover:text-[#87b38d] hover:bg-white text-white"
                >
                  Prim's Algo
                </button>
              </div>
              <div className="bg-[#f3e9dc] border-2 text-sm flex-grow border-[#c08552] m-1 rounded-xl flex justify-between items-center">
                {algoName === null ? (
                  <p className="mx-auto">No Algo Selected</p>
                ) : (
                  <p className="mx-auto">{`${algoName} is running`}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mx-auto flex-grow w-[200px]  mt-2">
          <button
            disabled={algoName === null}
            onClick={reset}
            className="rounded-xl text-xl font-bold bg-[#fec89a] text-[#f8edeb] border-2 border-[#fec89a] hover:bg-[#f8edeb] hover:text-[#fec89a] duration-700 disabled:opacity-50 disabled:pointer-events-none py-[5px] uppercase m-1"
          >
            reset
          </button>
        </div>
        {timeline != null ? (
          <div className="flex mx-auto mt-4 space-x-8">
            {ind === timeline.length - 1 ? (
              <button
                className="p-1 px-2 rounded-lg text-[#757bc8] bg-blue-200"
                onClick={restart}
              >
                Restart
              </button>
            ) : (
              <>
                <button
                  onClick={backward}
                  disabled={ind === null}
                  className="w-[30px] h-[30px] duration-700 disabled:pointer-events-none disabled:opacity-30 hover:scale-110 flex justify-center items-center rounded-full bg-blue-300 "
                >
                  <img src={next} className="w-[50px] rotate-180" alt="" />
                </button>
                <button
                  onClick={forward}
                  className="w-[30px] h-[30px] duration-700 disabled:pointer-events-none disabled:opacity-30 hover:scale-110 flex justify-center items-center rounded-full bg-blue-300 "
                >
                  <img src={next} className="w-[50px]" alt="" />
                </button>
              </>
            )}
          </div>
        ) : null}

        {timeline && ind != null && timeline[ind].msg ? (
          <div className="w-fit mt-8 mx-auto text-lg relative min-h-[40px] border-2 border-black px-6 flex items-center font-medium tracking-wide">
            {timeline[ind].msg.replaceAll("4000", "∞")}

            <span
              style={{
                color: timeline[ind].type === "change" ? "green" : "black",
              }}
              className="absolute left-[50%] translate-x-[-50%] bottom-[-40px] text-nowrap uppercase font-semibold "
            >
              {timeline[ind].type === "change" ? "Relaxation" : "no relaxation"}
            </span>
          </div>
        ) : (
          <div className="mt-8 min-h-[40px] w-[50px] mx-auto"></div>
        )}

        <div className="w-full h-full mt-24 space-x-20 justify-center flex mb-8">
          <div
            style={{ minHeight: `${list ? list.length * 80 : 0}px` }}
            className="w-[50%]  h-full"
          >
            {edgesArr != null && edgesArr.length != 0 ? <Fig></Fig> : null}
          </div>
          <div className="w-fit">
            {ind != null &&
            timeline &&
            timeline[ind] &&
            timeline[ind].parents ? (
              <div className="relative">
                <div className="flex flex-col  border-2 border-black divide-y-2 divide-black w-[60px]">
                  {timeline[ind].parents.map((i, index) => {
                    return (
                      <div className="h-[30px] uppercase font-medium flex justify-center items-center w-full relative">
                        {i === -1 ? "NULL" : i}
                        <span className="absolute left-[-10px] translate-x-[-100%] font-bold top-[50%] translate-y-[-50%]">
                          {index}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <span className="absolute top-[-10px] text-lg font-semibold translate-y-[-100%] right-[50%] translate-x-[50%] uppercase">
                  parents
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
