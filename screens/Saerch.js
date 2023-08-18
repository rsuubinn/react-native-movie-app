import React, { useState } from "react";
import styled from "styled-components";
import { moviesApi, tvApi } from "../api";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import HorizontalList from "../components/HorizontalList";

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
`;

const Search = () => {
  const [keyword, setKeyword] = useState("");

  const onChangeText = (text) => setKeyword(text);

  const {
    isLoading: isLoadingMovies,
    data: moviesData,
    refetch: moviesRefetch,
  } = useQuery(["searchMovies", keyword], moviesApi.search, { enabled: false });
  const {
    isLoading: isLoadingTv,
    data: tvData,
    refetch: tvRefetch,
  } = useQuery(["searchTv", keyword], tvApi.search, { enabled: false });

  const onSubmit = () => {
    if (keyword === "") return;
    moviesRefetch();
    tvRefetch();
  };

  return (
    <Container>
      <SearchBar
        placeholder="검색어를 입력해주세요."
        placeholderTextColor="grey"
        returnKeyType="search"
        value={keyword}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {isLoadingMovies || isLoadingTv ? <Loader /> : null}
      {moviesData ? (
        <HorizontalList title={"영화 검색결과"} data={moviesData.results} />
      ) : null}
      {tvData ? (
        <HorizontalList
          title={"티비 프로그램 검색결과"}
          data={tvData.results}
        />
      ) : null}
    </Container>
  );
};

export default Search;
