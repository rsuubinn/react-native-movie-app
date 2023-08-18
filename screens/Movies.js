import React, { useState } from "react";
import { Dimensions, ActivityIndicator, FlatList } from "react-native";
import styled from "styled-components";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import HorizontalMedia from "../components/HorizontalMedia";
import VerticalMedia from "../components/VerticalMedia";
import { useQuery, useQueryClient } from "react-query";
import { moviesApi } from "../api";
import HorizontalList from "../components/HorizontalList";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-content: center;
`;

const ListTitle = styled.Text`
  font-size: 18px;
  color: white;
  margin: 20px 20px 20px 10px;
`;

const VerticalSeparator = styled.View`
  width: 20px;
`;

const Movies = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery(
    ["movies", "nowPlaying"],
    moviesApi.nowPlaying
  );
  const { isLoading: popularLoading, data: popularData } = useQuery(
    ["movies", "popular"],
    moviesApi.popular
  );
  const { isLoading: upcomingLoading, data: upcomingData } = useQuery(
    ["movies", "upcoming"],
    moviesApi.upcoming
  );

  const loading = nowPlayingLoading || popularLoading || upcomingLoading;

  const movieKeyExtractor = (item) => item.id + "";

  const onRefresh = async () => {
    setRefreshing(true);
    queryClient.refetchQueries({ queryKey: "movies" });
    setRefreshing(false);
  };

  const renderVerticalMedia = ({ item }) => (
    <VerticalMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      releaseDate={item.release_date}
      overview={item.overview}
    />
  );

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              width: "100%",
              height: SCREEN_HEIGHT / 4,
            }}
          >
            {nowPlayingData.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path}
                posterPath={movie.poster_path}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          <HorizontalList
            title={"Poplular Movies"}
            data={popularData.results}
          />
          <ListTitle>Coming Soon</ListTitle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={VerticalSeparator}
      renderItem={renderVerticalMedia}
    />
  );
};

export default Movies;
