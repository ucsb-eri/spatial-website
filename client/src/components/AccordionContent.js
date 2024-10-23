import { React } from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Divider } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import ContentCard from './ContentCard'

export default function AccordionContent(props) {
    const { accordions } = props
    console.log(accordions)
    return (
        <div>
            { accordions.map( (accordion, index) => (
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel-content"
                        id="panel-header"
                    >
                        <Typography variant="h5">{accordion.title}</Typography>
                    </AccordionSummary>
                    { accordion.content.map( (content ) => (
                        <AccordionDetails >
                            <ContentCard content={content} />
                            <Divider sx={{marginY: '20px'}} />
                        </AccordionDetails>
                    ))}
                    
                </Accordion>
            ))}
            
        </div>
        
        
    )
}