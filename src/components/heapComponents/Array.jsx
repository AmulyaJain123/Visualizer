import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function Array({ array }) {
  const minMaxNumber = useSelector((state) => state.bst.minMaxNumber);
  const heapType = useSelector((state) => state.bst.heapType);

  return (
    <>
      {array.length != 0 ? (
        <div className="relative w-fit mx-auto">
          <span className="absolute z-10 top-[50%] translate-y-[-50%] translate-x-[-150%] font-semibold text-lg uppercase">
            heap
          </span>
          <div className="flex w-fit divide-x-2 mb-8 mx-auto border-2 border-[#0077b6] divide-[#0077b6]">
            {array.map((i, index) => {
              return (
                <div
                  key={Math.random()}
                  className="w-[40px] h-[40px] text-bold bg-[#caf0f8] text-[#0077b6] flex relative justify-center items-center"
                >
                  <span className={`index${index}`}>{i}</span>
                </div>
              );
            })}
          </div>
          {minMaxNumber != null ? (
            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: -20 }}
              className="w-[40px] h-[40px] text-bold bg-[#4f772d] text-[#fff] absolute right-[-250px] top-[50%] translate-y-[-50%] flex  justify-center items-center"
            >
              {minMaxNumber}
              <span className="absolute text-black top-[50%] translate-y-[-50%] left-[-130%] font-semibold uppercase text-lg">
                {heapType}
              </span>
            </motion.div>
          ) : null}
        </div>
      ) : (
        <div className="flex w-fit divide-x-2 mb-8 mx-auto h-[40px]"></div>
      )}
    </>
  );
}
