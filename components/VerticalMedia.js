import { styled } from "styled-components";
import Poster from "./Poster";

const Container = styled.View`
  flex-direction: row;
  width: 70%;
  margin-bottom: 15px;
`;

const Column = styled.View`
  margin-left: 12px;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const ReleaseDate = styled.Text`
  color: white;
  margin: 5px 0;
`;

const Overview = styled.Text`
  color: white;
`;
const VerticalMedia = ({
  posterPath,
  originalTitle,
  releaseDate,
  overview,
}) => {
  return (
    <Container>
      <Poster path={posterPath} />
      <Column>
        <Title>{originalTitle}</Title>
        <ReleaseDate>
          {new Date(releaseDate).toLocaleDateString("ko", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </ReleaseDate>
        <Overview>
          {overview !== "" && overview.length > 80
            ? `${overview.slice(0, 140)}...`
            : overview}
        </Overview>
      </Column>
    </Container>
  );
};

export default VerticalMedia;
