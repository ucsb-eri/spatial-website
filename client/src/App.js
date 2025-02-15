import { React, useEffect } from "react";
import * as ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useQuery } from '@apollo/client';
import { GET_INFOPANELS } from './utils/queries';
import { useProjectContext } from './context/ProjectContext'


import './App.css';
import AdminProvider from "./context/AdminProvider";
import { ProjectProvider } from "./context/ProjectContext";
import Main from './components/Main'
import Login from "./pages/Login";
import About from "./pages/About";
import People from './pages/People';
import Projects from './pages/Projects';
import Give from './pages/Give';
import Products from './pages/Products';
import Events from './pages/Events';
import Opportunities from './pages/Opportunities';
import TabPanel from "./components/TabPanel";


import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./theme";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from "@apollo/client/link/context";
import Home from "./pages/Home";

// let apolloUri
// if (process.env.NODE_ENV === 'production'){
//   apolloUri =  'https://spatial.ucsb.edu/graphql'
// } else {
//   apolloUri = 'http://localhost:3001/graphql'
// }

// const httpLink = createHttpLink({
//   uri: apolloUri,
// });

// const authLink = setContext((_, { headers }) => {
//   const token = sessionStorage.getItem("id_token");
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });


// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });


// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Main />
//   },
//   {
//     path: 'login/',
//     element: <Login />
//   }
// ])



function App() {
  // get database queries
  const {loading, data, error} = useQuery(GET_INFOPANELS)
  const { setInfoPanelData, infoPanelData } = useProjectContext()
  
  let aboutPanelData
  if (infoPanelData) {
      aboutPanelData = infoPanelData.filter(panel => panel.location === "about")
  }

  let eventPanelData
  if (infoPanelData) {
      eventPanelData = infoPanelData.filter(panel => panel.location === "events")
  }

  let oppsPanelData
  if (infoPanelData) {
      oppsPanelData = infoPanelData.filter(panel => panel.location === "opportunities")
  }

  useEffect(() => {
    if (!error && !loading && data) {
      const panels = data.infoPanels;
      const mutablePanels = [...panels]; // Create a shallow copy
      mutablePanels.sort((a, b) => parseInt(a.taborder) - parseInt(b.taborder));
      setInfoPanelData(mutablePanels);
    }
  }, [data, error, loading, setInfoPanelData]);

  return (
      
    <div className="App">
      {/* <RouterProvider router={router} /> */}

      <Router>
        <Routes>
          <Route path= "/" element={<Main aboutPanelData={aboutPanelData} oppsPanelData={oppsPanelData} eventPanelData={eventPanelData} />}>
            <Route index element={<Home />} />
            <Route index path="/home" element={<Home />} />
            <Route path="/about" element={<About />}>
              {aboutPanelData && aboutPanelData.map((panel) => (
                <Route 
                  key={panel.tabname} 
                  path={`/about/${panel.tabname.toLowerCase().replaceAll(' ', '-')}`} 
                  element={<TabPanel panel={panel} />} />
              ))} 
              
            </Route>
            <Route path="/people" element={<People />} />
            {/* 
            <Route path="/research" element={<Projects />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:tab" element={<TabPanel panelData={eventPanelData} />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/opportunities/:tab" element={<TabPanel panelData={oppsPanelData} />} />
            <Route path="give" element={<Give />} /> */}
          </Route>
        </Routes>
      </Router>

    </div>
    
  );
}

export default App;
