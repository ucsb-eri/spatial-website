import {React} from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Tab, useMediaQuery } from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";

export default function PanelTabs(props) {
    const location = useLocation()
    const navigate = useNavigate()

    const {panelData, panelRoute, } = props
    const handleChange = (event, newValue) => {
        navigate(`/${panelRoute}/${newValue}`)
    };
    const smallScreen = useMediaQuery("(max-width: 768px)");

    const pathSegments = location.pathname.split("/").filter(Boolean); // Remove empty segments
    const lastParam = pathSegments[pathSegments.length - 1]; // Get the last part
    panelData.forEach(element => {
        console.log(element.tabname.toLowerCase().replaceAll(' ', '-'))
    });

    console.log(lastParam)

    return (
        <Tabs
            orientation={smallScreen ? "horizontal" : "vertical"}
            centered={smallScreen ? true : false}
            value={lastParam}
            onChange={handleChange}
            aria-label="Vertical tabs"
            sx={{ borderRight: smallScreen ? 0 : 1, borderColor: 'divider', minWidth: '200px' }}
            >   
                {panelData.map((panel, id) => (
                    <Tab value={panel.tabname.toLowerCase().replaceAll(' ', '-')} label={panel.tabname} />
                ))}

        </Tabs>
    )
    
}