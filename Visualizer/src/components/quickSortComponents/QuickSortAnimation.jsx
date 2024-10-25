import Node from "./Node";
import { useState } from "react";
import next from "../../assets/next.png";
import { useAnimate } from "framer-motion";
import Stack from "../mergeSortComponents/Stack";

export default function QuickSortAnimation({ arr, order }) {
  const [history, setHistory] = useState([
    {
      array: [...arr],
      successInd: [],
      pivot: null,
      range: [],
      stack: null,
      indices: [],
      swap: { first: null, second: null },
    },
  ]);
  const [array, setArray] = useState([...arr]);
  const [successInd, setSuccessInd] = useState([]);
  const [scope, animate] = useAnimate();
  const [hang, setHang] = useState(false);
  const [pivot, setPivot] = useState(null);
  const [range, setRange] = useState([]);
  const [stack, setStack] = useState(null);
  const [indices, setIndices] = useState([]);
  const [swap, setSwap] = useState({ first: null, second: null });

  function forward() {
    if (pivot === null && range.length === 0) {
      setRange([{ low: 0, high: arr.length - 1 }]);
      setPivot(0);
      const newSwap = { first: null, second: null };
      if (array[array.length - 1] <= array[0]) {
        newSwap.second = array.length - 1;
      }
      setStack([
        `quickSort(0,${arr.length - 1})`,
        `partition(0,${arr.length - 1})`,
      ]);
      setSwap({ ...newSwap });
      setIndices([0, arr.length - 1]);
      setHistory((p) => {
        return [
          ...p,
          {
            ...p[p.length - 1],
            range: [{ low: 0, high: arr.length - 1 }],
            pivot: 0,
            stack: [
              `quickSort(0,${arr.length - 1})`,
              `partition(0,${arr.length - 1})`,
            ],
            swap: { ...newSwap },
            indices: [0, arr.length - 1],
          },
        ];
      });
    } else if (pivot === null) {
      const low = range[range.length - 1].low;
      const high = range[range.length - 1].high;
      if (low === high) {
        const newSuccessInd = [...successInd];
        newSuccessInd.push(low);
        const newRange = JSON.parse(JSON.stringify(range));
        newRange.pop();
        const newStack = [...stack];
        console.log(newStack);
        while (
          newStack.length != 0 &&
          newStack[newStack.length - 1][0] != "-"
        ) {
          newStack.pop();
        }
        if (newStack.length != 0) {
          newStack[newStack.length - 1] =
            newStack[newStack.length - 1].split("-")[1];
        }
        setStack([...newStack]);
        setSuccessInd([...newSuccessInd]);
        setRange(newRange);
        setHistory((p) => {
          return [
            ...p,
            {
              ...p[p.length - 1],
              stack: [...newStack],
              successInd: [...newSuccessInd],
              range: JSON.parse(JSON.stringify(newRange)),
            },
          ];
        });
        return;
      }
      const newSwap = { first: null, second: null };
      if (array[high] <= array[low]) {
        newSwap.second = high;
      }
      const newStack = [...stack];
      newStack.push(
        `partition${newStack[newStack.length - 1].split("quickSort")[1]}`
      );
      setStack([...newStack]);
      setSwap({ ...newSwap });
      setPivot(low);
      setIndices([low, high]);
      setHistory((p) => {
        return [
          ...p,
          {
            ...p[p.length - 1],
            swap: { ...newSwap },
            stack: [...newStack],
            pivot: low,
            indices: [low, high],
          },
        ];
      });
    } else {
      if (swap.first === null) {
        const newIndices = [indices[0] + 1, indices[1]];
        if (newIndices[0] === range[range.length - 1].high + 1) {
          const newArray = [...array];
          const prevHigh = range[range.length - 1].high;
          newArray[prevHigh] = array[pivot];
          newArray[pivot] = array[prevHigh];
          setHang(true);
          const time = prevHigh === pivot ? 0 : 1;
          setTimeout(() => {
            animate(
              `.index${prevHigh}`,
              { x: [0, (pivot - prevHigh) * 82] },
              { type: "tween", duration: time }
            );
            animate(
              `.index${pivot}`,
              { x: [0, (prevHigh - pivot) * 82] },
              { type: "tween", duration: time }
            );
            animate(
              `.misc`,
              { opacity: [0, 0] },
              { type: "tween", duration: time }
            );
            setTimeout(() => {
              setArray([...newArray]);
              setSwap({ first: null, second: null });
              const mid = prevHigh;
              const newRange = JSON.parse(JSON.stringify(range));
              const prevLow = newRange[newRange.length - 1].low;
              newRange.pop();
              newRange.push({ low: prevLow, high: mid - 1 });
              const newSuccessInd = [...successInd];
              newSuccessInd.push(mid);
              setSuccessInd([...newSuccessInd]);
              const newStack = [...stack];
              newStack.pop();
              newStack.push(`quickSort(${prevLow},${mid - 1})`);
              setStack([...newStack]);
              setRange(newRange);
              setIndices([]);
              setPivot(null);
              setHistory((p) => {
                return [
                  ...p,
                  {
                    ...p[p.length - 1],
                    array: [...newArray],
                    swap: { first: null, second: null },
                    successInd: [...newSuccessInd],
                    stack: [...newStack],
                    range: JSON.parse(JSON.stringify(newRange)),
                    indices: [],
                    pivot: null,
                  },
                ];
              });
              setHang(false);
            }, time * 1000);
          }, 0);
        } else {
          setIndices([...newIndices]);
          let newSwap = { ...swap };
          if (array[newIndices[0]] >= array[pivot]) {
            newSwap = { ...swap, first: newIndices[0] };
          }
          setSwap({ ...newSwap });
          setHistory((p) => {
            return [
              ...p,
              {
                ...p[p.length - 1],
                indices: [...newIndices],
                swap: { ...newSwap },
              },
            ];
          });
        }
      } else if (swap.second === null) {
        const newIndices = [indices[0], indices[1] - 1];
        if (newIndices[1] === range[range.length - 1].low - 1) {
          setSwap({ first: null, second: null });
          const newRange = JSON.parse(JSON.stringify(range));
          const prevLow = newRange[newRange.length - 1].low;
          const prevHigh = newRange[newRange.length - 1].high;
          newRange.pop();
          newRange.push({ low: prevLow + 1, high: prevHigh });
          const newSuccessInd = [...successInd];
          newSuccessInd.push(prevLow);
          const newStack = [...stack];
          newStack.pop();
          newStack.push(`quickSort(${prevLow + 1},${prevHigh})`);
          setStack([...newStack]);
          setSuccessInd([...newSuccessInd]);
          setRange(newRange);
          setIndices([]);
          setPivot(null);
          setHistory((p) => {
            return [
              ...p,
              {
                ...p[p.length - 1],
                swap: { first: null, second: null },
                stack: [...newStack],
                successInd: [...newSuccessInd],
                range: JSON.parse(JSON.stringify(newRange)),
                indices: [],
                pivot: null,
              },
            ];
          });
          return;
        }
        setIndices([...newIndices]);
        let newSwap = { ...swap };
        if (array[newIndices[1]] <= array[pivot]) {
          newSwap = { ...swap, second: newIndices[1] };
        }
        setSwap({ ...newSwap });
        setHistory((p) => {
          return [
            ...p,
            {
              ...p[p.length - 1],
              indices: [...newIndices],
              swap: { ...newSwap },
            },
          ];
        });
      } else {
        if (swap.first < swap.second) {
          const newArray = [...array];
          newArray[swap.first] = array[swap.second];
          newArray[swap.second] = array[swap.first];
          setHang(true);
          const time = swap.first === swap.second ? 0 : 1;
          setTimeout(() => {
            animate(
              `.index${swap.first}`,
              { x: [0, (swap.second - swap.first) * 82] },
              { type: "tween", duration: time }
            );
            animate(
              `.index${swap.second}`,
              { x: [0, (swap.first - swap.second) * 82] },
              { type: "tween", duration: time }
            );
            animate(
              `.misc`,
              { opacity: [0, 0] },
              { type: "tween", duration: time }
            );
            setTimeout(() => {
              setArray([...newArray]);
              setSwap({ first: null, second: null });
              setHistory((p) => {
                return [
                  ...p,
                  {
                    ...p[p.length - 1],
                    array: [...newArray],
                    swap: { first: null, second: null },
                  },
                ];
              });
              setHang(false);
            }, time * 1000);
          }, 0);
        } else {
          const newArray = [...array];
          newArray[swap.second] = array[pivot];
          newArray[pivot] = array[swap.second];
          setHang(true);
          const time = swap.second === pivot ? 0 : 1;
          setTimeout(() => {
            animate(
              `.index${swap.second}`,
              { x: [0, (pivot - swap.second) * 82] },
              { type: "tween", duration: time }
            );
            animate(
              `.index${pivot}`,
              { x: [0, (swap.second - pivot) * 82] },
              { type: "tween", duration: time }
            );
            animate(
              `.misc`,
              { opacity: [0, 0] },
              { type: "tween", duration: time }
            );
            setTimeout(() => {
              setArray([...newArray]);
              setSwap({ first: null, second: null });
              const mid = swap.second;
              const newRange = JSON.parse(JSON.stringify(range));
              const prevLow = newRange[newRange.length - 1].low;
              const prevHigh = newRange[newRange.length - 1].high;

              const newStack = [...stack];
              newStack.pop();

              newRange.pop();
              let stat = false;
              if (mid + 1 <= prevHigh) {
                stat = true;
                newRange.push({ low: mid + 1, high: prevHigh });
                newStack.push(`quickSort(${mid + 1},${prevHigh})`);
              }
              if (prevLow <= mid - 1) {
                newRange.push({ low: prevLow, high: mid - 1 });
                if (stat) {
                  newStack[newStack.length - 1] =
                    "-" + newStack[newStack.length - 1];
                }
                newStack.push(`quickSort(${prevLow},${mid - 1})`);
              }
              const newSuccessInd = [...successInd];
              newSuccessInd.push(mid);
              setStack([...newStack]);
              setSuccessInd([...newSuccessInd]);
              setRange(newRange);
              setIndices([]);
              setPivot(null);
              setHistory((p) => {
                return [
                  ...p,
                  {
                    ...p[p.length - 1],
                    array: [...newArray],
                    swap: { first: null, second: null },
                    stack: [...newStack],
                    successInd: [...newSuccessInd],
                    range: JSON.parse(JSON.stringify(newRange)),
                    indices: [],
                    pivot: null,
                  },
                ];
              });
              setHang(false);
            }, time * 1000);
          }, 0);
        }
      }
    }
  }

  //   console.log(ind, array, history, successInd);

  function backward() {
    const lastHistory = history[history.length - 2];
    const newHistory = JSON.parse(JSON.stringify(history));
    newHistory.pop();
    setHistory(newHistory);
    setArray([...lastHistory.array]);
    setSuccessInd([...lastHistory.successInd]);
    setPivot(lastHistory.pivot);
    setRange(JSON.parse(JSON.stringify(lastHistory.range)));
    if (lastHistory.stack) {
      setStack([...lastHistory.stack]);
    } else {
      setStack(null);
    }
    setIndices([...lastHistory.indices]);
    setSwap({ ...lastHistory.swap });
  }

  function restart() {
    setArray([...arr]);
    setSuccessInd([]);
    setPivot(null);
    setRange([]);
    setStack(null);
    setIndices([]);
    setSwap({ first: null, second: null });
    setHistory([
      {
        array: [...arr],
        successInd: [],
        pivot: null,
        range: [],
        stack: null,
        indices: [],
        swap: { first: null, second: null },
      },
    ]);
  }

  return (
    <div className="flex flex-col w-full">
      <div ref={scope} className="flex w-full flex-col ">
        <div className="min-h-[150px] relative flex w-full mx-auto">
          <div className="absolute   right-0">
            {stack && stack.length != 0 && successInd.length != arr.length ? (
              <Stack arr={[...stack]} />
            ) : null}
          </div>
        </div>
        <div className="flex mx-auto">
          {array.map((i, index) => {
            return (
              <div key={Math.random()} className="m-4">
                <Node
                  // highlight={indices.includes(index)}
                  first={indices[0] === index}
                  second={indices[1] === index}
                  index={index}
                  // ind={ind}
                  color={"#0077b6"}
                  textCol={"#caf0f8"}
                  success={successInd.includes(index)}
                  pivot={index === pivot}
                  range={range[range.length - 1]}
                >
                  {i}
                </Node>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex mx-auto mt-16 space-x-8">
        {successInd.length === arr.length ? (
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
              disabled={(pivot === null && range.length === 0) || hang}
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
