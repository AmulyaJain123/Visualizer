import { Outlet } from "react-router-dom";
import SideMenu from "../components/SideMenu";

export default function Sorting() {
  return (
    <>
      <div className="flex w-full h-full">
        <div className="  border-r-2 border-neutral-400">
          <SideMenu />
        </div>
        <div className="flex flex-grow overflow-auto customScroll h-full ">
          <Outlet />
        </div>
      </div>
    </>
  );
}
