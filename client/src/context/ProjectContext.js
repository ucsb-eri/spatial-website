import React, {createContext, useContext, useState} from 'react'

const ProjectContext = createContext()

export const ProjectProvider = ({ children }) => {

    // home page

    // about page
    const [editAboutPanelId, setEditAboutPanelId] = useState(null)
    const [aboutPanelData, setAboutPanelData] = useState(null)


    // projects page
    const [editProjectId, setEditProjectId] = useState(null)

    // people page
    const [editPersonId, setEditPersonId] = useState(null)
    const [peopleData, setPeopleData] = useState(null)

    return (
        <ProjectContext.Provider 
            value={{
                editProjectId, setEditProjectId, 
                editAboutPanelId, setEditAboutPanelId, aboutPanelData, setAboutPanelData,
                editPersonId, setEditPersonId, peopleData, setPeopleData
                }}>
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