import React from "react";
import { View, StyleSheet } from "react-native-web";
import { Link } from "react-router-dom";

import { gql } from "apollo-boost";
import { useApolloClient, useApolloQuery } from "react-apollo-hooks";

import { GET_DOG } from "./Detail";
import DogList from "../DogList";
import { Dog } from "../Dog";
import Header from "../Header";
import { Fetching, Error } from "../Fetching";

const GET_DOGS = gql`
  {
    dogs {
      id
      breed
      displayImage
    }
  }
`;

const Feed = () => {
  const client = useApolloClient();
  const { data, error } = useApolloQuery(GET_DOGS);
  return (
    <View style={styles.container}>
      <Header />
      {error ? (
        <Error />
      ) : (
        <DogList
          data={data.dogs}
          renderRow={(type, data) => (
            <Link
              to={{
                pathname: `/${data.breed}/${data.id}`,
                state: { id: data.id }
              }}
              onMouseOver={() =>
                client.query({
                  query: GET_DOG,
                  variables: { breed: data.breed }
                })
              }
              style={{ textDecoration: "none" }}
            >
              <Dog {...data} url={data.displayImage} />
            </Link>
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
  }
});

export default Feed;
