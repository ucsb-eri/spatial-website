import {React} from 'react';
import { Box, Tabs, Tab, useMediaQuery } from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";

export default function PanelTabs(props) {
    const location = useLocation()
    const navigate = useNavigate()

    const {panelData, panelRoute} = props
    const handleChange = (event, newValue) => {
        navigate(`/${panelRoute}/${newValue}`)
    };
    const smallScreen = useMediaQuery("(max-width: 768px)");

    const pathSegments = location.pathname.split("/").filter(Boolean); // Remove empty segments
    let lastParam = pathSegments[pathSegments.length - 1]; // Get the last part
    if (pathSegments.length === 1) {
        lastParam = panelData[0].tabname.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase().replaceAll(' ', '-')
    }

    return (
        <Box sx={{maxWidth: { xs: 400, sm: 600 }}}>
            <Tabs
                orientation={smallScreen ? "horizontal" : "vertical"}
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile

                value={lastParam}
                onChange={handleChange}
                aria-label="Vertical tabs"
                sx={{ 
                    borderRight: smallScreen ? 0 : 1, 
                    marginBottom: smallScreen ? '10px': 0,
                    borderColor: 'divider', 
                    minWidth: smallScreen ? 0: '200px',
                
                }}
                    
                >   
                    {panelData.map((panel, id) => (
                        <Tab key={id} value={panel.tabname.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase().replaceAll(' ', '-')} label={panel.tabname} />
                    ))}

            </Tabs>
        </Box>
    )
    
}