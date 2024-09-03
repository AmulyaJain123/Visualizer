import beaker from "../../assets/beaker.png";
import arrow from "../../assets/down-arrow.png";

export default function Bucket({ array, low, high, active, success, ind }) {
  return (
    <div
      style={{ display: "flex", position: "relative" }}
      className={`bucket${ind}`}
    >
      <img src={beaker} className="w-[100px]" alt="" />
      <div className="absolute bottom-[32px] w-[70%] max-h-[60%] items-end right-[50%] translate-x-[50%] flex h-fit gap-1 flex-wrap text-xs">
        {array.map((i, index) => {
          return (
            <div className={`drop${index}`}>
              <span
                style={{
                  color: success ? "white" : "#caf0f8",
                  backgroundColor: success ? "#4f772d" : "#0077b6",
                }}
                className="text-xs font-medium w-[20px] h-[20px] flex items-center justify-center rounded-full "
              >
                {i}
              </span>
            </div>
          );
        })}
      </div>
      <span className="absolute text-nowrap text-sm font-semibold bottom-[-10px] right-[50%] translate-x-[50%]">
        {`${low} - ${high}`}
      </span>
      {active ? (
        <img
          src={arrow}
          className="absolute top-[-30px] right-[50%] w-[30px] translate-x-[50%]"
          alt=""
        />
      ) : null}
    </div>
  );
}
