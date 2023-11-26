import './App.css';
import Home from './templates/Home'
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
        <Home />
      </div>
    </ThemeProvider>
    
  );
}

export default App;
