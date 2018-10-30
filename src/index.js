import React, { Suspense } from "react";
import { AppRegistry, View } from "react-native-web";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo-hooks";

import Feed from "./views/Feed";
import Detail from "./views/Detail";
import Likes from "./views/Likes";
import { Fetching } from "./Fetching";
import { defaults, resolvers } from "./resolvers";
import { typeDefs } from "./schema";

const client = new ApolloClient({
  uri: "https://dog-graphql-api.glitch.me/graphql",
  clientState: {
    defaults,
    resolvers,
    typeDefs
  }
});

const App = () => (
  <Suspense fallback={<Fetching />}>
    <ApolloProvider client={client}>
      <Router>
        <View>
          <Switch>
            <Route path="/" exact component={Feed} />
            <Route path="/likes" exact component={Likes} />
            <Route path="/:breed/:id" component={Detail} />
          </Switch>
        </View>
      </Router>
    </ApolloProvider>
  </Suspense>
);

AppRegistry.registerComponent("App", () => App);
AppRegistry.runApplication("App", { rootTag: document.getElementById("root") });
