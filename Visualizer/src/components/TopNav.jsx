import styled from "styled-components";
import { Link } from "react-router-dom";

const Logo = styled.button`
  font-size: xx-large;
  font-weight: 800;
  font-family: "Bungee Tint";
  color: white;
`;

const bar = [
  {
    name: "sorting",
    path: "/sorting",
  },
  {
    name: "search",
    path: "/search",
  },
  {
    name: "trees",
    path: "/tree",
  },
  {
    name: "stacks & queue",
    path: "/stacksnqueue",
  },
  {
    name: "graphs",
    path: "/graphs",
  },
];

export default function TopNav() {
  return (
    <>
      <div className="flex w-screen bg-inherit sticky">
        <div className="flex flex-grow  bg-black px-8 items-center justify-between">
          <div className="">
            <Link to={"/"}>
              <Logo>AlgoTrace</Logo>
            </Link>
          </div>
          <div className="flex space-x-4 text-lg items-center text-white ">
            {bar.map((i) => {
              return (
                <Link to={i.path} key={i.name} className="uppercase text-sm ">
                  {i.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
