const express = require('express');
const router = express.Router();

const calendarId = process.env.REACT_APP_SPATIAL_CALENDAR_ID
const apiKey = process.env.REACT_APP_CALENDAR_API_KEY
const now = new Date().toISOString()

const eventsNum = 5
const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${now}&maxResults=${eventsNum}&singleEvents=true&orderBy=startTime&eventTypes=default`;
       
const getEvents = async () => {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error("Calendar can't be reached")
        }
        const data = await response.json()
        return data.items;
    } catch (error) {
        console.error("Error loading events table", error)
    }
}

router.get('/spatialevents', async (req, res) => {
    
    try {
        const calendarEvents = await getEvents()
        res.json(calendarEvents)
        
    } catch (error) {
        res.status(500).json({error: 'Error getting calendar events'})
    }
    
})

module.exports = router;