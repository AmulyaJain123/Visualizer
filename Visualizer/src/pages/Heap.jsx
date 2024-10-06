import { useState, useRef, useEffect } from "react";
import InsertionAnimation from "../components/heapComponents/InsertionAnimation";
import { useDispatch } from "react-redux";
import { bstActions } from "../store/main";
import Tree from "../components/binarySearchTreeComponents/Tree";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import DeletionAnimation from "../components/heapComponents/DeletionAnimation";
import Array from "../components/heapComponents/Array";

export default function Heap() {
  const insertionRef = useRef();
  const [disable, setDisable] = useState(false);
  const [insertion, setInsertion] = useState(undefined);
  const [deletion, setDeletion] = useState(undefined);
  const typeRef = useRef(null);
  const dispatch = useDispatch();
  const treeArray = useSelector((state) => state.bst.treeArr);
  const treeObject = useSelector((state) => state.bst.treeObject);
  const heapType = useSelector((state) => state.bst.heapType);
  const heapArr = useSelector((state) => state.bst.heapArr);
  const animationRef = useRef();
  const [typeVal, setTypeVal] = useState("max");

  useEffect(() => {
    dispatch(bstActions.setCurrentOp(null));
    dispatch(bstActions.setTreeArr(null));
    dispatch(bstActions.setTreeObject(null));
    dispatch(bstActions.setHeapArr(null));
    dispatch(bstActions.setMinMaxNumber(null));
    dispatch(bstActions.setHeapType(null));
  }, []);

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
      if (isNaN(ans) || ans < 0) {
        setInsertion(null);
        return;
      }
      setInsertion(ans);
      begin(0);
      setDisable(true);
      if (heapType === null) {
        dispatch(bstActions.setHeapType(typeVal));
      }
      dispatch(bstActions.setCurrentOp([0, ans]));
    }
  }

  function deletionClick() {
    setDeletion(true);
    begin(1);
    setDisable(true);
    dispatch(bstActions.setCurrentOp([1, null]));
  }

  function begin(num) {
    insertionRef.current.value = "";
    dispatch(bstActions.setMinMaxNumber(null));
    if (num === 0) {
      setDeletion(undefined);
    } else if (num === 1) {
      setInsertion(undefined);
    } else if (num === 2) {
      setInsertion(undefined);
      setDeletion(undefined);
    } else {
      setInsertion(undefined);
      setDeletion(undefined);
    }
  }

  function reset() {
    setDisable(false);
    setInsertion(undefined);
    setDeletion(undefined);
    setTypeVal("max");
    dispatch(bstActions.setTreeArr(null));
    dispatch(bstActions.setCurrentOp(null));
    dispatch(bstActions.setTreeObject(null));
    dispatch(bstActions.setHeapType(null));
    dispatch(bstActions.setHeapArr(null));

    insertionRef.current.value = "";
    typeRef.current.value = "max";
  }

  function clean() {
    setDisable(false);
    setInsertion(undefined);
    setDeletion(undefined);
  }

  function skip() {
    animationRef.current.skip();
  }

  function cancel() {
    clean();
    dispatch(bstActions.setCurrentOp(null));
  }

  function minMax() {
    dispatch(bstActions.setMinMaxNumber(heapArr ? heapArr[0] : null));
  }

  return (
    <>
      <div className="flex flex-col w-full py-16 pt-12 px-8 h-full">
        <h1 className="text-center text-3xl tracking-wide mx-auto w-fit  text-[#9c6644] rounded-xl font-extrabold mb-12">
          Heap
        </h1>
        <div className="flex   mx-auto">
          <div className="flex  border-2 text-[#c08552]   border-neutral-200">
            <div className="flex flex-col max-w-[200px]">
              <p className="text-lg px-3 m-1 p-1 h-[40px]  bg-[#f3e9dc] justify-center border-2 border-[#c08552] rounded-xl flex items-center font-bold">
                Insertion
              </p>
              <div className="bg-[#f3e9dc] border-2 border-[#c08552] m-1 rounded-xl flex justify-center items-center">
                <input
                  className="px-3 p-1 text-black text-sm min-w-[150px] mx-2 my-2 disabled:opacity-50 disabled:bg-white rounded-md focus:outline-none"
                  placeholder="4 Press Enter"
                  type="text"
                  disabled={disable}
                  ref={insertionRef}
                  onKeyDown={(event) => insertionClick(event)}
                />
              </div>

              <div className="px-2 p-1 m-1  bg-[#f3e9dc] border-2 h-16 border-[#c08552] rounded-xl text-sm flex-grow justify-center items-center flex ">
                {insertion === undefined ? (
                  <p></p>
                ) : insertion === null ? (
                  <p className="text-red-500">Invalid Value Entered</p>
                ) : (
                  <p className="max-w-[400px]">{insertion}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col max-w-[200px]">
              <p className="text-lg px-3 m-1 p-1 h-[40px]  bg-[#f3e9dc] justify-center border-2 border-[#c08552] rounded-xl flex items-center font-bold">
                Deletion
              </p>
              <div className="px-2 p-1 m-1  bg-[#f3e9dc] border-2 h-16 border-[#c08552] rounded-xl text-sm flex-grow justify-center items-center flex ">
                <button
                  disabled={disable || heapArr === null || heapArr.length === 0}
                  onClick={deletionClick}
                  className=" px-4 flex-col pb-1  m-4 rounded-lg disabled:opacity-30 disabled:pointer-events-none bg-[#87b38d] text-lg border-[2px] duration-700 border-[#87b38d] hover:text-[#87b38d] hover:bg-white text-white font-semibold flex justify-center items-center"
                >
                  Delete Root
                </button>
              </div>
            </div>
            <div className="flex flex-col max-w-[200px]">
              <p className="text-lg px-3 m-1 p-1 h-[40px]  bg-[#f3e9dc] justify-center border-2 border-[#c08552] rounded-xl flex items-center font-bold">
                Min/Max
              </p>

              <div className="px-2 p-1 m-1  bg-[#f3e9dc] border-2 h-16 border-[#c08552] rounded-xl text-sm flex-grow justify-center items-center flex ">
                <button
                  disabled={disable || heapArr === null || heapArr.length === 0}
                  onClick={minMax}
                  className=" px-4 flex-col pb-1  m-4 rounded-lg disabled:opacity-30 disabled:pointer-events-none bg-[#87b38d] text-lg border-[2px] duration-700 border-[#87b38d] hover:text-[#87b38d] hover:bg-white text-white font-semibold flex justify-center items-center"
                >
                  Max/Min
                </button>
              </div>
            </div>
            <div className="flex flex-col w-[180px]">
              <p className="text-lg px-3 m-1 p-1 h-[40px]  bg-[#f3e9dc] justify-center border-2 border-[#c08552] rounded-xl flex items-center font-bold">
                Type
              </p>
              <div className="bg-[#f3e9dc] border-2 border-[#c08552] m-1 rounded-xl flex justify-center items-center">
                <select
                  className="px-3 p-1 text-black text-sm min-w-[150px] mx-2 my-2 disabled:opacity-50 disabled:bg-white rounded-md focus:outline-none"
                  disabled={disable || heapType != null}
                  ref={typeRef}
                  value={typeVal}
                  onChange={(event) => setTypeVal(event.target.value)}
                >
                  <option value="max">Max Heap</option>
                  <option value="min">Min Heap</option>
                </select>
              </div>

              <div className="px-2 p-1 m-1  bg-[#f3e9dc] border-2 h-16 border-[#c08552] rounded-xl text-sm flex-grow justify-center items-center flex ">
                {heapType != null ? (
                  <div className="capitalize">{heapType} heap type set</div>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col w-[150px] justify-center ml-2">
              <button
                disabled={!disable}
                onClick={cancel}
                className="rounded-xl text-xl font-bold bg-[#f4acb7] text-[#fff0f3] border-2 border-[#f4acb7] hover:bg-[#fff0f3] hover:text-[#f4acb7] duration-700 disabled:opacity-50 disabled:pointer-events-none py-2 uppercase m-1 "
              >
                cancel
              </button>
              <button
                disabled={!disable}
                onClick={skip}
                className="rounded-xl text-xl font-bold bg-[#adc178] text-[#eff6e0] border-2 border-[#adc178] hover:bg-[#eff6e0] hover:text-[#adc178] duration-700 disabled:opacity-50 disabled:pointer-events-none py-2 uppercase m-1"
              >
                skip
              </button>
              <button
                disabled={treeArray === null}
                onClick={reset}
                className="rounded-xl text-xl font-bold bg-[#fec89a] text-[#f8edeb] border-2 border-[#fec89a] hover:bg-[#f8edeb] hover:text-[#fec89a] duration-700 disabled:opacity-50 disabled:pointer-events-none py-2 uppercase m-1"
              >
                reset
              </button>
            </div>
          </div>
        </div>

        <div className="w-full  mt-8  customScroll justify-center items-center">
          {disable && insertion != null && insertion != undefined ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
            >
              <InsertionAnimation ref={animationRef} clean={clean} />
            </motion.div>
          ) : null}
          {disable && deletion != null && deletion != undefined ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
            >
              <DeletionAnimation ref={animationRef} clean={clean} />
            </motion.div>
          ) : null}
          {!disable && treeArray != null ? (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
            >
              <Array array={heapArr != null ? [...heapArr] : []}></Array>
              <Tree />
            </motion.div>
          ) : null}
        </div>
      </div>
    </>
  );
}
