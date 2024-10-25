import { Outlet } from "react-router-dom";
import TopNav from "../components/TopNav";
import alarm from "../assets/responsive.gif";
import no from "../assets/no.png";

export default function Wrapper() {
  return (
    <>
      <div className="bg-neutral-200  flex-col websiteWrapper flex  w-screen h-screen ">
        <TopNav />
        <div className="flex-grow overflow-auto">
          <Outlet />
        </div>
      </div>

      <div className="relative responsiveDialog flex flex-col mobileScreen w-screen customScroll h-screen">
        <div className="w-full bg-black py-2 px-8 flex justify-center">
          <span
            className="text-3xl topNav"
            style={{ fontFamily: "Bungee Tint" }}
          >
            ALGOTRACE
          </span>
        </div>
        <div className="overflow-auto customScroll bg-neutral-200 flex grow w-full ">
          <div className=" max-w-[1200px] mx-auto  justify-center mt-16 flex   warning ">
            <div className="p-3 bg-neutral-200 mx-3 rounded-xl">
              <div className="flex flex-col content p-8 pt-4 rounded-3xl items-center">
                <div className="flex para3 flex-col  items-center mb-8">
                  <div className="relative w-full imageBox flex justify-center mb-10">
                    <img
                      src={alarm}
                      className="w-[100px] img1 h-[100px]"
                      alt=""
                    />
                    <img
                      src={no}
                      className="w-[120px] h-[120px] img2 opacity-75 absolute top-[-10px]"
                      alt=""
                    />
                  </div>
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
                    Because this is a Visualization Tool we can't work on
                    smaller screens. We need a minimum screen width of{" "}
                    <span className="text-red-600">1700 px</span>. <br /> If you
                    are on a Smartphone, switch to a bigger screen otherwise{" "}
                    <span className="text-red-600">
                      lower the zoom untill this warning disappears
                    </span>
                    .
                  </p>
                  <div className="mt-10 last">
                    <p className="text-center para2 mt-6 font-medium">
                      Zoom-Out till this Dialog Box disappears
                    </p>
                    <p className="text-center font-normal ">Or</p>
                    <p className="text-center  font-medium">
                      Switch to a bigger screen if you are on a smartphone
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
