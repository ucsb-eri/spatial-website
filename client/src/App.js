import { React, useEffect } from "react";
import * as ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { useQuery } from '@apollo/client';
import { GET_INFOPANELS } from './utils/queries';
import { useProjectContext } from './context/ProjectContext'


import './App.css';

import Main from './components/Main'
import Login from "./pages/Login";
import About from "./pages/About";
import People from './pages/People';
import Projects from './pages/Projects';
import Give from './pages/Give';
import Products from './pages/Products';
import Events from './pages/Events';
import Opportunities from './pages/Opportunities';
import TabPanel from "./components/navigation/TabPanel";

import Home from "./pages/Home";

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
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />}>
            {aboutPanelData?.length > 0 && (
                  <Route index element={<Navigate to={`/about/${aboutPanelData[0].tabname.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase().replaceAll(' ', '-')}`} replace />} />
                )}   
              {aboutPanelData?.map((panel) => ( 
                      
                <Route 
                  key={panel.tabname} 
                  path={`/about/${panel.tabname.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase().replaceAll(' ', '-')}`} 
                  element={<TabPanel panel={panel} />} 
                />
              ))} 
            </Route>
            <Route path="/people" element={<People />} />
            <Route path="/research" element={<Projects />} />
            <Route path="/events" element={<Events />}>
              {eventPanelData?.length > 0 && (
                  <Route index element={<Navigate to={`/events/${eventPanelData[0].tabname.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase().replaceAll(' ', '-')}`} replace />} />
                )} 
              {eventPanelData?.map((panel) => (
                  <Route 
                    key={panel.tabname} 
                    path={`/events/${panel.tabname.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase().replaceAll(' ', '-')}`} 
                    element={<TabPanel panel={panel} />} />
                ))}
            </Route>           
            <Route path="/opportunities" element={<Opportunities />}>
              
              {oppsPanelData?.length > 0 && (
                  <Route index element={<Navigate to={`/opportunities/${oppsPanelData[0].tabname.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase().replaceAll(' ', '-')}`} replace />} />
                )} 
              {oppsPanelData?.map((panel) => (
                  <Route 
                    key={panel.tabname} 
                    path={`/opportunities/${panel.tabname.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase().replaceAll(' ', '-')}`} 
                    element={<TabPanel panel={panel} />} />
                ))}
              </Route>
            <Route path="give" element={<Give />} />
            
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </Router>

    </div>
    
  );
}

export default App;
