import { useEffect } from "react";
import down from "../../assets/down-arrow.png";
import { useSelector } from "react-redux";

export default function StackArr({ array }) {
  const stackHelp = useSelector((state) => state.stacksNQueue.stackHelp);

  return (
    <div className="relative min-h-[40px]">
      <div className="flex">
        {array === null
          ? null
          : array.map((i, index) => {
              return (
                <div
                  key={index}
                  style={{ position: "relative" }}
                  className={`index${index}`}
                >
                  <div className="flex no justify-center items-center w-[40px] h-[40px] bg-[#caf0f8] border-y-2 border-[#0077b6] border-x-2 text-[#0077b6]">
                    {i}
                  </div>
                  {index === array.length - 1 ? (
                    <>
                      <div
                        style={{ opacity: stackHelp != null ? "0" : "100" }}
                        className="absolute first right-[50%] flex items-center flex-col translate-x-[50%] top-[-150%]"
                      >
                        <span className="text-lg font-semibold uppercase">
                          top
                        </span>
                        <img src={down} className="w-[20px] h-[20px] " alt="" />
                      </div>
                    </>
                  ) : null}
                </div>
              );
            })}
      </div>
      <span className="absolute h-[40px] items-center flex left-[-80px] top-[50%] translate-y-[-50%] text-lg font-semibold uppercase">
        stack
      </span>
      {stackHelp != null ? (
        <div className="absolute stackHelp flex justify-center items-center w-[40px] bottom-[0px] h-[40px] right-[-200px] bg-[#caf0f8] border-y-2 border-[#0077b6] border-x-2 text-[#0077b6]">
          <span>{stackHelp}</span>
          {/* <div style={} className="absolute first right-[50%] flex items-center flex-col translate-x-[50%] top-[-160%]">
            <span className="text-lg font-semibold uppercase text-black">
              top
            </span>
            <img src={down} className="w-[20px] h-[20px] " alt="" />
          </div> */}
        </div>
      ) : null}
    </div>
  );
}
