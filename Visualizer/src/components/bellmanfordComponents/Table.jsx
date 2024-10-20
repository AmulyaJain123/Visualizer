import { useSelector } from "react-redux";
import down from "../../assets/down-arrow.png";

export default function Table() {
  const list = useSelector((state) => state.graphs.list);
  const timeline = useSelector((state) => state.graphs.timeline);
  const ind = useSelector((state) => state.graphs.ind);

  return (
    <div className="flex ml-20">
      <div
        style={{
          opacity: timeline[ind].edges ? "100%" : "0",
          display: ind === timeline.length - 1 ? "none" : "",
        }}
        className="relative mr-24"
      >
        <div className="flex flex-col divide-y-2 relative divide-black border-2 border-black w-[100px]">
          {timeline &&
            ind != null &&
            timeline[ind].edges &&
            timeline[ind].edges.map((i, index) => {
              // const status = isThere(timeline[ind].mst, i);
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
                </div>
              );
            })}
        </div>
        <div className="absolute right-[50%] translate-x-[50%] text-nowrap top-[-30px] uppercase font-semibold ">
          all edges
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex border-b-2 border-black divide-x-2 divide-black">
          <div className="w-[100px] h-[40px] font-semibold leading-tight text-center  flex justify-center items-center ">
            Iteration No
          </div>
          <div className="flex relative">
            {list.map((i, kom) => {
              return (
                <div
                  key={kom}
                  className="h-[40px] w-[40px] flex justify-center items-center"
                >
                  {i[0]}
                </div>
              );
            })}
            <div className="absolute capitalize top-[-30px] text-nowrap font-semibold right-[50%] translate-x-[50%]">
              Min Distance to other nodes
            </div>
          </div>
        </div>

        {timeline[ind].history.map((i, index) => {
          return (
            <div key={index} className="relative">
              <div className="flex border-b-2 border-black divide-x-2 divide-black">
                <div className="w-[100px] h-[40px] leading-tight text-center  flex justify-center items-center ">
                  {i[0]}
                </div>
                <div className="flex">
                  {i[1].map((j, ind2) => {
                    if (ind2 != 0) {
                      return (
                        <div
                          key={ind2}
                          className="h-[40px] w-[40px] flex  justify-center items-center"
                        >
                          <span
                            style={{
                              backgroundColor:
                                ind === timeline.length - 1 &&
                                index === timeline[ind].history.length - 1
                                  ? "green"
                                  : "",
                              color:
                                ind === timeline.length - 1 &&
                                index === timeline[ind].history.length - 1
                                  ? "white"
                                  : "black",
                            }}
                            className="w-[30px] h-[30px] rounded-full flex justify-center items-center"
                          >
                            {j >= 2000 ? "∞" : j}
                          </span>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              {index === timeline[ind].history.length - 1 &&
              ind != timeline.length - 1 ? (
                <div className="absolute  left-[-10px] translate-x-[-100%] top-[50%] translate-y-[-50%]">
                  <img
                    src={down}
                    className="w-[25px] h-[25px] rotate-[-90deg]"
                    alt=""
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
