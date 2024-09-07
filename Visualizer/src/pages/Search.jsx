import { Outlet } from "react-router-dom";
import SideMenu from "../components/SideMenu";

export default function Search() {
  return (
    <>
      <div className="flex w-full h-full">
        <div className="  border-r-2 py-4 border-neutral-400">
          <SideMenu />
        </div>
        <div className="flex flex-grow overflow-auto customScroll mr-4 h-full ">
          <Outlet />
        </div>
      </div>
    </>
  );
}
