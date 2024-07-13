import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import AdminProvider from "./context/AdminProvider";
import Main from './components/Main'
import Login from "./pages/Login";
import { createTheme, ThemeProvider } from '@mui/material/styles';
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

function App() {
  
  const THEME = createTheme({
    typography: {
     "fontFamily": `Avenir, "Century Gothic", sans-serif`,
     "fontSize": 14,
     "fontWeightLight": 100,
     "fontWeightRegular": 400,
     "fontWeightMedium": 500
    }
  });

  return (
    <ApolloProvider client={client}>
      <AdminProvider>
        <ThemeProvider theme={THEME}>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element= {<Main />} />
              </Routes>
            </div>
          </Router>
        </ThemeProvider>
      </AdminProvider>
    </ApolloProvider>
    
  );
}

export default App;
