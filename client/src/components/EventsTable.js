import { React, useEffect, useState } from 'react';
import { Grid, Divider, Link, Box } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch';
import Typography from '@mui/material/Typography';
import DOMPurify from 'dompurify'

function EventsTable() {
    const calendarID = process.env.REACT_APP_SPATIAL_CALENDAR_ID
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
                <Grid container direction="row" alignItems="center" sx={{height: 'auto', paddingY: '20px'}} key={`${event.summary} + ${event.start.dateTime}`}>
                    <Grid item xs={4}>
                        <Typography align="center">
                        {formatDate(event.start.dateTime)}
                        </Typography>
                        <Typography align="center">
                            {formatTime(event.start.dateTime)}
                        </Typography>
                    </Grid>

                    <Grid item xs={8} px={1}>
                        
                            <Typography align="center" variant="h5" component="h2" sx={{my: '5px'}}>
                            {formatDescription(event.summary)}
                            </Typography>
                            {/* return a link if it's a virtual meeting */}
                            <Typography align="center" variant="body2">
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

    )
}

export default EventsTable