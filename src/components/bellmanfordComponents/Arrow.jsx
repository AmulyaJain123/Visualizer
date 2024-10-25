import triangle from "../../assets/triangle.png";
import triangleB from "../../assets/triangle-black.png";

export default function Arrow({ status }) {
  return (
    <div className="relative">
      <div className="w-[40px] h-[40px] rounded-full bg-transparent"></div>
      <div className="absolute top-[3px] translate-y-[-100%] right-[50%] translate-x-[50%]">
        {status ? (
          <img
            src={triangleB}
            className="w-[13px] h-[13px] rotate-180"
            alt=""
          />
        ) : (
          <img src={triangle} className="w-[13px] h-[13px] rotate-180" alt="" />
        )}
      </div>
    </div>
  );
}
