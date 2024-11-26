import Arrow from "./Arrow";
import { useSelector } from "react-redux";

export default function Weight({ val, x, y }) {
  return (
    <div
      style={{
        top: `${y}px`,
        left: `calc( 50% + ${x}px )`,
        color: val < 0 ? "#f87171" : "#0077b6",
      }}
      className="absolute text-base text-[#0077b6] font-bold"
    >
      {val < 0 ? `–${-val}` : val}
    </div>
  );
}
