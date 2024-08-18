import { Outlet } from "react-router-dom";
import TopNav from "../components/TopNav";

export default function Wrapper() {
  return (
    <>
      <div className="bg-neutral-200 flex-col flex  w-screen h-screen ">
        <TopNav />
        <div className="flex-grow overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
}
