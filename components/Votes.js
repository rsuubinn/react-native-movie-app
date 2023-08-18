import { styled } from "styled-components";

const Text = styled.Text`
  color: white;
  font-size: 12px;
`;

const Votes = ({ voteAverage }) => {
  return (
    <Text>{voteAverage > 0 ? `⭐️ ${voteAverage} / 10` : `Coming Soon`}</Text>
  );
};

export default Votes;
