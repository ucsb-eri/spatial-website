import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function EventsTable() {
    const events = [
        {
            name: "Spatial Hour",
            date: "11/28/2023",
            description: "Trisalyn Nelson on Virtual Twins",
            location: "Phelps 3123"
        },
        {
            name: "Spatial Hour",
            date: "12/14/2023",
            description: "Shaine on GIS",
            location: "Phelps 3123"
        },
    ]

    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 100 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell colSpan={2}>
                        <Typography align="center" variant="h5">Upcoming Events</Typography>
                    </TableCell>
                    
                </TableRow>       
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <TableRow
                  key={event.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell>
                        <Typography paragraph align="center">
                        {event.date}
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography paragraph align="center" variant="h6">
                            {event.name}
                        </Typography>
                        <Typography paragraph align="center">
                            {event.description}
                        </Typography>
                        <Typography paragraph align="center">
                            {event.location}
                        </Typography>
                    </TableCell>
                    
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    )

}

export default EventsTable