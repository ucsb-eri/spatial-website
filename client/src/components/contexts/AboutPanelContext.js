import React, {createContext, useContext, useState} from 'react'

const AboutPanelContext = createContext()

export const AboutPanelProvider = ({ children }) => {
    const [editPanelId, setEditPanelId] = useState(null)

    return (
        <AboutPanelContext.Provider value={{editPanelId, setEditPanelId}}>
            {children}
        </AboutPanelContext.Provider>
    )
}

// Custom hook to consume the context
export const useAboutPanelContext = () => {
    const context = useContext(AboutPanelContext);
    if (!context) {
      throw new Error('useAboutPanelContext must be used within a AboutPanelProvider');
    }
    return context;
  };