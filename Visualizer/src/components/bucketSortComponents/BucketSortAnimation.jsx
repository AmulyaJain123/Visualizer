import Node from "./Node";
import { useState } from "react";
import next from "../../assets/next.png";
import { useAnimate } from "framer-motion";
import BucketArray from "./BucketArray";

export default function BucketSortAnimation({ arr, order }) {
  const [ind, setInd] = useState(null);
  const [history, setHistory] = useState([
    {
      ind: null,
      array: [...arr],
      successInd: [],
      buckets: null,
      marking: null,
      bucketInd: null,
      sortStatus: false,
      success: [],
    },
  ]);
  const [array, setArray] = useState([...arr]);
  const [successInd, setSuccessInd] = useState([]);
  const [scope, animate] = useAnimate();
  const [buckets, setBuckets] = useState(null);
  const [marking, setMarking] = useState(null);
  const [hang, setHang] = useState(false);
  const [bucketInd, setBucketInd] = useState(null);
  const [sortStatus, setSortStatus] = useState(false);
  const [success, setSuccess] = useState([]);

  function forward() {
    if (ind === null && buckets === null) {
      const bucketArr = [];
      for (let i = 0; i < arr.length; ++i) {
        bucketArr.push([]);
      }
      setBuckets(JSON.parse(JSON.stringify(bucketArr)));
      setInd(0);
      const len = arr.length;
      const interval = Math.floor(100 / len);
      const markingArr = [];
      let ugly = 100 % len;
      const weight = ugly / len;
      let tempWeight = 0;
      let temp = interval + 1;
      for (let i = 0; i < len; ++i) {
        if (i === 0) {
          markingArr.push({ low: 1, high: interval });
        } else if (i === len - 1) {
          markingArr.push({ low: temp, high: 100 });
        } else {
          let num = interval - 1;
          if (tempWeight > weight && ugly != 0) {
            ++num;
            --ugly;
            tempWeight = -1;
          }
          markingArr.push({ low: temp, high: temp + num });
          temp += num + 1;
        }
        ++tempWeight;
      }
      setMarking(JSON.parse(JSON.stringify(markingArr)));
      setHistory((p) => {
        return [
          ...p,
          {
            ...p[p.length - 1],
            marking: JSON.parse(JSON.stringify(markingArr)),
            buckets: JSON.parse(JSON.stringify(bucketArr)),
            ind: 0,
          },
        ];
      });
    } else if (ind === null && buckets != null) {
      if (bucketInd === null) {
        setBucketInd(0);
        setHistory((p) => {
          return [
            ...p,
            {
              ...p[p.length - 1],
              bucketInd: 0,
            },
          ];
        });
      } else if (!sortStatus) {
        const newBucket = JSON.parse(JSON.stringify(buckets));
        const newBuckets = [...newBucket[bucketInd]].sort((a, b) => {
          if (a <= b) {
            return -1;
          } else {
            return 1;
          }
        });
        newBucket[bucketInd] = [...newBuckets];

        setBuckets(JSON.parse(JSON.stringify(newBucket)));
        const newSuccessInd = [...successInd, bucketInd];
        setSuccessInd((p) => {
          return [...newSuccessInd];
        });
        let newBInd = bucketInd + 1;
        let newSortStatus = false;
        if (newBInd === arr.length) {
          newBInd = null;
          newSortStatus = true;
          setSortStatus(true);
        }
        setBucketInd(newBInd);
        setHistory((p) => {
          return [
            ...p,
            {
              ...p[p.length - 1],
              buckets: JSON.parse(JSON.stringify(newBucket)),
              successInd: [...newSuccessInd],
              sortStatus: newSortStatus,
              bucketInd: newBInd,
            },
          ];
        });
      } else {
        if (order === "asc") {
          const newBucket = JSON.parse(JSON.stringify(buckets));
          const newBuckets = [...newBucket[bucketInd]];
          let index = 0;
          const newArray = [...array];
          for (let i of newArray) {
            if (i === null) {
              break;
            }
            ++index;
          }
          const newSuccess = [...success];
          for (let i of newBuckets) {
            newArray[index] = i;
            newSuccess.push(index);
            ++index;
          }
          newBucket[bucketInd] = [];
          setBuckets(JSON.parse(JSON.stringify(newBucket)));
          setArray([...newArray]);
          setSuccess([...newSuccess]);
          let newBInd = bucketInd + 1;
          if (newBInd === arr.length || newSuccess.length === arr.length) {
            newBInd = null;
          }
          setBucketInd(newBInd);
          setHistory((p) => {
            return [
              ...p,
              {
                ...p[p.length - 1],
                buckets: JSON.parse(JSON.stringify(newBucket)),
                array: [...newArray],
                success: [...newSuccess],
                bucketInd: newBInd,
              },
            ];
          });
        } else {
          const newBucket = JSON.parse(JSON.stringify(buckets));
          const newBuckets = [...newBucket[bucketInd]];
          let index = arr.length - 1;
          const newArray = [...array];
          for (let i = index; i > -1; --i) {
            if (newArray[i] === null) {
              index = i;
              break;
            }
          }
          const newSuccess = [...success];
          for (let i of newBuckets) {
            newArray[index] = i;
            newSuccess.push(index);
            --index;
          }
          newBucket[bucketInd] = [];
          setBuckets(JSON.parse(JSON.stringify(newBucket)));
          setArray([...newArray]);
          setSuccess([...newSuccess]);
          let newBInd = bucketInd + 1;
          if (newBInd === arr.length || newSuccess.length === arr.length) {
            newBInd = null;
          }
          setBucketInd(newBInd);

          setHistory((p) => {
            return [
              ...p,
              {
                ...p[p.length - 1],
                buckets: JSON.parse(JSON.stringify(newBucket)),
                array: [...newArray],
                success: [...newSuccess],
                bucketInd: newBInd,
              },
            ];
          });
        }
      }
    } else {
      const val = array[ind];
      const newBucket = JSON.parse(JSON.stringify(buckets));
      let indexing = 0;
      for (let i of marking) {
        let l = i.low;
        let h = i.high;
        if (val >= l && val <= h) {
          newBucket[indexing].push(val);
          break;
        }
        ++indexing;
      }
      setBuckets(JSON.parse(JSON.stringify(newBucket)));
      setHang(true);
      setTimeout(() => {
        const str = `.bucket${indexing} .drop${newBucket[indexing].length - 1}`;
        animate(
          str,
          { scale: [1, 1.5, 0.5, 1] },
          { type: "tween", duration: 1 }
        );
        setTimeout(() => {
          let newP = ind + 1;
          if (newP === arr.length) {
            newP = null;
          }
          setInd((p) => {
            return newP;
          });

          const newArray = [...array];
          newArray[ind] = null;
          setArray([...newArray]);
          setHistory((p) => {
            return [
              ...p,
              {
                ...p[p.length - 1],
                buckets: JSON.parse(JSON.stringify(newBucket)),
                ind: newP,
                array: [...newArray],
              },
            ];
          });
          setHang(false);
        }, 1000);
      }, 0);
    }
  }

  //   console.log(ind, array, history, successInd);

  function backward() {
    const newHistory = JSON.parse(JSON.stringify(history));
    const lastHistory = JSON.parse(
      JSON.stringify(newHistory[newHistory.length - 2])
    );
    newHistory.pop();
    setHistory(JSON.parse(JSON.stringify(newHistory)));
    setInd(lastHistory.ind);
    setArray(lastHistory.array);
    setSuccessInd(lastHistory.successInd);
    setBuckets(lastHistory.buckets);
    setMarking(lastHistory.marking);
    setBucketInd(lastHistory.bucketInd);
    setSortStatus(lastHistory.sortStatus);
    setSuccess(lastHistory.success);
  }

  function restart() {
    setHistory([
      {
        ind: null,
        array: [...arr],
        successInd: [],
        buckets: null,
        marking: null,
        bucketInd: null,
        sortStatus: false,
        success: [],
      },
    ]);
    setInd(null);
    setArray([...arr]);
    setSuccessInd([]);
    setBuckets(null);
    setBucketInd(null);
    setMarking(null);
    setSortStatus(false);
    setSuccess([]);
  }

  console.log(buckets, ind);

  return (
    <div className="flex flex-col">
      <div ref={scope} className="flex flex-col">
        {buckets != null ? (
          <BucketArray
            marking={marking}
            activeBucket={bucketInd}
            arr={buckets}
            successInd={successInd}
          />
        ) : null}
        <div className="flex mx-auto">
          {array.map((i, index) => {
            return (
              <div key={Math.random()} className="m-4">
                <Node
                  highlight={index === ind}
                  // index={index}
                  // ind={ind}
                  color={"#0077b6"}
                  textCol={"#caf0f8"}
                  success={success.includes(index)}
                >
                  {i}
                </Node>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex mx-auto mt-16 space-x-8">
        {success.length === arr.length ? (
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
              disabled={history.length === 1}
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
