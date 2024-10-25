import QueueTemplate from "../components/overviewComponents/QueueTemplate";
import StacksTemplate from "../components/overviewComponents/StacksTemplate";

export default function StacksNQueue() {
  return (
    <div className="flex w-full relative overflow-auto customScroll">
      <div className="flex flex-grow flex-col ">
        <h1 className="text-center text-3xl mt-12 tracking-wide mx-auto w-fit  text-[#9c6644] rounded-xl font-extrabold mb-12">
          Stacks & Queue Overview
        </h1>
        <p className="text-center text-lg w-[80%] mx-auto">
          Before diving into the visualizations, take a moment to familiarize
          yourself with the algorithm's key aspects and the legend that guides
          you through the animations. This will help you better understand and
          interpret the dynamic steps of each algorithm, empowering you to
          master its logic and execution.
        </p>

        <div className=" flex flex-col gap-y-16">
          <StacksTemplate />
          <QueueTemplate />
        </div>

        <div className="min-w-[100px] min-h-[200px]"></div>
      </div>
      <div
        style={{ height: `calc( 100vh - ${48}px )` }}
        className="flex flex-col gap-y-2 text-lg pl-8 pt-[30px] min-w-[200px] sticky right-[5px]  top-0 border-l-2 border-neutral-400 "
      >
        <span className="text-xl tracking-wide text-[#9c6644] mb-4 font-extrabold">
          Jump To
        </span>
        <div className=" border-black w-[150px] divide-black flex flex-col ">
          <a className="my-1 flex-grow hover:text-[#9c6644]" href="#stacks">
            Stacks
          </a>
          <a className="my-1 flex-grow hover:text-[#9c6644]" href="#queue">
            Queue
          </a>
        </div>
      </div>
    </div>
  );
}
