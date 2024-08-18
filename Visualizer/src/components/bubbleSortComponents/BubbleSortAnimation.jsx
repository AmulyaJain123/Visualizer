import Node from "./Node";
import { useState } from "react";
import next from "../../assets/next.png";
import { useAnimate } from "framer-motion";

export default function BubbleSortAnimation({ arr, order }) {
  const [ind, setInd] = useState(0);
  const [history, setHistory] = useState([arr]);
  const [array, setArray] = useState(arr);
  const [successInd, setSuccessInd] = useState(arr.length);
  const [scope, animate] = useAnimate();
  const [hang, setHang] = useState(false);

  function forward() {
    setHang(true);
    setTimeout(() => {
      if (ind + 1 < array.length) {
        if (
          (order === "asc" && array[ind] > array[ind + 1]) ||
          (order === "desc" && array[ind] < array[ind + 1])
        ) {
          // setHang(true);
          animate(".first", { x: 82 }, { type: "spring", duration: 2 });
          animate(".second", { x: -82 }, { type: "spring", duration: 2 });
          setTimeout(() => {
            if (order === "desc" && array[ind] < array[ind + 1]) {
              let newArr = [...array];
              let num = newArr[ind];
              newArr[ind] = newArr[ind + 1];
              newArr[ind + 1] = num;
              setArray([...newArr]);
            }
            if (order === "asc" && array[ind] > array[ind + 1]) {
              let newArr = [...array];
              let num = newArr[ind];
              newArr[ind] = newArr[ind + 1];
              newArr[ind + 1] = num;
              setArray([...newArr]);
            }
            if (ind + 2 === successInd) {
              if (successInd === 2) {
                setSuccessInd(0);
              } else {
                setSuccessInd((p) => p - 1);
              }
            }
            setHistory((p) => {
              return [...p, [...array]];
            });
            setInd((ind) => {
              return (ind + 1) % (successInd - 1);
            });
            setHang(false);
          }, 2000);
        } else {
          if (ind + 2 === successInd) {
            if (successInd === 2) {
              setSuccessInd(0);
            } else {
              setSuccessInd((p) => p - 1);
            }
          }
          setHistory((p) => {
            return [...p, [...array]];
          });
          setInd((ind) => {
            return (ind + 1) % (successInd - 1);
          });
          setHang(false);
        }
      }
    }, 0);
  }

  console.log(ind, array, history, successInd);

  function backward() {
    const preArr = history[history.length - 1];
    const newHistory = [...history];
    newHistory.splice(history.length - 1, 1);
    const successIndProxy = successInd;
    if (ind === 0) {
      setSuccessInd((p) => p + 1);
    }
    setHistory([...newHistory]);
    setArray([...preArr]);
    setInd((p) => {
      if (p === 0) {
        return successIndProxy - 1;
      } else {
        return p - 1;
      }
    });
  }

  function restart() {
    setInd(0);
    setSuccessInd(array.length);
    const arr = history[0];
    setArray([...arr]);
    setHistory((p) => {
      return [[...p[0]]];
    });
  }

  return (
    <div className="flex flex-col">
      <div ref={scope} className="flex">
        {array.map((i, index) => {
          return (
            <div key={Math.random()} className="m-4">
              <Node
                highlight={
                  (index === ind || index === ind + 1) &&
                  successInd > 0 &&
                  array.length > 1
                }
                index={index}
                ind={ind}
                color={"#0077b6"}
                textCol={"#caf0f8"}
                success={index + 1 > successInd || array.length === 1}
              >
                {i}
              </Node>
            </div>
          );
        })}
      </div>
      <div className="flex mx-auto mt-16 space-x-8">
        {successInd === 0 || array.length === 1 ? (
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
              disabled={(successInd === array.length && ind === 0) || hang}
              className="w-[30px] h-[30px] duration-700 disabled:pointer-events-none disabled:opacity-30 hover:scale-110 flex justify-center items-center rounded-full bg-blue-300 "
            >
              <img src={next} className="w-[50px] rotate-180" alt="" />
            </button>
            <button
              onClick={forward}
              disabled={successInd <= 0 || hang}
              className="w-[30px] h-[30px] duration-700 disabled:pointer-events-none disabled:opacity-30 hover:scale-110 flex justify-center items-center rounded-full bg-blue-300 "
            >
              <img src={next} className="w-[50px]" alt="" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
