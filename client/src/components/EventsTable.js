import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Divider, Link } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch';
import Typography from '@mui/material/Typography';
import DOMPurify from 'dompurify'



function EventsTable() {
    const calendarID = process.env.REACT_APP_CALENDAR_ID
    const apiKey = process.env.REACT_APP_CALENDAR_API_KEY
    const now = new Date().toISOString()

    const [events, setEvents] = useState([])
    const eventsNum = 5  
    const getEvents = async (calendarID, apiKey, eventsNum) => {
        
        const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarID)}/events?key=${apiKey}&timeMin=${now}&maxResults=${eventsNum}&singleEvents=true&orderBy=startTime&eventTypes=default`;
        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error("Calendar can't be reached")
            }
            const data = await response.json()
            const items = data.items
            console.log(items)
            setEvents(items)
            return data.items;
        } catch (error) {
            console.log("aer")
        }
    }

    const checkLocationUrl = (location) => {
        const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])?)\\.)+[a-z]{2,}|' + // domain name
            'localhost|' + // localhost
            '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|' + // IP
            '\\[?[a-fA-F0-9]*:[a-fA-F0-9:%.~#?&//=]*\\])' + // IPv6
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+?:@&=]*)*$', 'i'); // port and path
    
        return !!pattern.test(location);
    }

    useEffect(() => {
        getEvents(calendarID, apiKey, eventsNum)
    }, [])

    // const events = [
    //     {
    //         name: "Spatial Hour",
    //         date: "11/28/2023",
    //         description: "Trisalyn Nelson on Virtual Twins",
    //         location: "Phelps 3123"
    //     },
    //     {
    //         name: "Spatial Hour",
    //         date: "12/14/2023",
    //         description: "Shaine on GIS",
    //         location: "Phelps 3123"
    //     },
    // ]

    const formatDate = (dateStr) => {
        
        const dateObj = new Date(dateStr)
        const options = { year: 'numeric', month: 'long', day: 'numeric'}
        const formattedDate = dateObj.toLocaleDateString('en-US', options)
        return(formattedDate)
    }
    const formatTime = (dateStr) => {
        
        const dateObj = new Date(dateStr)
        const options = { hour: 'numeric', minute: '2-digit', hour12: true}
        const formattedTime = dateObj.toLocaleTimeString([], options)
        return(formattedTime)
    }

    const formatDescription = (description) => {

        const cleanDescription = DOMPurify.sanitize(description.replace(/\n/g, ' ').trim()).replace(/<\/?[^>]+(>|$)/g, "").trim()
        return(cleanDescription.slice(0, 50))
    }
    return (


        <Grid container direction="row" sx={{border: '10px solid', borderColor: '#027C91', paddingX: '10px'}}>

            <Grid item xs={12} py={4} >
                <Typography variant="h3">
                Upcoming Events
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
            {events && events.map((event) => (
                <Grid container direction="row" alignItems="center" sx={{height:'100px', paddingY: '20px'}} key={`${event.summary} + ${event.start.dateTime}`}>
                    <Grid item xs={4}>
                        <Typography align="center">
                        {formatDate(event.start.dateTime)}
                        </Typography>
                        <Typography align="center">
                            {formatTime(event.start.dateTime)}
                        </Typography>
                    </Grid>

                    <Grid item xs={8}>
                        <Typography align="center" variant="h5" component="h2" sx={{my: '5px'}}>
                            {formatDescription(event.summary)}
                        </Typography>
                        {/* return a link if it's a virtual meeting */}
                        <Typography align="center" variant="h6" component="h2">
                            {checkLocationUrl(event.location) ? (
                                <Link href={event.location} underline='hover' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#027C91' }}>
                                    Location
                                    <LaunchIcon sx={{width: '20px', mx: '5px'}} />
                                </Link>
                            ) : (
                                event.location
                            )}
                           
                        </Typography>
                        {/* <Typography paragraph align="center">
                            {event.description}
                        </Typography> */}
                    </Grid>

                </Grid>
            ))}
            
            </Grid>
            

        </Grid>


        // <TableContainer component={Paper} sx={{maxWidth: "100%"}}>
        //   <Table aria-label="simple table">
            
        //     <TableHead>
        //         <TableRow>
        //             <TableCell colSpan={2} sx={{ borderBottom: 'none' }}>
        //                 <Typography align="center" variant="h5">Upcoming Events</Typography>
        //             </TableCell>
                    
        //         </TableRow>
        //         <TableRow sx={{paddingTop: 0}}>
        //             <TableCell sx={{borderTop: 'none', paddingTop: 0, width: '30%'}}>
        //                 <Typography align="center" component="h4" variant="h6">Date & Location</Typography>
        //             </TableCell>
            
        //             <TableCell sx={{borderTop: 'none', paddingTop: 0, width: '70%'}}>
        //                 <Typography align="center" component="h4" variant="h6">Description</Typography>
        //             </TableCell>
                    
        //         </TableRow>        
        //     </TableHead>
        //     <TableBody>
        //       {events && events.map((event) => (
        //         <TableRow
        //           key={event.name + event.date}
        //         >
        //             <TableCell style={{
        //                 overflow: 'hidden',
        //                 width: '30%'
        //             }}>
        //                 {/* <Typography paragraph align="center">
        //                 {formatDate(event.start.dateTime)}
        //                 </Typography> */}
        //                 <Typography paragraph align="center">
        //                     {formatTime(event.start.dateTime)}
        //                 </Typography>
                        
        //                 <Typography paragraph align="center">
        //                     {event.location}
        //                 </Typography>

        //             </TableCell>
        //             <TableCell style={{
        //                 overflow: 'hidden',
        //                 width: '70%'
        //             }}>
                        
        //                     <Typography paragraph align="center" variant="h6">
        //                         {event.summary}
        //                     </Typography>
        //                     <Typography paragraph 
        //                         align="center" 
        //                         sx={{
        //                             maxWidth: '100%',
        //                             overflow: 'hidden',
        //                             textOverflow: 'ellipsis'
        //                         }}>
        //                         {event.description}
        //                     </Typography>
                        
                        
        //             </TableCell>
    
        //         </TableRow>
        //       ))}
        //     </TableBody>
        //   </Table>
        // </TableContainer>
    )

}

export default EventsTable