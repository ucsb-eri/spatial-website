import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";

import AdminProvider from "./context/AdminProvider";
import { ProjectProvider } from "./context/ProjectContext";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./theme";

let apolloUri
if (process.env.NODE_ENV === 'production'){
  apolloUri =  'https://spatial.ucsb.edu/graphql'
} else {
  apolloUri = 'http://localhost:3001/graphql'
}

const httpLink = createHttpLink({
  uri: apolloUri,
});

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AdminProvider>
        <ProjectProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </ProjectProvider>
      </AdminProvider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
