import React from "react";
import { View, StyleSheet } from "react-native-web";

import { gql } from "apollo-boost";
import { useApolloQuery } from "react-apollo-hooks";

import { Dog } from "../Dog";
import DogList from "../DogList";
import Header from "../Header";

const GET_LIKED_PHOTOS = gql`
  query {
    likedPhotos @client {
      url
      id
    }
  }
`;

const Likes = () => {
  const { data } = useApolloQuery(GET_LIKED_PHOTOS);
  return (
    <View style={styles.container}>
      <Header text="Likes" />
      <DogList
        data={data.likedPhotos}
        renderRow={(type, data) => <Dog {...data} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1
  },
  fetching: {
    fontSize: 30,
    fontFamily: "Luckiest Guy",
    color: "#23a599",
    margin: 10,
    letterSpacing: 1
  }
});

export default Likes;
