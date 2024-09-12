import { Outlet } from "react-router-dom";
import SideMenu from "../components/SideMenu";

export default function BST() {
  return (
    <>
      <div className="flex w-full h-full">
        <div className="  border-r-2  border-neutral-400">
          <SideMenu />
        </div>
        <div className="flex flex-grow overflow-auto relative customScroll h-full ">
          <Outlet />
        </div>
      </div>
    </>
  );
}
