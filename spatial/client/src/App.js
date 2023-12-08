import './App.css';
import Main from './templates/Main'
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
    <ThemeProvider theme={THEME}>
      <div className="App">
        <Main />
      </div>
    </ThemeProvider>
    
  );
}

export default App;
