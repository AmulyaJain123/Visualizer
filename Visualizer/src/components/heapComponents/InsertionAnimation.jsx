import { useDispatch, useSelector } from "react-redux";
import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import next from "../../assets/next.png";
import {
  insertionTimeline,
  insertionInHeap,
  heapArrToTreeArr,
  heapArrToTreeObj,
} from "../../algorithms/heap";
import { useAnimate } from "framer-motion";
import { bstActions } from "../../store/main";
import InsertionTree from "./InsertionTree";
import TreeNode from "./TreeNode";

const InsertionAnimation = forwardRef(function InsertionAnimation(
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
      currNode: null,
      parNode: null,
      treeArr: treeArr,
      treeObject: treeObject,
    },
  ]);
  const [timeline, setTimeline] = useState(null);
  const [currInd, setCurrInd] = useState(null);
  const [found, setFound] = useState(null);
  const [status, setStatus] = useState(null);
  const [scope, animate] = useAnimate();

  const [currNode, setCurrNode] = useState(null);
  const [parNode, setParNode] = useState(null);
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => {
    return {
      skip() {
        end();
      },
    };
  });

  useEffect(() => {
    const array = insertionTimeline(heapArr, currentOp[1], heapType);
    console.log(array);
    setTimeline(JSON.parse(JSON.stringify(array)));
  }, []);

  function end() {
    const newArr = insertionInHeap(heapArr, currentOp[1], heapType);
    console.log(newArr);
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
    if (type === "push") {
      const newHeapArr = JSON.parse(JSON.stringify(heapArr));
      newHeapArr.push(currentOp[1]);
      const newTreeArr = heapArrToTreeArr(newHeapArr);
      const newTreeObj = heapArrToTreeObj(newHeapArr);
      console.log(newTreeArr, newTreeObj);
      setTreeArr(newTreeArr);
      setTreeObject(newTreeObj);
      setCurrNode([timelineObj.currx, timelineObj.curry]);
      setCurrInd(newInd);
      setHistory((p) => {
        return [
          ...p,
          {
            ...p[p.length - 1],
            treeArr: newTreeArr,
            treeObject: newTreeObj,
            currNode: [timelineObj.currx, timelineObj.curry],
            currInd: newInd,
          },
        ];
      });
    } else if (type === "parentSelected") {
      setParNode([timelineObj.parx, timelineObj.pary]);
      setCurrInd(newInd);
      setHistory((p) => {
        return [
          ...p,
          {
            ...p[p.length - 1],
            parNode: [timelineObj.parx, timelineObj.pary],
            currInd: newInd,
          },
        ];
      });
    } else if (type === "compare" || type === "noChange" || type === "swap") {
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
    } else if (type === "swapComplete") {
      const newTreeArr = JSON.parse(JSON.stringify(treeArr));
      const px = parNode[0];
      const py = parNode[1];
      const cx = currNode[0];
      const cy = currNode[1];
      console.log(px, py, cx, cy);
      const temp = newTreeArr[px][py];
      newTreeArr[px][py] = newTreeArr[cx][cy];
      newTreeArr[cx][cy] = temp;
      setTreeArr(newTreeArr);
      setParNode(null);
      setCurrNode([px, py]);
      setCurrInd(newInd);
      setHistory((p) => {
        return [
          ...p,
          {
            ...p[p.length - 1],
            treeArr: newTreeArr,
            parNode: null,
            currNode: [px, py],
            currInd: newInd,
          },
        ];
      });
    } else if (type === "successful") {
      setStatus(true);
      setParNode(null);
      setCurrNode(null);
      setHistory((p) => {
        return [
          ...p,
          {
            ...p[p.length - 1],
            status: true,
            parNode: null,
            currNode: null,
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
    setParNode(JSON.parse(JSON.stringify(lastHistory.parNode)));
    setCurrNode(JSON.parse(JSON.stringify(lastHistory.currNode)));
    setTreeArr(JSON.parse(JSON.stringify(lastHistory.treeArr)));
    setTreeObject(JSON.parse(JSON.stringify(lastHistory.treeObject)));
    const newHistory = JSON.parse(JSON.stringify(history));
    newHistory.pop();
    setHistory(newHistory);
  }

  function restart() {
    setCurrInd(null);
    setStatus(null);
    setTreeArr(JSON.parse(JSON.stringify(originalArr)));
    setTreeObject(JSON.parse(JSON.stringify(originalObj)));
    setCurrNode(null);
    setParNode(null);
    setHistory([
      {
        currInd: null,
        status: null,
        currNode: null,
        parNode: null,
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
                <button
                  className="p-1 px-2 rounded-lg text-[#757bc8] bg-blue-200"
                  onClick={end}
                >
                  End
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={backward}
                  disabled={currInd === null}
                  className="w-[30px] h-[30px] duration-700 disabled:pointer-events-none disabled:opacity-30 hover:scale-110 flex justify-center items-center rounded-full bg-blue-300 "
                >
                  <img
                    src={next}
                    className="w-[50px] rotate-180 select-none"
                    alt=""
                  />
                </button>
                <button
                  onClick={forward}
                  className="w-[30px] h-[30px] duration-700 disabled:pointer-events-none disabled:opacity-30 hover:scale-110 flex justify-center items-center rounded-full bg-blue-300 "
                >
                  <img src={next} className="w-[50px] select-none" alt="" />
                </button>
              </>
            )}
          </div>
        </div>
        <div ref={scope}>
          <InsertionTree
            treeArr={treeArr}
            status={status}
            currentNode={timeline && currInd != null ? timeline[currInd] : null}
            found={found}
          />
        </div>
      </>
    );
  }
});

export default InsertionAnimation;
