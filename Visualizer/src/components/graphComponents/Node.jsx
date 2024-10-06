export default function Node({ val, x, y }) {
  return (
    <div
      style={{ top: `${y}px`, left: `calc( 50% - 20px + ${x}px )` }}
      className="w-[40px] h-[40px] flex justify-center node absolute items-center rounded-full bg-[#0077b6] text-[#caf0f8]"
    >
      {val}
    </div>
  );
}
