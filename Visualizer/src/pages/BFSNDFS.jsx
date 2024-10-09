import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { graphsActions } from "../store/main";
import Fig from "../components/bfsdfsComponents/Fig";
import { options } from "../algorithms/options";
import right from "../assets/next.png";
import { bfsTimeline, dfsTimeline } from "../algorithms/graphs";
import next from "../assets/next.png";

const types = [
  "undirected",
  "directed",
  "weighted Undirected",
  "weigted Directed",
];

export default function BSFNDFS() {
  const [chosenGraph, setChosenGraph] = useState(undefined);
  const [graphType, setGraphType] = useState(0);
  const dispatch = useDispatch();
  const edgesArr = useSelector((state) => state.graphs.edgesArr);
  const list = useSelector((state) => state.graphs.list);
  const [algoName, setAlgoName] = useState(null);
  const ind = useSelector((state) => state.graphs.ind);
  const timeline = useSelector((state) => state.graphs.timeline);

  useEffect(() => {
    dispatch(graphsActions.resetAll());
  }, []);

  function keyClick(num) {
    let graphNo;
    if (chosenGraph === undefined) {
      graphNo = 0;
    } else {
      graphNo = chosenGraph + num;
      if (graphNo < 0) {
        graphNo += 10;
      }
      graphNo = graphNo % 10;
    }
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
      const res = bfsTimeline(list);
      dispatch(graphsActions.setTimeline(res));
      setAlgoName("BFS");
    } else {
      const res = dfsTimeline(list);
      dispatch(graphsActions.setTimeline(res));
      setAlgoName("DFS");
    }
  }

  function typeClick(num) {
    let newInd = graphType + num;
    if (newInd < 0) {
      newInd += 4;
    }
    newInd = newInd % 4;
    setGraphType(newInd);
    setChosenGraph(undefined);
    dispatch(graphsActions.resetAll());
  }

  function reset() {
    setAlgoName(null);
    dispatch(graphsActions.resetAlgo());
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

  return (
    <>
      <div className="flex flex-col w-full py-16 pt-12 px-8 h-full">
        <h1 className="text-center text-3xl tracking-wide mx-auto w-fit  text-[#9c6644] rounded-xl font-extrabold mb-12">
          BFS & DFS
        </h1>
        <div className="flex   mx-auto">
          <div className="flex  border-2 text-[#c08552]   border-neutral-200">
            <div className="flex  flex-col min-w-[350px]">
              <p className="text-lg px-3 m-1 p-1 h-[40px]  bg-[#f3e9dc] justify-center border-2 border-[#c08552] rounded-xl flex items-center font-bold">
                Choose Graph
              </p>
              <div className="bg-[#f3e9dc] border-2 border-[#c08552] m-1 rounded-xl flex justify-between items-center">
                <button
                  disabled={algoName != null}
                  onClick={() => {
                    typeClick(-1);
                  }}
                  className="m-2"
                >
                  <img
                    src={right}
                    className="w-[30px] rotate-180 h-[30px]"
                    alt=""
                  />
                </button>
                <span className="capitalize mx-6 px-2 bg-white rounded-md text-black">
                  {types[graphType]}
                </span>
                <button
                  disabled={algoName != null}
                  onClick={() => {
                    typeClick(1);
                  }}
                  className="m-2"
                >
                  <img src={right} className="w-[30px] h-[30px]" alt="" />
                </button>
              </div>
              <div className="bg-[#f3e9dc] border-2 border-[#c08552] m-1 rounded-xl flex justify-between items-center">
                <button
                  disabled={algoName != null}
                  onClick={() => {
                    keyClick(-1);
                  }}
                  className="m-2"
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
                  className="m-2"
                >
                  <img src={right} className="w-[30px] h-[30px]" alt="" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex  border-2 text-[#c08552]   border-neutral-200">
            <div className="flex  flex-col ">
              <p className="text-lg px-3 m-1 p-1 h-[40px]  bg-[#f3e9dc] justify-center border-2 border-[#c08552] rounded-xl flex items-center font-bold">
                BFS / DFS
              </p>
              <div className="bg-[#f3e9dc] border-2 border-[#c08552] m-1 rounded-xl flex justify-between items-center">
                <button
                  disabled={chosenGraph === undefined || algoName != null}
                  onClick={() => {
                    begin(1);
                  }}
                  className="m-2  px-4 py-1  font-bold rounded-lg disabled:opacity-30 disabled:pointer-events-none bg-[#87b38d]  border-[2px] duration-700 border-[#87b38d] hover:text-[#87b38d] hover:bg-white text-white"
                >
                  BFS
                </button>
                <button
                  disabled={chosenGraph === undefined || algoName != null}
                  onClick={() => {
                    begin(2);
                  }}
                  className="m-2  px-4 py-1  font-bold rounded-lg disabled:opacity-30 disabled:pointer-events-none bg-[#87b38d]  border-[2px] duration-700 border-[#87b38d] hover:text-[#87b38d] hover:bg-white text-white"
                >
                  DFS
                </button>
              </div>
              <div className="bg-[#f3e9dc] border-2 flex-grow border-[#c08552] m-1 rounded-xl flex justify-between items-center">
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

        {timeline != null ? (
          <>
            {ind != null ? (
              <div className="flex border-2 border-[#0077b6] divide-x-2 h-fit mx-auto mt-16 divide-[#0077b6]">
                {timeline[ind].bfs.map((i) => {
                  return (
                    <div className="h-[40px] w-[40px] flex justify-center bg-[#caf0f8] items-center text-[#0077b6] font-semibold">
                      {i}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="min-h-[104px] w-[20px]"></div>
            )}
          </>
        ) : null}

        <div
          style={{ minHeight: `${list ? list.length * 80 : 0}px` }}
          className="w-full h-full mt-16 flex mb-8 "
        >
          {edgesArr != null && edgesArr.length != 0 ? <Fig></Fig> : null}
        </div>
      </div>
    </>
  );
}
