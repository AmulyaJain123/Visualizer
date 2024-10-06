import { useSelector } from "react-redux";
import Node from "./Node";
import { useRef, useEffect, useState } from "react";

export default function Fig() {
  const display = useSelector((state) => state.graphs.display);
  const list = useSelector((state) => state.graphs.list);

  const containerRef = useRef(null);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const calculateLines = () => {
      if (!containerRef.current) return;

      const nodePositions = [];
      const container = containerRef.current;
      const nodes = container.querySelectorAll(".node");
      const box = container.querySelector(".box");

      nodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        const boxes = box.getBoundingClientRect();
        const offsetX = rect.left - boxes.left;
        const offsetY = rect.top - boxes.top;
        nodePositions.push({
          x: offsetX + rect.width / 2,
          y: offsetY,
          val: node.innerText,
        });
      });
      console.log(nodePositions);

      const newLines = [];
      const completedEdges = [];
      for (let i of list) {
        const first = i[0];
        let x1;
        let y1;
        for (let j of nodePositions) {
          if (j.val == first) {
            x1 = j.x;
            y1 = j.y;
            break;
          }
        }
        for (let j of i[1]) {
          const second = j;
          let res = false;
          for (let a of completedEdges) {
            if (
              (a[0] == first && a[1] == second) ||
              (a[0] == second && a[1] == first)
            ) {
              res = true;
              break;
            }
          }
          if (res) {
            continue;
          }
          let x2;
          let y2;
          for (let k of nodePositions) {
            if (k.val == second) {
              x2 = k.x;
              y2 = k.y;
              completedEdges.push([first, second]);
              newLines.push({ x1: x1, y1: y1, x2: x2, y2: y2 });
              break;
            }
          }
        }
      }

      //   const newLines = [];
      //   const newArray = [];
      //   let layer = 0;
      //   let num = 1;
      //   let index = 0;
      //   let temp = [];
      //   while (index < nodePositions.length) {
      //     if (num === 0) {
      //       newArray.push(temp);
      //       temp = [];
      //       ++layer;
      //       num = Math.round(Math.pow(2, layer));
      //     }
      //     temp.push(nodePositions[index]);
      //     ++index;
      //     --num;
      //   }
      //   newArray.push(temp);
      //   console.log(newArray);

      //   for (let i = 0; i < newArray.length - 1; ++i) {
      //     for (let j = 0; j < newArray[i].length; ++j) {
      //       const start = newArray[i][j];
      //       const end1 = newArray[i + 1][j * 2];
      //       const end2 = newArray[i + 1][j * 2 + 1];
      //       if (start.val != "N" && end1.val != "N") {
      //         newLines.push({ x1: start.x, y1: start.y, x2: end1.x, y2: end1.y });
      //       }
      //       if (start.val != "N" && end2.val != "N") {
      //         newLines.push({ x1: start.x, y1: start.y, x2: end2.x, y2: end2.y });
      //       }
      //     }
      //   }

      setLines(newLines);
    };

    calculateLines();
    window.addEventListener("resize", calculateLines);

    return () => window.removeEventListener("resize", calculateLines);
  }, [display]);

  console.log(lines);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <svg
        className="absolute top-0 left-0  w-full box h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {lines.map((line, index) => (
          <line
            key={index}
            x1={line.x1}
            y1={line.y1 + 20}
            x2={line.x2}
            y2={line.y2 + 15}
            stroke="#0077b6"
            strokeWidth="3"
          />
        ))}
      </svg>
      {display.map((i, ind1) => {
        return <Node val={i[0]} x={i[1][0]} y={i[1][1]}></Node>;
      })}
    </div>
  );
}
