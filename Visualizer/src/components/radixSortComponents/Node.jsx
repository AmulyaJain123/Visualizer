import down from "../../assets/down-arrow.png";

export default function Node({
  color,
  highlight,
  success,
  textCol,
  children,
  index,
  ind,
  maxDigits,
  currDigit,
}) {
  return (
    <>
      <div className={`index${index}`}>
        <div
          style={{
            backgroundColor: success ? "#4f772d" : color,
            border: highlight ? "3px solid black" : "0px solid black",
            color: success ? "white" : textCol,
          }}
          className="w-[50px] relative h-[50px] flex justify-center items-center rounded-full text-base"
        >
          {maxDigits != null && currDigit != null ? (
            <>
              <span>{children.substr(0, maxDigits - currDigit - 1)}</span>
              <span className="text-black">
                {children.substr(maxDigits - currDigit - 1, 1)}
              </span>
              <span>{children.substr(maxDigits - currDigit, currDigit)}</span>
              <div
                style={{ color: color, backgroundColor: textCol }}
                className="absolute top-[-50px] border-2 border-black rounded-full w-[30px] h-[30px] flex justify-center items-center small"
              >
                {children.substr(maxDigits - currDigit - 1, 1)}
              </div>
            </>
          ) : (
            <span>{children}</span>
          )}

          {highlight ? (
            <div>
              <img
                src={down}
                className="w-[20px] absolute top-[-40px] right-[50%] translate-x-[50%]"
                alt=""
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
