export const typeDefs = `
  type Image {
    isLiked: Boolean
  }

  type Mutation {
    toggleLikedPhoto(id: ID!): Boolean
  }

  type Query {
    likedPhotos: [Image]
  }
`;
