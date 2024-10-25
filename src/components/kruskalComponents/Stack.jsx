import { useSelector } from "react-redux";
import down from "../../assets/down-arrow.png";
import tick from "../../assets/hand-tick.png";
import cross from "../../assets/hand-cross.png";

export default function Stack() {
  const list = useSelector((state) => state.graphs.list);
  const timeline = useSelector((state) => state.graphs.timeline);
  const ind = useSelector((state) => state.graphs.ind);

  function isThere(edges, edge) {
    for (let i of edges) {
      if (
        (i[0] === edge[0] && i[1] === edge[1]) ||
        (i[1] === edge[0] && i[0] === edge[1])
      ) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className="relative ml-20">
      <div className="flex flex-col divide-y-2 relative divide-black border-2 border-black w-[100px]">
        {timeline &&
          ind != null &&
          timeline[ind].weightedEdges &&
          timeline[ind].weightedEdges.map((i, index) => {
            const status = isThere(timeline[ind].mst, i);
            return (
              <div
                key={index}
                className="h-[35px] font-semibold relative flex justify-center items-center"
              >
                {`E (${i[0]},${i[1]},${i[2]})`}
                {index === timeline[ind].currEdge &&
                ind < timeline.length - 1 ? (
                  <>
                    <div className="absolute left-[-10px] translate-x-[-100%] top-[50%] translate-y-[-50%]">
                      <img
                        src={down}
                        className="rotate-[-90deg] w-[25px] h-[25px]"
                        alt=""
                      />
                    </div>
                  </>
                ) : null}

                {status ? (
                  <>
                    <div className="absolute right-[-10px] translate-x-[100%] top-[50%] translate-y-[-50%]">
                      <img src={tick} className="w-[25px] h-[25px]" alt="" />
                    </div>
                  </>
                ) : null}

                {(status === false && index < timeline[ind].currEdge) ||
                (status === false &&
                  index === timeline[ind].currEdge &&
                  ind - 1 >= 0 &&
                  timeline[ind - 1].type === "inCorrect") ? (
                  <>
                    <div className="absolute right-[-10px] translate-x-[100%] top-[50%] translate-y-[-50%]">
                      <img src={cross} className="w-[25px] h-[25px]" alt="" />
                    </div>
                  </>
                ) : null}
              </div>
            );
          })}
      </div>
      <div className="absolute right-[50%] translate-x-[50%] text-nowrap top-[-30px] uppercase font-semibold ">
        sorted edges
      </div>
    </div>
  );
}
