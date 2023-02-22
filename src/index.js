import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

const httpLink = new HttpLink({
  uri: 'https://web-production-f7dd3.up.railway.app/graphql'
})

const wsLink = new GraphQLWsLink(createClient({
  url: 'wss://web-production-f7dd3.up.railway.app/graphql'
})) 

const authLink = setContext((_, { headers }) => { 
  const token = localStorage.getItem('token')
  return { 
    headers: { 
      ...headers, 
      authorization: token || ""
    }
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink)
)


const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={client} >
        <App />
      </ApolloProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
