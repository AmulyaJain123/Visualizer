import { Outlet } from "react-router-dom";
import SortingSideMenu from "../components/sortingComponents/SortingSideMenu";

export default function Sorting() {
  return (
    <>
      <div className="flex w-full h-full">
        <div className="w-[300px]  border-r-2 my-8 border-neutral-400">
          <SortingSideMenu />
        </div>
        <div className="flex flex-grow overflow-auto customScroll mr-4 h-full ">
          <Outlet />
        </div>
      </div>
    </>
  );
}
