import { useSelector } from "react-redux";

export default function Table() {
  const list = useSelector((state) => state.graphs.list);
  const timeline = useSelector((state) => state.graphs.timeline);
  const ind = useSelector((state) => state.graphs.ind);

  return (
    <div className="relative ml-20">
      <div className="flex flex-col">
        {timeline[ind].matrix.map((i, ind1) => {
          return (
            <div key={ind1} className="flex">
              {i.map((j, ind2) => {
                return (
                  <div
                    key={ind2}
                    style={{
                      borderTop:
                        ind1 != 0 && ind2 != 0 ? "2px solid black" : "",
                      borderBottom:
                        ind1 === timeline[ind].matrix.length - 1 && ind2 != 0
                          ? "2px solid black"
                          : "",
                      borderRight:
                        ind1 != 0 && ind2 != 0 ? "2px solid black" : "",
                      borderLeft:
                        ind2 === 1 && ind1 != 0 ? "2px solid black" : "",
                      fontWeight: ind1 === 0 || ind2 === 0 ? "bold" : "normal",
                    }}
                    className="flex justify-center items-center w-[50px] h-[50px] "
                  >
                    <span
                      style={{
                        backgroundColor:
                          (ind === timeline.length - 1 &&
                            ind1 != 0 &&
                            ind2 != 0) ||
                          (timeline[ind].no &&
                            !(ind1 === 0 && ind2 === 0) &&
                            (timeline[ind].no === ind1 ||
                              timeline[ind].no === ind2 ||
                              ind1 === ind2))
                            ? "green"
                            : timeline &&
                              ind != null &&
                              timeline[ind].a === ind1 &&
                              timeline[ind].b === ind2
                            ? "#0077b6"
                            : "",
                        color:
                          (ind === timeline.length - 1 &&
                            ind1 != 0 &&
                            ind2 != 0) ||
                          (timeline[ind].no &&
                            !(ind1 === 0 && ind2 === 0) &&
                            (timeline[ind].no === ind1 ||
                              timeline[ind].no === ind2 ||
                              ind1 === ind2)) ||
                          (timeline &&
                            ind != null &&
                            timeline[ind].a === ind1 &&
                            timeline[ind].b === ind2)
                            ? "white"
                            : "black",
                        outline:
                          (timeline[ind].a === ind1 &&
                            timeline[ind].b === ind2) ||
                          (timeline[ind].a === ind1 &&
                            timeline[ind].no === ind2) ||
                          (timeline[ind].no === ind1 &&
                            timeline[ind].b === ind2)
                            ? "3px solid black"
                            : "",
                        outlineOffset: "2px",
                      }}
                      className="w-[35px] h-[35px] rounded-full flex justify-center items-center"
                    >
                      {j >= 2000 ? "∞" : j}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      {ind != timeline.length - 1 ? (
        <div className="absolute top-[-50px] right-[37%] translate-x-[50%] text-nowrap text-2xl font-bold">
          A<sup>{timeline[ind].no}</sup>
        </div>
      ) : null}
    </div>
  );
}
