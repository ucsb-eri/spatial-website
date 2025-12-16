import React, { useContext } from "react";
import {Grid, Toolbar, Typography, Card, Container, Box, IconButton} from '@mui/material'
import AccordionContent from "../content-display/AccordionContent";
import ContentCard from "../content-display/ContentCard";
import { AdminLoginContext } from "../../context/AdminProvider";
import { useOutletContext } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TabPanel(props) {

    const {panel} = props
    const { isLoggedIn } = useContext(AdminLoginContext)
    const outletContext = useOutletContext()
    const onEdit = outletContext?.onEdit
    const onDelete = outletContext?.onDelete
    
    return(
        <Container disableGutters={false}>
            <Grid container direction='row' justifyContent='center'>
            <Grid item xs={12} md={11}>                                   
                <Toolbar align='left' disableGutters={true} sx={{ justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant='h4' align='left' paddingBottom="5px" borderBottom={1} borderColor="divider">
                        {panel.name}
                    </Typography>
                    { isLoggedIn && onEdit && onDelete && (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton 
                                color="primary" 
                                onClick={() => onEdit(panel)}
                                size="small"
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton 
                                color="error" 
                                onClick={() => onDelete(panel)}
                                size="small"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    )}
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