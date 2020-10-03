import React, { useEffect, useState } from 'react';
import { Switch, Router } from 'react-router-dom';
import EventData from './EventData';
import EventCard from './EventCard';
import axios from "axios";


function Events() {
    const [events, updateEvents] = useState([]);

    useEffect(() => {
        axios.get("/students")
            .then(response => {
                updateEvents(response.data.map(task => <EventCard event={task} />))
            })
    }, [])

    return (
        <div>
            <br />
            {events}
        </div>
    )
}
export default Events;