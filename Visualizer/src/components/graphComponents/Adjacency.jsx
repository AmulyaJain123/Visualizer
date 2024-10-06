import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import cross from "../../assets/cross-circle.png";
import arrow from "../../assets/down-arrow.png";
import { graphsActions } from "../../store/main";

export default function Adjacency() {
  const dispatch = useDispatch();
  const edgesArr = useSelector((state) => state.graphs.edgesArr);
  const list = useSelector((state) => state.graphs.list);
  const matrix = useSelector((state) => state.graphs.matrix);

  function removeEdge(index) {
    dispatch(graphsActions.removeEdge(index));
  }

  return (
    <div className="flex justify-center space-x-[100px]">
      <div className="flex flex-col min-w-[300px] items-center">
        <h1 className="text-center bg-[#606c38] w-full text-white rounded-lg py-1">
          Adjacency List
        </h1>
        <div className="flex flex-col gap-y-1 mt-4 px-4">
          {list.map((i, ind1) => {
            return (
              <div className="flex space-x-2 ">
                <div className="w-[40px] h-[40px] flex justify-center items-center border-2 border-black bg-[#fefae0]">
                  {i[0]}
                </div>
                <div className="w-[40px] h-[40px] flex justify-center items-center">
                  <img
                    src={arrow}
                    className="w-[20px] h-[20px] -rotate-90"
                    alt=""
                  />
                </div>
                <div className="flex border-l-2  border-black">
                  {i[1].map((j, ind2) => {
                    return (
                      <div className="w-[40px] h-[40px] flex justify-center items-center border-r-2 border-y-2 border-black bg-[#fefae0]">
                        {j}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="text-center bg-[#606c38] text-white rounded-lg py-1">
          Edges
        </h1>
        <div className="flex flex-col mt-4 px-4">
          {edgesArr.map((i, ind) => {
            return (
              <div
                key={ind}
                className="flex px-3 py-1 mb-2 rounded-md bg-[#fefae0]"
              >
                <div className="flex ">
                  <span className="w-[30px]">{i[0]}</span>
                  <div className="flex flex-col w-[40px]">
                    <div className="border-b flex-grow border-black"></div>
                    <div className="border-t flex-grow border-black"></div>
                  </div>
                  <span className="w-[30px] flex flex-row-reverse ">
                    {i[1]}
                  </span>
                </div>
                <span className="ml-8 flex justify-center items-center">
                  <button onClick={() => removeEdge(ind)}>
                    <img src={cross} className="w-[20px] h-[20px]" alt="" />
                  </button>
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col min-w-[300px] items-center">
        <h1 className="text-center bg-[#606c38] w-full text-white rounded-lg py-1">
          Adjacency Matrix
        </h1>
        <div className="flex flex-col mt-4 px-4">
          {matrix.map((i, ind1) => {
            return (
              <div key={ind1} className="flex">
                {i.map((j, ind2) => {
                  return (
                    <div
                      key={ind2}
                      style={{
                        borderTop:
                          ind1 === 0 || ind2 === 0 ? "" : "2px solid black",
                        borderBottom:
                          ind2 === 0 || ind1 != matrix.length - 1
                            ? ""
                            : "2px solid black",
                        borderRight:
                          ind1 === 0 || ind2 != matrix.length - 1
                            ? ""
                            : "2px solid black",
                        borderLeft:
                          ind1 === 0 || ind2 === 0 ? "" : "2px solid black",
                        backgroundColor: ind1 > 0 && ind2 > 0 ? "#fefae0" : "",
                        fontWeight: ind1 > 0 && ind2 > 0 ? "normal" : "bold",
                      }}
                      className="w-[40px] h-[40px]  flex justify-center items-center"
                    >
                      {ind1 === 0 && ind2 === 0 ? null : j === null ? 0 : j}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
