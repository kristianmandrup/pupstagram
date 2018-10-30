import React from "react";
import { View, StyleSheet } from "react-native-web";

import { gql } from "apollo-boost";
import { useApolloQuery } from "react-apollo-hooks";

import { DogWithLikes } from "../Dog";
import DogList from "../DogList";
import Header from "../Header";
import { Error } from "../Fetching";

export const GET_DOG = gql`
  query getDogByBreed($breed: String!) {
    dog(breed: $breed) {
      images {
        url
        id
        isLiked @client
      }
    }
  }
`;

const Detail = ({
  match: {
    params: { breed, id }
  }
}) => {
  const { data, error } = useApolloQuery(GET_DOG, {
    variables: { breed }
  });
  return (
    <View style={styles.container}>
      <Header text={breed} />
      {error ? (
        <Error />
      ) : (
        <DogList
          data={data.dog.images}
          renderRow={(type, data) => (
            <DogWithLikes
              id={id}
              isLiked={data.isLiked}
              imageId={data.id}
              url={data.url}
            />
          )}
        />
      )}
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

export default Detail;
