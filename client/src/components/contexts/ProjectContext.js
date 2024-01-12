import React, {createContext, useContext, useState} from 'react'

const ProjectContext = createContext()

export const ProjectProvider = ({ children }) => {
    const [editProjectId, setEditProjectId] = useState(null)

    return (
        <ProjectContext.Provider value={{editProjectId, setEditProjectId}}>
            {children}
        </ProjectContext.Provider>
    )
}

// Custom hook to consume the context
export const useProjectContext = () => {
    const context = useContext(ProjectContext);
    if (!context) {
      throw new Error('useProjectContext must be used within a ProjectProvider');
    }
    return context;
  };