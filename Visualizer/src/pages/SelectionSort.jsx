import { useState, useRef } from "react";
import SelectionSortAnimation from "../components/selectionSortComponents/SelectionSortAnimation";

export default function SelectionSort() {
  const textRef = useRef();
  const selectRef = useRef();
  const [arr, setArr] = useState(undefined);
  const [ready, setReady] = useState(false);

  function keyClick(event) {
    if (event.key === "Enter") {
      const res = getArray(event.target.value);
      // console.log(res);
      if (res != null) {
        setArr([...res]);
      } else {
        setArr(null);
      }
      event.target.value = "";
    }
  }

  function getArray(str) {
    const arr = [];
    while (str != "") {
      str = str.trim();
      let num = "";
      let count = 0;
      for (let i of str) {
        ++count;
        if (i.charCodeAt(0) >= 48 && i.charCodeAt(0) <= 57) {
          num += i;
        } else if (i === " ") {
          break;
        } else {
          return null;
        }
      }
      str = str.slice(count);
      let integer = parseInt(num);
      if (integer < 0 || integer > 1000) {
        return null;
      }
      arr.push(integer);
    }
    if (arr.length > 10 || arr.length === 0) {
      return null;
    }
    return arr;
  }

  function printArr() {
    let str = "";
    for (let i of arr) {
      str += i + " ,";
    }
    str = str.slice(0, str.length - 2);
    str = `[${str}]`;
    return str;
  }

  function goClick() {
    if (ready) {
      setArr(undefined);
    }
    setReady((preval) => {
      return !preval;
    });
  }

  return (
    <>
      <div className="flex flex-col select-none  w-full py-16 pt-12 px-8 h-full mb-[200px]">
        <h1 className="text-center header text-3xl tracking-wide mx-auto w-fit  text-[#9c6644] rounded-xl font-extrabold mb-12">
          Selection Sort
        </h1>
        <div className="flex   mx-auto">
          <div className="flex  border-2 text-[#c08552]   border-neutral-200">
            <div className="flex flex-col max-w-[200px]   ">
              <p className="text-lg px-3 m-1 p-1 h-[40px] bg-[#f3e9dc] border-2 border-[#c08552] rounded-xl flex items-center font-bold">
                Enter Array
              </p>
              <p className="text-sm p-1 m-1 px-3 bg-[#f3e9dc] border-2 border-[#c08552] rounded-xl">
                Enter upto 10 numbers from 0 to 1000 separated by space
              </p>
            </div>
            <div className="flex  flex-col">
              <div className="bg-[#f3e9dc] border-2 border-[#c08552] m-1 rounded-xl flex justify-center items-center">
                <input
                  className="px-3 p-1 text-black text-sm min-w-[300px] mx-2 my-2 disabled:opacity-50 disabled:bg-white rounded-md focus:outline-none"
                  placeholder="4 6 7 89 121  Press Enter"
                  type="text"
                  disabled={ready}
                  ref={textRef}
                  onKeyDown={(event) => keyClick(event)}
                />
              </div>
              <div className="px-2 p-1 m-1 bg-[#f3e9dc] border-2 border-[#c08552] rounded-xl text-sm flex-grow justify-center items-center flex ">
                {arr === undefined ? (
                  <p>Array not entered</p>
                ) : arr === null ? (
                  <p className="text-red-500">Invalid Array Entered</p>
                ) : (
                  <p>{printArr()}</p>
                )}
              </div>
            </div>
            <div className="flex  flex-col">
              <p className="text-lg px-2 m-1 bg-[#f3e9dc] border-2 border-[#c08552] rounded-xl p-1 h-[40px] font-bold min-w-[200px]  flex justify-center items-center">
                Select Order
              </p>
              <div className="px-2 p-1 m-1 text-sm bg-[#f3e9dc] border-2 border-[#c08552] rounded-xl flex flex-grow justify-center items-center">
                <select
                  ref={selectRef}
                  name=""
                  disabled={ready}
                  className="p-1 rounded-md text-black disabled:opacity-50 px-2"
                  id=""
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
            </div>
            <div className="flex m-1 bg-[#f3e9dc] border-2 border-[#c08552] rounded-xl justify-center items-center">
              <button
                disabled={!(arr != undefined && arr != null)}
                onClick={goClick}
                className=" w-[80px] flex-col h-[70%] m-4 rounded-xl disabled:opacity-30 disabled:pointer-events-none bg-[#87b38d] text-xl border-[3px] duration-700 border-[#87b38d] hover:text-[#87b38d] hover:bg-white text-white font-bold flex justify-center items-center"
              >
                {ready ? "Reset" : "Go"}
              </button>
            </div>
          </div>
        </div>

        <div className="w-full h-full mt-8 flex justify-center items-center">
          {arr != null && arr != undefined && ready ? (
            <SelectionSortAnimation arr={arr} order={selectRef.current.value} />
          ) : null}
        </div>
      </div>
    </>
  );
}
