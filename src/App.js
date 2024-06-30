import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

function App() {
    const [events, setEvents] = useState([]);
    const [selectedDay, setSelectedDay] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/open-mics')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
                if (error.response) {
                    console.error("Response error:", error.response.data);
                } else if (error.request) {
                    console.error("Request error:", error.request);
                } else {
                    console.error("Error message:", error.message);
                }
            });
    }, []);

    // Group events by day
    const groupedEvents = events.reduce((acc, event) => {
        if (!acc[event.Day]) {
            acc[event.Day] = [];
        }
        acc[event.Day].push(event);
        return acc;
    }, {});

    const handleDayClick = (day) => {
        setSelectedDay(day === selectedDay ? '' : day); // Toggle selection
    };

    return (
        <div className="App">
            <h1>Open Mic Events</h1>
            <div className="hstack gap-3">
                {Object.keys(groupedEvents).map(day => (
                    <div key={day} className="p-2">
                        <button
                            onClick={() => handleDayClick(day)}
                            className={`day-button ${selectedDay === day ? 'selected' : ''}`}
                        >
                            {day}
                        </button>
                    </div>
                ))}
            </div>
            {selectedDay && (
                <div className="grid-container">
                    {groupedEvents[selectedDay].map((event, index) => (
                        <div className="grid-item" key={index}>
                            <h3>{event["Mic Name"]}</h3>
                            <p><strong>Location:</strong> {event.Location}</p>
                            <p><strong>Address:</strong> {event.Address}</p>
                            <p><strong>Sign Up Time/Notes:</strong> {event["Sign Up Time/Notes"]}</p>
                            <p><strong>Start Time:</strong> {event["Start Time"]}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
