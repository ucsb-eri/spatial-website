import './App.css';
import Main from './components/Main'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});


const client = new ApolloClient({
  link: httpLink,
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
      <ThemeProvider theme={THEME}>
        <div className="App">
          <Main />
        </div>
      </ThemeProvider>
    </ApolloProvider>
    
  );
}

export default App;
