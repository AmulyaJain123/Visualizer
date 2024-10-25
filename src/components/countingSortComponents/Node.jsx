import down from "../../assets/down-arrow.png";

export default function Node({
  color,
  successInd,
  success,
  textCol,
  children,
  current,
  max,
  index,
}) {
  let str = "";
  str += successInd ? "first " : "";
  str += max ? "second" : "";
  return (
    <>
      <div className={str}>
        <div
          style={{
            backgroundColor: success ? "#4f772d" : max ? textCol : color,
            border:
              successInd || current || max
                ? "3px solid black"
                : "0px solid black",
            color: success ? "white" : max ? color : textCol,
          }}
          className="w-[50px] relative h-[50px] flex justify-center items-center rounded-full text-base"
        >
          {children}
          {current ? (
            <div>
              <img
                src={down}
                className="w-[20px] absolute top-[-40px] right-[50%] translate-x-[50%]"
                alt=""
              />
            </div>
          ) : null}
          {max ? (
            <div className="absolute top-[-5px] right-[-5px] flex justify-center items-center w-[20px] text-white z-10 h-[20px] rounded-full bg-[#0077b6] text-xs font-bold  uppercase">
              m
            </div>
          ) : null}
          {/* {current ? (
            <div>
              <img
                src={down}
                className="w-[20px] absolute rotate-180 bottom-[-40px] right-[50%] translate-x-[50%]"
                alt=""
              />
            </div>
          ) : null} */}
        </div>
      </div>
    </>
  );
}
