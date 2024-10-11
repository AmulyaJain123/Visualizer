import Arrow from "./Arrow";
import { useSelector } from "react-redux";
import CurrWeight from "./CurrWeight";

export default function Node({ val, x, y, i }) {
  const graphType = useSelector((state) => state.graphs.graphType);
  const ind = useSelector((state) => state.graphs.ind);
  const timeline = useSelector((state) => state.graphs.timeline);
  const graph = useSelector((state) => state.graphs.graph);

  return (
    <div
      style={{
        top: `${y}px`,
        left: `calc( 50% - 20px + ${x}px )`,
        border:
          (ind != null && timeline[ind].mst && timeline[ind].mst[val]) ||
          (ind != null && timeline[ind].neighbour === val)
            ? "2px solid black"
            : "0px solid black",
        outline:
          ind != null && timeline[ind].highlight === val
            ? "4px solid black"
            : "0px",
        outlineOffset: "3px",
        backgroundColor:
          ind != null && timeline[ind].mst && timeline[ind].mst[val]
            ? "#4f772d"
            : ind != null && timeline[ind].neighbour === val
            ? "#caf0f8"
            : "#0077b6",
        color:
          ind != null && timeline[ind].mst && timeline[ind].mst[val]
            ? "#fff"
            : ind != null && timeline[ind].neighbour === val
            ? "#0077b6"
            : "#caf0f8",
      }}
      className="w-[40px] h-[40px] flex justify-center node absolute items-center rounded-full "
    >
      {val}
      {graphType % 2 === 1 ? (
        <>
          {i.angle.map((deg) => {
            return (
              <div
                style={{ transform: `rotate(${deg}deg)` }}
                className="absolute"
              >
                <Arrow></Arrow>
              </div>
            );
          })}
        </>
      ) : null}
      {timeline != null && ind != null && timeline[ind].key ? (
        <div
          style={{ transform: `rotate(${graph.free[val - 1]}deg)` }}
          className="absolute"
        >
          <CurrWeight angle={graph.free[val - 1]}>
            {timeline[ind].key[val]}
          </CurrWeight>
        </div>
      ) : null}
    </div>
  );
}
