import { FlatList } from "react-native";
import styled from "styled-components";

const ListContainer = styled.View``;

const ListTitle = styled.Text``;

export default function VerticalList({ title, data }) {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList data={data} />
    </ListContainer>
  );
}
