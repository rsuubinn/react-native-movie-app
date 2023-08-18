import React, { useState } from "react";
import { View, Text, FlatList, Dimensions } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api";
import { styled } from "styled-components";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import HorizontalMedia from "../components/HorizontalMedia";
import VerticalMedia from "../components/VerticalMedia";
import Loader from "../components/Loader";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView``;

const ListTitle = styled.Text`
  font-size: 18px;
  color: white;
  margin: 20px 20px 20px 10px;
`;

const PopularFlatList = styled.FlatList``;

const VerticalSeparator = styled.View`
  width: 20px;
`;

const HorizontalSeparator = styled.View`
  width: 20px;
`;

const Tv = () => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const { isLoading: onTheAirLoading, data: onTheAirData } = useQuery(
    ["tv", "onTheAir"],
    tvApi.onTheAir
  );
  const { isLoading: popularLoading, data: popularData } = useQuery(
    ["tv", "popular"],
    tvApi.popular
  );
  const { isLoading: topRatedLoading, data: topRatedData } = useQuery(
    ["tv", "topRated"],
    tvApi.topRated
  );

  const loading = onTheAirLoading || popularLoading || topRatedLoading;

  const tvKeyExtractor = (item) => item.id + "";

  const onRefresh = async () => {
    setRefreshing(true);
    queryClient.refetchQueries({ queryKey: "tv" });
    setRefreshing(false);
  };

  const renderHorizontalMedia = ({ item }) => (
    <HorizontalMedia
      posterPath={item.poster_path}
      originalTitle={item.original_name}
      voteAverage={item.vote_average}
    />
  );

  const renderVerticalMedia = ({ item }) => (
    <VerticalMedia
      posterPath={item.poster_path}
      originalTitle={item.original_name}
      releaseDate={item.first_air_date}
      overview={item.overview}
    />
  );

  return loading ? (
    <Loader />
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
            {topRatedData.results.map((tv) => (
              <Slide
                key={tv.id}
                backdropPath={tv.backdrop_path}
                posterPath={tv.poster_path}
                originalTitle={tv.original_name}
                voteAverage={tv.vote_average}
                overview={tv.overview}
              />
            ))}
          </Swiper>
          <Container>
            <ListTitle>Poplular TV Programs</ListTitle>
            <PopularFlatList
              horizontal
              data={popularData.results}
              keyExtractor={tvKeyExtractor}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              showHorizontalScrollIndicator={false}
              ItemSeparatorComponent={HorizontalSeparator}
              renderItem={renderHorizontalMedia}
            />
          </Container>
          <ListTitle>On The Air</ListTitle>
        </>
      }
      data={onTheAirData.results}
      keyExtractor={tvKeyExtractor}
      ItemSeparatorComponent={VerticalSeparator}
      renderItem={renderVerticalMedia}
    />
  );
};

export default Tv;
