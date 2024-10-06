import { useDispatch, useSelector } from "react-redux";
import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import next from "../../assets/next.png";
import {
  insertionTimeline,
  insertionInHeap,
  heapArrToTreeArr,
  heapArrToTreeObj,
  deletionTimeline,
  deletionInHeap,
  heapSortTimeline,
} from "../../algorithms/heap";
import { useAnimate } from "framer-motion";
import { bstActions } from "../../store/main";
import TreeNode from "./TreeNode";
import DeletionTree from "./DeletionTree";

const DeletionAnimation = forwardRef(function DeletionAnimation(
  { clean },
  ref
) {
  const [treeObject, setTreeObject] = useState(
    JSON.parse(JSON.stringify(useSelector((state) => state.bst.treeObject)))
  );
  const [treeArr, setTreeArr] = useState(
    JSON.parse(JSON.stringify(useSelector((state) => state.bst.treeArr)))
  );
  const [heapArr, setHeapArr] = useState(
    JSON.parse(JSON.stringify(useSelector((state) => state.bst.heapArr)))
  );
  const originalObj = useSelector((state) => state.bst.treeObject);
  const originalArr = useSelector((state) => state.bst.treeArr);
  const originalHeap = useSelector((state) => state.bst.heapArr);
  const heapType = useSelector((state) => state.bst.heapType);

  const currentOp = useSelector((state) => state.bst.currentOp);
  const [history, setHistory] = useState([
    {
      currInd: null,
      status: null,
      treeArr: treeArr,
      sortedArr: [],
      treeObject: treeObject,
    },
  ]);
  const [timeline, setTimeline] = useState(null);
  const [currInd, setCurrInd] = useState(null);
  const [sortedArr, setSortedArr] = useState([]);
  const [found, setFound] = useState(null);
  const [status, setStatus] = useState(null);
  const [scope, animate] = useAnimate();
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => {
    return {
      skip() {
        end();
      },
    };
  });

  useEffect(() => {
    const array = heapSortTimeline(heapArr, heapType);
    console.log(array);
    setTimeline(JSON.parse(JSON.stringify(array)));
  }, []);

  function end() {
    const newArr = deletionInHeap(heapArr, heapType);
    console.log(newArr);
    if (newArr.length === 0) {
      dispatch(bstActions.setTreeObject(null));
      dispatch(bstActions.setTreeArr(null));
      dispatch(bstActions.setHeapArr(null));
      clean();
      return;
    }
    const newTreeObj = JSON.parse(JSON.stringify(heapArrToTreeObj(newArr)));
    console.log(newTreeObj);
    const newTreeArr = JSON.parse(JSON.stringify(heapArrToTreeArr(newArr)));
    console.log(newTreeArr);
    dispatch(bstActions.setTreeObject(newTreeObj));
    dispatch(bstActions.setTreeArr(newTreeArr));
    dispatch(bstActions.setHeapArr(newArr));

    clean();
  }

  function forward() {
    const newInd = currInd === null ? 0 : currInd + 1;
    const type = timeline[newInd].type;
    const timelineObj = timeline[newInd];
    if (
      type === "replaceBeforeDelete" ||
      type === "delete" ||
      type === "comparingChildren" ||
      type === "verifying" ||
      type === "swap" ||
      type === "next" ||
      type === "noChange" ||
      type === "successful"
    ) {
      setCurrInd(newInd);
      setHistory((p) => {
        return [
          ...p,
          {
            ...p[p.length - 1],
            currInd: newInd,
          },
        ];
      });
    } else if (
      type === "replaceBeforeDeleteCompleted" ||
      type === "swapComplete"
    ) {
      const newTreeArr = JSON.parse(JSON.stringify(treeArr));
      const temp = newTreeArr[timelineObj.x1][timelineObj.y1];
      newTreeArr[timelineObj.x1][timelineObj.y1] =
        newTreeArr[timelineObj.x2][timelineObj.y2];
      newTreeArr[timelineObj.x2][timelineObj.y2] = temp;
      setTreeArr(newTreeArr);
      setCurrInd(newInd);
      setHistory((p) => {
        return [
          ...p,
          {
            ...p[p.length - 1],
            currInd: newInd,
            treeArr: newTreeArr,
          },
        ];
      });
    } else if (type === "deleteComplete") {
      const newTreeArr = JSON.parse(JSON.stringify(treeArr));
      const val = newTreeArr[timelineObj.x2][timelineObj.y2];
      const newSortedArr = [...sortedArr, val];
      newTreeArr[timelineObj.x2][timelineObj.y2] = null;
      setTreeArr(newTreeArr);
      setSortedArr([...newSortedArr]);
      setCurrInd(newInd);
      setHistory((p) => {
        return [
          ...p,
          {
            ...p[p.length - 1],
            currInd: newInd,
            treeArr: newTreeArr,
            sortedArr: newSortedArr,
          },
        ];
      });
    } else if (type === "fullSuccessful") {
      setStatus(true);
      setHistory((p) => {
        return [
          ...p,
          {
            ...p[p.length - 1],
            status: true,
          },
        ];
      });
    }
  }
  console.log(timeline, currInd, found);

  function backward() {
    const lastHistory = JSON.parse(JSON.stringify(history[history.length - 2]));
    setCurrInd(lastHistory.currInd);
    setStatus(lastHistory.status);
    setTreeArr(JSON.parse(JSON.stringify(lastHistory.treeArr)));
    setSortedArr([...lastHistory.sortedArr]);
    setTreeObject(JSON.parse(JSON.stringify(lastHistory.treeObject)));
    const newHistory = JSON.parse(JSON.stringify(history));
    newHistory.pop();
    setHistory(newHistory);
  }

  function restart() {
    setCurrInd(null);
    setStatus(null);
    setTreeArr(JSON.parse(JSON.stringify(originalArr)));
    setSortedArr([]);
    setTreeObject(JSON.parse(JSON.stringify(originalObj)));
    setHistory([
      {
        currInd: null,
        status: null,
        sortedArr: [],
        treeArr: JSON.parse(JSON.stringify(originalArr)),
        treeObject: JSON.parse(JSON.stringify(originalObj)),
      },
    ]);
  }

  if (treeObject === null) {
    return (
      <>
        <div className="">
          <div className="flex justify-center space-x-4">
            <button
              className="p-1 px-2 rounded-lg text-[#757bc8] bg-blue-200"
              onClick={end}
            >
              End
            </button>
          </div>
        </div>
        <div className="flex flex-col m-auto mt-16">
          <div className="flex w-auto relative justify-center h-[80px]">
            <TreeNode>{currentOp[1]}</TreeNode>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="sticky">
          <div className="flex space-x-4  justify-center">
            {status === true || status === false ? (
              <>
                <button
                  className="p-1 px-2 rounded-lg text-[#757bc8] bg-blue-200"
                  onClick={restart}
                >
                  Restart
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={backward}
                  disabled={currInd === null}
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
        </div>
        <div className="flex justify-center h-[40px] mt-8 space-x-4">
          {sortedArr.map((i) => {
            return (
              <div className="w-[40px] h-[40px] rounded-full flex justify-center items-center text-white bg-[#4f772d]">
                {i}
              </div>
            );
          })}
        </div>
        <div ref={scope}>
          {treeArr === null || treeArr[0][0] === null ? (
            <>
              <span className="font-semibold border-2 px-3 border-neutral-500 items-center mt-8 text-lg text-green-800 uppercase h-[30px] w-fit mx-auto flex justify-center">
                {status != null
                  ? "heap sort complete"
                  : currInd === null
                  ? ""
                  : timeline[currInd].type === "successful"
                  ? "Root Deleted"
                  : "Deleting root"}
              </span>
              {status === null ? (
                <span className="font-semibold mt-16 flex justify-center">
                  {" "}
                  TREE EMPTY
                </span>
              ) : null}
            </>
          ) : (
            <>
              <span className="font-semibold border-2 px-3 border-neutral-500 items-center mt-8 text-lg text-green-800 uppercase h-[30px] w-fit mx-auto flex justify-center">
                {currInd === null
                  ? `Sequence coverted to '${heapType}' heap`
                  : timeline[currInd].type === "successful"
                  ? `Successfully deleted " ${
                      sortedArr[sortedArr.length - 1]
                    } " and heapified`
                  : timeline[currInd].type === "replaceBeforeDelete" ||
                    timeline[currInd].type === "replaceBeforeDeleteCompleted" ||
                    timeline[currInd].type === "delete" ||
                    timeline[currInd].type === "deleteComplete"
                  ? "Deleting root"
                  : "Heapify"}
              </span>
              <DeletionTree
                treeArr={treeArr}
                status={status}
                currentNode={
                  timeline && currInd != null ? timeline[currInd] : null
                }
                found={found}
              />
            </>
          )}
        </div>
      </>
    );
  }
});

export default DeletionAnimation;
