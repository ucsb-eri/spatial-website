import { React } from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Divider } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import ContentCard from './ContentCard'

export default function AccordionContent(props) {
    const { accordions } = props
    
    console.log('AccordionContent received:', accordions);
    
    if (!accordions || accordions.length === 0) {
        return null;
    }
    
    // Sort accordions by accordionOrder
    const sortedAccordions = [...accordions].sort((a, b) => {
        const orderA = a.accordionOrder !== undefined ? a.accordionOrder : 0;
        const orderB = b.accordionOrder !== undefined ? b.accordionOrder : 0;
        return orderA - orderB;
    });
    
    return (
        <div>
            { sortedAccordions.map( (accordion, index) => {
                console.log(`Accordion ${index}:`, accordion);
                if (!accordion.content || accordion.content.length === 0) {
                    console.warn(`Accordion "${accordion.title}" has no content`);
                    return null;
                }
                return (
                    <Accordion key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel-content"
                            id="panel-header"
                        >
                            <Typography variant="h5">{accordion.title}</Typography>
                        </AccordionSummary>
                        { accordion.content.map( (content, contentIndex) => (
                            <AccordionDetails key={contentIndex} >
                                <ContentCard content={content} />
                                <Divider sx={{marginY: '20px'}} />
                            </AccordionDetails>
                        ))}
                    </Accordion>
                );
            })}
        </div>
    )
}