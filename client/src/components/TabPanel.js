import React from "react";
import {Grid, Toolbar, Typography, Card} from '@mui/material'
import AccordionContent from "./AccordionContent";
import ContentCard from "./ContentCard";

export default function TabPanel(props) {

    const {panel} = props
    console.log(panel)
    
    return(
        <Grid container direction='row' justifyContent='center'>
        <Grid item xs={12} md={11}>                                   
            <Toolbar align='left' disableGutters={true}>
                <Typography variant='h4' align='left' paddingBottom="5px" borderBottom={1} borderColor="divider">
                    {panel.name}
                </Typography>
            </Toolbar>
            <Card elevation={0} sx={{borderRadius: '0'}}>
            { panel.content.map((content) => (
                <ContentCard content={content} />
            ))}                                

            { panel.accordion && (                                  
                <AccordionContent accordions={panel.accordion} />                             
            )}

            </Card>
        </Grid>
        
    </Grid> 
    )
    
  
}