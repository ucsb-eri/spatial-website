import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import EventsTable from './EventsTable';

function SpatialDescription() {

    return (
        <Grid container direction='row' spacing={4} mt={2} justifyContent='space-between'>
            <Grid item xs={12} md={7}>
                
                <Typography align="left" paragraph>
                    The Center for Spatial Studies focuses on promoting spatial thinking and spatial analytics across academia, industry, and government agencies, and across disciplines ranging from the humanities to the physical sciences with a particular focus on novel Spatial Data Science methods and Knowledge Graphs.
                </Typography>
                <Typography align="left" paragraph>
                    The center has expertise in spatiotemporally-explicit machine learning, in the formal representation of spatial phenomena including but not limited to geographic space, knowledge engineering, as well as in methods to improve the publication, retrieval, reuse, and integration of heterogeneous data across domain boundaries.
                </Typography>
                <Typography align="left" paragraph>
                    Following the insight that understanding when and where things happen is key to understanding why they happened or will happen, our vision is to demonstrate how (geographic) space and time act as convergence catalysts to integrate heterogeneous data across domains to answer complex social and scientific questions that cannot be answered from within one domain alone. Our mission is to develop spatially and temporally explicit techniques for the creation, filtering, linkage, synthesis, prediction, and forecasting of information in large-scale, cross-domain data repositories and knowledge graphs.
                </Typography>
                <Typography align="left" paragraph>
                The center is particularly interested in regional and cultural differences in the conceptualization of geographic space with the ultimate goal of assisting machines to better understand the information needs of an increasingly diverse user base.
                </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                <EventsTable />
            </Grid>

        </Grid>
    )


}

export default SpatialDescription