import Node from "./Node";
import { useState } from "react";
import next from "../../assets/next.png";
import { useAnimate, stagger } from "framer-motion";
import CountingArray from "./CountingArray";

export default function CountingSortAnimation({ arr, order }) {
  const [ind, setInd] = useState(0);
  const [max, setMax] = useState(0);
  const [stage, setStage] = useState(0);
  const [history, setHistory] = useState([
    { list: [...arr], max: 0, ind: 0, counting: [], stage: 0, ind2: null },
  ]);
  const [array, setArray] = useState(arr);
  const [counting, setCounting] = useState([]);
  const [scope, animate] = useAnimate();
  const [hang, setHang] = useState(false);
  const [ind2, setInd2] = useState(null);

  function forward() {
    if (stage === 0) {
      if (ind === array.length - 1) {
        setStage(1);
        const countingArr = [];
        for (let i = 0; i <= array[max]; ++i) {
          countingArr.push(0);
        }
        setCounting([...countingArr]);
        setMax(Number.MAX_VALUE);
        setInd(-1);
        setHistory((p) => {
          return [
            ...p,
            {
              list: [...array],
              max: Number.MAX_VALUE,
              ind: -1,
              ind2: ind2,
              counting: [...countingArr],
              stage: 1,
            },
          ];
        });
      } else {
        const indP = ind;
        const maxP = max;
        let newMax = max;
        let newInd = ind;
        if (array[ind + 1] > array[max]) {
          setMax(indP + 1);
          newMax = indP + 1;
        }
        setInd(indP + 1);
        ++newInd;
        setHistory((p) => {
          return [
            ...p,
            {
              list: [...array],
              max: newMax,
              ind: newInd,
              ind2: ind2,
              counting: [...counting],
              stage: stage,
            },
          ];
        });
      }
    }
    if (stage === 1) {
      if (ind === array.length - 1) {
        setStage(2);
        setInd2(0);
        let newInd = ind;
        if (order === "asc") {
          setInd(-1);
          newInd = -1;
        } else {
          setInd(array.length);
          newInd = array.length;
        }
        setHistory((p) => {
          return [
            ...p,
            {
              list: [...array],
              max: max,
              ind: newInd,
              ind2: 0,
              counting: [...counting],
              stage: 2,
            },
          ];
        });
      } else {
        const indP = ind;
        const nextVal = array[indP + 1];
        setInd(indP + 1);
        const newCounting = [...counting];
        newCounting[nextVal]++;
        const str = `.index${nextVal}`;
        // console.log(counting);
        if (ind > -1) {
          animate(
            str,
            { scale: [5, 2, 0.5, 1] },
            { type: "spring", duration: 0.5, delay: stagger(0.05) }
          );
        }

        setCounting([...newCounting]);
        setHistory((p) => {
          return [
            ...p,
            {
              list: [...array],
              max: max,
              ind: indP + 1,
              ind2: ind2,
              counting: [...newCounting],
              stage: stage,
            },
          ];
        });
      }
    }
    if (stage === 2) {
      if (order === "asc" && ind === -1) {
        setInd(0);
        setHistory((p) => {
          return [
            ...p,
            {
              list: [...array],
              max: max,
              ind: 0,
              ind2: ind2,
              counting: [...counting],
              stage: stage,
            },
          ];
        });
      } else if (order === "desc" && ind === array.length) {
        setInd(array.length - 1);
        setHistory((p) => {
          return [
            ...p,
            {
              list: [...array],
              max: max,
              ind: array.length - 1,
              ind2: ind2,
              counting: [...counting],
              stage: stage,
            },
          ];
        });
      } else {
        if (counting[ind2] === 0) {
          let newInd2 = ind2 + 1;
          setInd2(newInd2);
          setHistory((p) => {
            return [
              ...p,
              {
                list: [...array],
                max: max,
                ind: ind,
                ind2: newInd2,
                counting: [...counting],
                stage: stage,
              },
            ];
          });
        } else {
          if (order === "asc") {
            const countingArr = [...counting];
            --countingArr[ind2];
            const str = `.index${ind2}`;
            animate(
              str,
              { scale: [5, 2, 0.5, 1] },
              { type: "spring", duration: 0.5, delay: stagger(0.05) }
            );
            setCounting([...countingArr]);
            const newArr = [...array];
            newArr[ind] = ind2;
            setArray([...newArr]);
            const newInd = ind + 1;
            setInd((p) => p + 1);
            setHistory((p) => {
              return [
                ...p,
                {
                  list: [...newArr],
                  max: max,
                  ind: newInd,
                  ind2: ind2,
                  counting: [...countingArr],
                  stage: stage,
                },
              ];
            });
          } else {
            const countingArr = [...counting];
            --countingArr[ind2];
            const str = `.index${ind2}`;
            animate(
              str,
              { scale: [5, 2, 0.5, 1] },
              { type: "spring", duration: 0.5, delay: stagger(0.05) }
            );
            setCounting([...countingArr]);
            const newArr = [...array];
            newArr[ind] = ind2;
            setArray([...newArr]);
            const newInd = ind - 1;
            setInd(newInd);
            setHistory((p) => {
              return [
                ...p,
                {
                  list: [...newArr],
                  max: max,
                  ind: newInd,
                  ind2: ind2,
                  counting: [...countingArr],
                  stage: stage,
                },
              ];
            });
          }
        }
      }
    }
  }

  // console.log(ind, max, array, history);

  function backward() {
    const newReality = { ...history[history.length - 2] };
    // console.log(newReality, newReality.list);
    setArray([...newReality.list]);
    setMax(newReality.max);
    setInd(newReality.ind);
    setInd2(newReality.ind2);
    setCounting([...newReality.counting]);
    setStage(newReality.stage);
    setHistory((p) => {
      const newHistory = [...p];
      newHistory.splice(newHistory.length - 1, 1);
      return newHistory;
    });
  }

  function restart() {
    setInd(0);
    setInd2(null);
    setCounting([]);
    setStage(0);
    setMax(0);
    setArray([...arr]);
    setHistory([
      {
        list: [...arr],
        max: 0,
        ind: 0,
        counting: [],
        stage: 0,
        ind2: null,
      },
    ]);
  }

  return (
    <div ref={scope} className="flex flex-col">
      {counting.length != 0 &&
      ((order === "desc" &&
        (stage === 2 || ind > -1) &&
        (stage != 2 || ind > -1)) ||
        (order === "asc" &&
          (stage === 2 || ind > -1) &&
          ind != array.length)) ? (
        <CountingArray ind={ind2} array={counting} />
      ) : null}
      {stage === 1 && ind === -1 ? (
        <div className="text-xl text-[#0077b6] font-semibold mx-auto mb-16 ">
          Length of Count Array: {counting.length}
        </div>
      ) : null}
      <div className="flex">
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
                current={index === ind}
                success={
                  (order === "asc" && stage === 2 && index < ind) ||
                  (order === "desc" && stage === 2 && index > ind)
                }
                // successInd={
                //   index === successInd && successInd !== array.length - 1
                // }
                color={"#0077b6"}
                textCol={"#caf0f8"}
                max={index === max}
                index={index}
              >
                {i}
              </Node>
            </div>
          );
        })}
      </div>
      <div className="flex mx-auto mt-16 space-x-8">
        {(order === "asc" && ind === array.length) ||
        (order === "desc" && stage === 2 && ind < 0) ? (
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
              disabled={(stage === 0 && ind === 0) || hang}
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
              disabled={hang}
              className="w-[30px] h-[30px] duration-700 disabled:pointer-events-none disabled:opacity-30 hover:scale-110 flex justify-center items-center rounded-full bg-blue-300 "
            >
              <img src={next} className="w-[50px] select-none" alt="" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
