import { Outlet } from "react-router-dom";
import TopNav from "../components/TopNav";
import alarm from "../assets/alarm.gif";

export default function Wrapper() {
  return (
    <>
      <div className="bg-neutral-200  flex-col websiteWrapper flex  w-screen h-screen ">
        <TopNav />
        <div className="flex-grow overflow-auto">
          <Outlet />
        </div>
      </div>

      <div className="relative bg-black/45 lg:hidden w-screen overflow-scroll customScroll h-screen">
        <h1 className="text-[23px]  text-center pt-6">
          <div className="px-4 py-1 bg-neutral-200 rounded-xl w-fit mx-auto">
            <span>Welcome to</span>
            <span style={{ fontFamily: "Bungee Tint" }} className="ml-4">
              Algotrace
            </span>
          </div>
        </h1>
        <div className="responsiveDialog max-w-[700px] mx-auto  justify-center mt-16 flex   warning ">
          <div className="p-3 bg-neutral-200 mx-3 rounded-xl">
            <div className="flex flex-col p-8 pt-4 rounded-3xl items-center">
              <div className="flex para3 items-center mb-8">
                <img src={alarm} className="w-[45px] h-[45px] mr-4" alt="" />
                <h1 className="text-3xl font-bold text-red-600">
                  Too Zoomed!!
                </h1>
              </div>
              <div className=" w-full">
                <p className=" text-center">
                  Hey Bud!! It seems like the the zoom on your device is a
                  little too much for us.
                </p>
                <p className="mt-2 para1 text-center">
                  Because this is a Visualization Tool we can't work on smaller
                  screens. We need a minimum screen width of{" "}
                  <span className="text-red-600">1700 px</span>. If you are on a
                  Smartphone, switch to a bigger screen otherwise{" "}
                  <span className="text-red-600">
                    lower the zoom untill this warning disappears
                  </span>
                </p>
                <p className="text-center para2 mt-6 ">
                  Zoom-Out till this Dialog Box disappears
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
