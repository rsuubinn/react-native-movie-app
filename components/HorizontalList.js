import { FlatList } from "react-native";
import styled from "styled-components";
import HorizontalMedia from "./HorizontalMedia";

const ListContainer = styled.View``;

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  margin-left: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const HorizontalSeparator = styled.View`
  width: 20px;
`;

export default function HorizontalList({ title, data }) {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id + ""}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        showHorizontalScrollIndicator={false}
        ItemSeparatorComponent={HorizontalSeparator}
        renderItem={({ item }) => (
          <HorizontalMedia
            posterPath={item.poster_path}
            originalTitle={item.original_title ?? item.original_name}
            voteAverage={item.vote_average}
          />
        )}
      />
    </ListContainer>
  );
}
