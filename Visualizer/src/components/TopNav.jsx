import styled from "styled-components";
import { Link } from "react-router-dom";

const Logo = styled.button`
  font-size: xx-large;
  font-weight: 800;
  font-family: "Bungee Tint";
  color: white;
`;

export default function TopNav() {
  return (
    <>
      <div className="flex w-screen bg-inherit py-4 sticky">
        <div className="flex flex-grow mx-4 bg-black rounded-xl px-8 items-center justify-between">
          <div className="">
            <Link to={"/"}>
              <Logo>AlgoTrace</Logo>
            </Link>
          </div>
          <div className="flex space-x-4 text-lg text-white ">
            <Link to={"/sorting"}>Sorting</Link>
            <Link to={"/bst"}>BST</Link>
          </div>
        </div>
      </div>
    </>
  );
}
