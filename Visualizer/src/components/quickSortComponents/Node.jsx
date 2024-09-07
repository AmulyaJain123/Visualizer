import down from "../../assets/down-arrow.png";

export default function Node({
  color,
  highlight,
  success,
  textCol,
  children,
  index,
  ind,
  pivot,
  range,
  first,
  second,
}) {
  return (
    <>
      <div className={`index${index}`}>
        <div
          style={{
            backgroundColor: success ? "#4f772d" : pivot ? textCol : color,
            border: first || second ? "3px solid black" : "0px solid black",
            color: success ? "white" : pivot ? color : textCol,
          }}
          className="w-[50px] relative h-[50px] flex justify-center items-center rounded-full text-base"
        >
          {children}
          {first ? (
            <div>
              <img
                src={down}
                className="w-[20px] absolute top-[-20px] left-[-10px] -rotate-45"
                alt=""
              />
            </div>
          ) : null}
          {second ? (
            <div>
              <img
                src={down}
                className="w-[20px] absolute top-[-20px] right-[-10px] rotate-45"
                alt=""
              />
            </div>
          ) : null}
          {range && range.low === index && range.high != index ? (
            <>
              <div className="absolute text-black bottom-[-30px] text-lg font-bold">
                L
              </div>
            </>
          ) : null}
          {range && range.high === index && range.low != index ? (
            <>
              <div className="absolute text-black bottom-[-30px] text-lg font-bold">
                H
              </div>
            </>
          ) : null}
          {range && range.low === index && range.high === index ? (
            <>
              <div className="absolute text-black bottom-[-30px] text-lg font-bold">
                L H
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
