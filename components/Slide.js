import { StyleSheet, View, useColorScheme } from "react-native";
import { styled } from "styled-components";
import { makeImagePath } from "../utils";
import { BlurView } from "expo-blur";
import Poster from "./Poster";
import Votes from "./Votes";

const BackgroundImage = styled.Image`
  flex: 1;
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  width: 90%;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
`;

const Column = styled.View`
  width: 60%;
`;

const Title = styled.Text`
  color: ${(props) => (props.isDark ? "white" : "black")};
  font-weight: 600;
`;

const Overview = styled.Text`
  color: ${(props) => (props.isDark ? "white" : "black")};
  opacity: 0.8;
`;

const Slide = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
}) => {
  const isDark = useColorScheme() === "dark";
  return (
    <View style={{ flex: 1 }}>
      <BackgroundImage
        style={StyleSheet.absoluteFill}
        source={{ uri: makeImagePath(backdropPath) }}
      />
      <BlurView
        tint={isDark ? "dark" : "light"}
        intensity={80}
        style={StyleSheet.absoluteFill}
      >
        <Wrapper>
          <Poster path={posterPath} />
          <Column>
            <Title isDark={isDark}>{originalTitle}</Title>
            <Votes voteAverage={voteAverage} />
            <Overview isDark={isDark}>{overview.slice(0, 100)}...</Overview>
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};

export default Slide;
