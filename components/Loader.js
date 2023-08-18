import { ActivityIndicator } from "react-native";
import { styled } from "styled-components";

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-content: center;
`;

export default function Loader() {
  return (
    <Wrapper>
      <ActivityIndicator />
    </Wrapper>
  );
}
