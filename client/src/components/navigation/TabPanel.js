import React from "react";
import {Grid, Toolbar, Typography, Card, Container} from '@mui/material'
import AccordionContent from "../content-display/AccordionContent";
import ContentCard from "../content-display/ContentCard";

export default function TabPanel(props) {

    const {panel} = props
    
    return(
        <Container disableGutters={false}>
            <Grid container direction='row' justifyContent='center'>
            <Grid item xs={12} md={11}>                                   
                <Toolbar align='left' disableGutters={true}>
                    <Typography variant='h4' align='left' paddingBottom="5px" borderBottom={1} borderColor="divider">
                        {panel.name}
                        
                    </Typography>
                </Toolbar>
                <Card elevation={0} sx={{borderRadius: '0'}}>
                { panel.content.map((content, index) => (
                    <ContentCard content={content} key={index} />
                ))}                                

                { panel.accordion && (                                  
                    <AccordionContent accordions={panel.accordion} />                             
                )}

                </Card>
            </Grid>
            
        </Grid> 
        </Container>
    )
    
  
}