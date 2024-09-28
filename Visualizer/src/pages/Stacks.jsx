import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { stacksNQueueActions } from "../store/main";
import { useSelector } from "react-redux";
import StackAnimation from "../components/stacksNQueueComponents/StackAnimation";

export default function Stacks() {
  const pushRef = useRef();
  const disable = useSelector((state) => state.stacksNQueue.disable);
  const [push, setPush] = useState(undefined);
  const dispatch = useDispatch();
  const stack = useSelector((state) => state.stacksNQueue.stackArr);
  const currOp = useSelector((state) => state.stacksNQueue.currentOp);

  useEffect(() => {
    dispatch(stacksNQueueActions.reset());
  }, []);

  function pushClick(event) {
    if (event.key === "Enter") {
      const str = pushRef.current.value.trim();
      let ans = "";
      for (let i of str) {
        if (i.charCodeAt(0) >= 48 && i.charCodeAt(0) <= 57) {
          ans += i;
        } else {
          setPush(null);
          return;
        }
      }
      ans = parseInt(ans);
      if (isNaN(ans) || ans < 0) {
        setPush(null);
        return;
      }
      setPush(`${ans} is Pushed`);
      begin(0);
      dispatch(stacksNQueueActions.setDisable(true));
      dispatch(stacksNQueueActions.setCurrOp(["push", ans]));
    }
  }

  function popClick() {
    begin(1);
    dispatch(stacksNQueueActions.setDisable(true));
    dispatch(stacksNQueueActions.setCurrOp(["pop", null]));
  }

  function begin(num) {
    pushRef.current.value = "";
    dispatch(stacksNQueueActions.setPeekElement(null));
    if (num === 0) {
    } else {
      setPush(undefined);
    }
  }

  function peekClick() {
    begin(2);
    dispatch(stacksNQueueActions.setDisable(true));
    dispatch(stacksNQueueActions.setCurrOp(["peek", null]));
  }

  function reset() {
    dispatch(stacksNQueueActions.setDisable(false));
    dispatch(stacksNQueueActions.setStackArr(null));
    dispatch(stacksNQueueActions.setPeekElement(null));
    dispatch(stacksNQueueActions.setCurrOp(null));
    setPush(undefined);
    pushRef.current.value = "";
  }

  return (
    <>
      <div className="flex flex-col w-full py-16 pt-12 px-8 h-full">
        <h1 className="text-center text-3xl tracking-wide mx-auto w-fit  text-[#9c6644] rounded-xl font-extrabold mb-12">
          Stacks
        </h1>
        <div className="flex flex-col mx-auto">
          <div className="flex  border-2 text-[#c08552]   border-neutral-200">
            <div className="flex flex-col max-w-[200px]">
              <p className="text-lg px-3 m-1 p-1 h-[40px]  bg-[#f3e9dc] justify-center border-2 border-[#c08552] rounded-xl flex items-center font-bold">
                Push
              </p>
              <div className="bg-[#f3e9dc] border-2 border-[#c08552] m-1 rounded-xl flex justify-center items-center">
                <input
                  className="px-3 p-1 text-black text-sm min-w-[150px] mx-2 my-2 disabled:opacity-50 disabled:bg-white rounded-md focus:outline-none"
                  placeholder="4 Press Enter"
                  type="text"
                  disabled={disable}
                  ref={pushRef}
                  onKeyDown={(event) => pushClick(event)}
                />
              </div>

              <div className="px-2 p-1 m-1  bg-[#f3e9dc] border-2 h-16 border-[#c08552] rounded-xl text-sm flex-grow justify-center items-center flex ">
                {push === undefined ? (
                  <p></p>
                ) : push === null ? (
                  <p className="text-red-500">Invalid Value Entered</p>
                ) : (
                  <p className="max-w-[400px]">{push}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col max-w-[200px]">
              <p className="text-lg px-3 m-1 p-1 h-[40px]  bg-[#f3e9dc] justify-center border-2 border-[#c08552] rounded-xl flex items-center font-bold">
                Pop
              </p>
              <div className="bg-[#f3e9dc] flex-grow border-2 border-[#c08552] m-1 rounded-xl flex justify-center items-center">
                <button
                  onClick={popClick}
                  disabled={disable || stack === null || stack.length === 0}
                  className="px-4 flex-col pb-1  m-4 rounded-lg disabled:opacity-30 disabled:pointer-events-none bg-[#87b38d] text-lg border-[2px] duration-700 border-[#87b38d] hover:text-[#87b38d] hover:bg-white text-white font-semibold flex justify-center items-center"
                >
                  Pop
                </button>
              </div>
            </div>
            <div className="flex flex-col max-w-[200px]">
              <p className="text-lg px-3 m-1 p-1 h-[40px]  bg-[#f3e9dc] justify-center border-2 border-[#c08552] rounded-xl flex items-center font-bold">
                Peek
              </p>
              <div className="bg-[#f3e9dc] border-2 border-[#c08552] m-1 rounded-xl flex justify-center items-center flex-grow">
                <button
                  onClick={peekClick}
                  disabled={disable || stack === null || stack.length === 0}
                  className="px-4 flex-col pb-1  m-4 rounded-lg disabled:opacity-30 disabled:pointer-events-none bg-[#87b38d] text-lg border-[2px] duration-700 border-[#87b38d] hover:text-[#87b38d] hover:bg-white text-white font-semibold flex justify-center items-center"
                >
                  Peek
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col mx-auto flex-grow w-[150px]  mt-2">
            <button
              disabled={!(currOp != null)}
              onClick={reset}
              className="rounded-xl text-xl font-bold bg-[#fec89a] text-[#f8edeb] border-2 border-[#fec89a] hover:bg-[#f8edeb] hover:text-[#fec89a] duration-700 disabled:opacity-50 disabled:pointer-events-none py-2 uppercase m-1"
            >
              reset
            </button>
          </div>
        </div>

        <div className="w-full  mt-8  customScroll justify-center items-center">
          {currOp != null ? <StackAnimation></StackAnimation> : null}
        </div>
      </div>
    </>
  );
}
