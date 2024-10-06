import { useEffect } from "react";
import { stacksNQueueActions } from "../../store/main";
import QueueArr from "./QueueArr";
import { useDispatch, useSelector } from "react-redux";
import { useAnimate } from "framer-motion";

export default function QueueAnimation() {
  const currOp = useSelector((state) => state.stacksNQueue.currentOp);
  const stack = useSelector((state) => state.stacksNQueue.stackArr);
  const peekElement = useSelector((state) => state.stacksNQueue.peekElement);
  const dispatch = useDispatch();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (currOp === null) {
      return;
    }
    if (currOp[0] === "push") {
      let index;
      if (stack === null) {
        index = 0;
      } else {
        index = stack.length;
      }
      dispatch(stacksNQueueActions.setStackHelp(currOp[1]));
      setTimeout(() => {
        animate(`.stackHelp`, { x: [0, -160] }, { type: "tween", duration: 1 });

        setTimeout(() => {
          if (index === 0) {
            dispatch(stacksNQueueActions.setStackArr([currOp[1]]));
          } else {
            dispatch(stacksNQueueActions.pushStackArr(currOp[1]));
          }
          dispatch(stacksNQueueActions.setStackHelp(null));
          dispatch(stacksNQueueActions.setDisable(false));
        }, 1000);
      }, 0);
    }
    if (currOp[0] === "pop") {
      if (stack === null || stack.length === 0) {
        dispatch(stacksNQueueActions.setDisable(false));
        return;
      }
      let index = stack.length - 1;
      animate(
        `.index${0}`,
        { y: [0, 100], opacity: [100, 0] },
        { type: "tween", duration: 1 }
      );
      animate(`.array`, { x: [0, -40] }, { type: "tween", duration: 1 });
      setTimeout(() => {
        animate(
          `.index${0}`,
          { y: 0, opacity: 100 },
          { type: "tween", duration: 0 }
        );
        animate(`.array`, { x: 0 }, { type: "tween", duration: 0 });
        dispatch(stacksNQueueActions.deque());
        dispatch(stacksNQueueActions.setDisable(false));
      }, 1000);
    }
    if (currOp[0] === "peek") {
      if (stack === null || stack.length === 0) {
        dispatch(stacksNQueueActions.setDisable(false));
        return;
      }
      let index = stack.length - 1;
      animate(
        `.index${0} .no`,
        { scale: [1, 3, 0.5, 1] },
        { type: "tween", duration: 0.5 }
      );
      setTimeout(() => {
        dispatch(stacksNQueueActions.setPeekElement(stack[0]));
        dispatch(stacksNQueueActions.setDisable(false));
      }, 500);
    }
  }, [currOp]);

  return (
    <div ref={scope} className="flex flex-grow relative mt-32">
      <div
        style={{ left: "20%" }}
        className="absolute stack flex border-[#0077b6]"
      >
        <QueueArr array={stack}></QueueArr>
        {peekElement ? (
          <div className="font-semibold right-[-400px] border-2 border-black w-[40px] h-[40px] flex items-center justify-center absolute">
            {peekElement}
          </div>
        ) : null}
      </div>
    </div>
  );
}
