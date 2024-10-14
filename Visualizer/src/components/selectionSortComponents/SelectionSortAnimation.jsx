import Node from "./Node";
import { useState } from "react";
import next from "../../assets/next.png";
import { useAnimate } from "framer-motion";

export default function SelectionSortAnimation({ arr, order }) {
  const [ind, setInd] = useState(0);
  const [val, setVal] = useState(0);
  const [history, setHistory] = useState([
    { list: arr, successInd: 0, ind: 0, val: 0 },
  ]);
  const [array, setArray] = useState(arr);
  const [successInd, setSuccessInd] = useState(0);
  const [scope, animate] = useAnimate();
  const [hang, setHang] = useState(false);

  function forward() {
    setHang(true);
    setTimeout(() => {
      const newArr = [...array];
      if (ind === array.length - 1) {
        const value = array[val];
        const temp = newArr[successInd];
        newArr[successInd] = newArr[val];
        newArr[val] = temp;
        if (val != successInd) {
          animate(
            ".first",
            { x: 82 * (val - successInd) },
            { type: "tween", duration: 1 }
          );
          animate(
            ".second",
            { x: -82 * (val - successInd) },
            { type: "tween", duration: 1 }
          );
          setTimeout(() => {
            setArray([...newArr]);
            const successIndProxy = successInd;
            setInd(successInd + 1);
            setSuccessInd((p) => p + 1);
            setVal(successIndProxy + 1);
            setHistory((p) => {
              return [
                ...p,
                {
                  list: [...newArr],
                  successInd: successIndProxy + 1,
                  ind: successIndProxy + 1,
                  val: successIndProxy + 1,
                },
              ];
            });
            setHang(false);
          }, 1000);
        } else {
          setArray([...newArr]);
          const successIndProxy = successInd;
          setInd(successInd + 1);
          setSuccessInd((p) => p + 1);
          setVal(successIndProxy + 1);
          setHistory((p) => {
            return [
              ...p,
              {
                list: [...newArr],
                successInd: successIndProxy + 1,
                ind: successIndProxy + 1,
                val: successIndProxy + 1,
              },
            ];
          });
          setHang(false);
        }
      } else {
        const value = array[ind + 1];
        const indProxy = ind;
        let newVal = val;

        if (
          (order === "desc" && value > array[val]) ||
          (order === "asc" && value < array[val])
        ) {
          setVal(indProxy + 1);
          newVal = ind + 1;
        }
        setInd((p) => p + 1);
        setHistory((p) => {
          return [
            ...p,
            {
              list: [...array],
              successInd: successInd,
              ind: indProxy + 1,
              val: newVal,
            },
          ];
        });
        setHang(false);
      }
    }, 0);
  }

  console.log(ind, array, history, successInd);

  function backward() {
    const newHistory = [...history];
    const num = newHistory.length - 2;
    const prevArray = [...newHistory[num].list];
    const prevSuccessInd = newHistory[num].successInd;
    const prevInd = newHistory[num].ind;
    const prevVal = newHistory[num].val;
    setHistory((p) => {
      const newHis = [...p];
      newHis.splice(newHis.length - 1, 1);
      return [...newHis];
    });
    setInd(prevInd);
    setSuccessInd(prevSuccessInd);
    setArray(prevArray);
    setVal(prevVal);
  }

  function restart() {
    setInd(0);
    setSuccessInd(0);
    setVal(0);
    setArray([...arr]);
    setHistory((p) => {
      return [
        {
          list: [...p[0].list],
          ind: p[0].ind,
          successInd: p[0].successInd,
          val: p[0].val,
        },
      ];
    });
  }

  return (
    <div className="flex flex-col">
      <div ref={scope} className="flex">
        {array.map((i, index) => {
          return (
            <div
              key={Math.random()}
              style={{
                margin: "0px",
              }}
              className="px-4 relative"
            >
              <Node
                current={index === ind && successInd != array.length - 1}
                success={index < successInd || successInd === array.length - 1}
                successInd={
                  index === successInd && successInd !== array.length - 1
                }
                color={"#0077b6"}
                textCol={"#caf0f8"}
                val={index === val && successInd != array.length - 1}
                index={index}
              >
                {i}
              </Node>
            </div>
          );
        })}
      </div>
      <div className="flex mx-auto mt-16 space-x-8">
        {successInd === array.length - 1 ? (
          <button
            className="p-1 px-2 rounded-lg  text-[#757bc8] bg-blue-200"
            onClick={restart}
          >
            Restart
          </button>
        ) : (
          <>
            <button
              onClick={backward}
              disabled={(successInd === 0 && ind === 0) || hang}
              className="w-[30px] h-[30px] duration-700 disabled:pointer-events-none disabled:opacity-30 hover:scale-110 flex justify-center items-center rounded-full bg-blue-300 "
            >
              <img src={next} className="w-[50px] rotate-180" alt="" />
            </button>
            <button
              onClick={forward}
              disabled={hang}
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
