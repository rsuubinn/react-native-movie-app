import { styled } from "styled-components";
import { makeImagePath } from "../utils";

const Image = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

const Poster = ({ path }) => {
  return <Image source={{ uri: makeImagePath(path) }} />;
};

export default Poster;
