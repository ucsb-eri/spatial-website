import * as React from "react";
import * as ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import AdminProvider from "./context/AdminProvider";
import { ProjectProvider } from "./context/ProjectContext";
import Main from './components/Main'
import Login from "./pages/Login";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./theme";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";

let apolloUri
if (process.env.NODE_ENV === 'production'){
  apolloUri =  'https://spatialtest.grit.ucsb.edu/graphql'
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


const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />
  },
  {
    path: 'login/',
    element: <Login />
  }
])

function App() {
  


  return (
    <ApolloProvider client={client}>
      <AdminProvider>
        <ProjectProvider>
          <ThemeProvider theme={theme}>
            
              <div className="App">
                <RouterProvider router={router} />

              </div>
                
          </ThemeProvider>
        </ProjectProvider>
      </AdminProvider>
    </ApolloProvider>
    
  );
}

export default App;
