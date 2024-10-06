import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { graphsActions } from "../store/main";
import Adjacency from "../components/graphComponents/Adjacency";
import Fig from "../components/graphComponents/Fig";

export default function Graph() {
  const [edge, setEdge] = useState(undefined);
  const dispatch = useDispatch();
  const edgesArr = useSelector((state) => state.graphs.edgesArr);
  const list = useSelector((state) => state.graphs.list);

  function keyClick(event) {
    if (event.key === "Enter") {
      const res = getArray(event.target.value);
      console.log(res);
      if (res != null) {
        if (edgesArr) {
          for (let i of edgesArr) {
            if (
              (i[0] === res[0] && i[1] === res[1]) ||
              (i[0] === res[1] && i[1] === res[0])
            ) {
              setEdge(null);
              return;
            }
          }
        }
        setEdge([...res]);
        if (edgesArr === null) {
          dispatch(graphsActions.setEdgesArr([res]));
        } else {
          dispatch(graphsActions.pushEdgesArr(res));
        }
      } else {
        setEdge(null);
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
      arr.push(integer);
    }
    if (arr.length != 2) {
      return null;
    }
    return arr;
  }

  return (
    <>
      <div className="flex flex-col w-full py-16 pt-12 px-8 h-full">
        <h1 className="text-center text-3xl tracking-wide mx-auto w-fit  text-[#9c6644] rounded-xl font-extrabold mb-12">
          Graph
        </h1>
        <div className="flex   mx-auto">
          <div className="flex  border-2 text-[#c08552]   border-neutral-200">
            <div className="flex  flex-col">
              <p className="text-lg px-3 m-1 p-1 h-[40px]  bg-[#f3e9dc] justify-center border-2 border-[#c08552] rounded-xl flex items-center font-bold">
                Add An Edge
              </p>
              <div className="bg-[#f3e9dc] border-2 border-[#c08552] m-1 rounded-xl flex justify-center items-center">
                <input
                  className="px-3 p-1 text-black text-sm min-w-[300px] mx-2 my-2 disabled:opacity-50 disabled:bg-white rounded-md focus:outline-none"
                  placeholder="4 6 Press Enter"
                  type="text"
                  onKeyDown={(event) => keyClick(event)}
                />
              </div>
              <div className="px-2 p-1 m-1 bg-[#f3e9dc] border-2 min-h-[40px] border-[#c08552] rounded-xl text-sm flex-grow justify-center items-center flex ">
                {edge === undefined ? (
                  <p>Edge not entered</p>
                ) : edge === null ? (
                  <p className="text-red-500">Invalid Array Entered</p>
                ) : (
                  <>
                    <span className="mr-2">{`${edge[0]} ---- ${edge[1]} `}</span>{" "}
                    <span>Edge Added</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-full mt-16 flex justify-center ">
          {edgesArr != null && edgesArr.length != 0 ? (
            <Adjacency></Adjacency>
          ) : null}
        </div>
        <div
          style={{ minHeight: `${list ? list.length * 240 : 0}px` }}
          className="w-full h-full mt-24 flex mb-8 "
        >
          {edgesArr != null && edgesArr.length != 0 ? <Fig></Fig> : null}
        </div>
      </div>
    </>
  );
}
