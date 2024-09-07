import Node from "./Node";
import { useState } from "react";
import next from "../../assets/next.png";
import { useAnimate } from "framer-motion";

export default function RadixSortAnimation({ arr, order }) {
  const [history, setHistory] = useState([
    {
      array: [...arr],
      radix: { maxDigits: null, currDigit: null },
      wait: false,
    },
  ]);
  const [wait, setWait] = useState(false);
  const [array, setArray] = useState(arr);
  const [radix, setRadix] = useState({ maxDigits: null, currDigit: null });
  const [scope, animate] = useAnimate();
  const [hang, setHang] = useState(false);

  function forward() {
    if (wait) {
      const newRadix = {
        maxDigits: radix.maxDigits,
        currDigit:
          radix.currDigit + 1 < radix.maxDigits ? radix.currDigit + 1 : null,
      };
      setRadix({ ...newRadix });
      setWait(false);
      setHistory((p) => {
        return [
          ...p,
          {
            ...p[p.length - 1],
            wait: false,
            radix: { ...newRadix },
          },
        ];
      });
    } else if (radix.maxDigits === null) {
      let maxDig = 0;
      for (let i of array) {
        if (i < 10) {
          maxDig = Math.max(1, maxDig);
        } else if (i < 100) {
          maxDig = Math.max(2, maxDig);
        } else if (i < 1000) {
          maxDig = Math.max(3, maxDig);
        } else {
          maxDig = Math.max(4, maxDig);
        }
      }
      const newArr = [...array];
      let index = 0;
      for (let i of array) {
        let num = i + "";
        const temp = num.length;
        for (let i = 0; i < maxDig - temp; ++i) {
          num = "0" + num;
        }
        newArr[index] = num;
        ++index;
      }
      setArray([...newArr]);
      setRadix({ maxDigits: maxDig, currDigit: 0 });
      setHistory((p) => {
        return [
          ...p,
          {
            ...p[p.length - 1],
            array: [...newArr],
            radix: { maxDigits: maxDig, currDigit: 0 },
          },
        ];
      });
    } else {
      const indArr = [];
      let temp = 0;
      for (let i of array) {
        indArr[temp] = { val: i, ind: temp };
        ++temp;
      }
      indArr.sort((a, b) => {
        const numbera = parseInt(a.val[radix.maxDigits - radix.currDigit - 1]);
        const numberb = parseInt(b.val[radix.maxDigits - radix.currDigit - 1]);
        if (order === "asc") {
          if (numbera < numberb) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (numbera <= numberb) {
            return 1;
          } else {
            return -1;
          }
        }
      });
      const newArr = [];
      for (let i of indArr) {
        newArr.push(i.val);
      }
      console.log(indArr, newArr);
      let index = 0;
      let y = 1;
      setHang(true);
      setTimeout(() => {
        for (let i of indArr) {
          const prevInd = i.ind;
          const currInd = index;
          const str = `.index${prevInd}`;
          console.log(str);
          animate(
            ".small",
            {
              opacity: [0, 0],
            },
            { type: "tween", duration: 3 }
          );
          if (prevInd != currInd) {
            const xdisp = (currInd - prevInd) * 82;
            const absoluteXdisp = Math.abs(xdisp);
            animate(
              str,
              {
                x: [0, xdisp],
                y: [0, 70 * y, 0],
              },
              { type: "tween", duration: 3 }
            );
          }
          ++index;
          y = y * -1;
        }
        setTimeout(() => {
          setArray([...newArr]);
          setWait(true);
          setHistory((p) => {
            return [
              ...p,
              {
                ...p[p.length - 1],
                array: [...newArr],
                wait: true,
              },
            ];
          });
          setHang(false);
        }, 3000);
      }, 0);
    }
  }

  // console.log(array, history, successInd, radix);

  function backward() {
    const lastHistory = JSON.parse(JSON.stringify(history[history.length - 2]));
    const newHistory = JSON.parse(JSON.stringify(history));
    newHistory.pop();
    setHistory(newHistory);
    setArray([...lastHistory.array]);
    setWait(lastHistory.wait);
    setRadix({ ...lastHistory.radix });
  }

  function restart() {
    setHistory([
      {
        array: [...arr],
        radix: { maxDigits: null, currDigit: null },
        wait: false,
      },
    ]);
    setArray([...arr]);
    setWait(false);
    setRadix({ maxDigits: null, currDigit: null });
  }

  return (
    <div className="flex flex-col">
      <div ref={scope} className="flex relative mt-20">
        <div className="absolute top-[50%] translate-y-[-50%] w-full border border-stone-400"></div>
        {array.map((i, index) => {
          return (
            <div key={Math.random()} className="m-4">
              <Node
                // highlight={
                //   (index === ind || index === ind + 1) &&
                //   successInd > 0 &&
                //   array.length > 1
                // }
                index={index}
                color={"#0077b6"}
                textCol={"#caf0f8"}
                currDigit={radix.currDigit}
                maxDigits={radix.maxDigits}
                success={radix.maxDigits != null && radix.currDigit === null}
              >
                {i}
              </Node>
            </div>
          );
        })}
      </div>
      <div className="flex mx-auto mt-16 space-x-8">
        {radix.maxDigits != null && radix.currDigit === null ? (
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
              disabled={radix.maxDigits === null || hang}
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
