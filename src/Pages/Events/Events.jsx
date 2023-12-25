// EventCard.jsx

import React from 'react';
import useEvents from '../../Components/Hooks/useEvents';


const EventCard = () => {
    const [events] = useEvents()
    return (
        <div>
            <h2 className="text-3xl text-center my-8">Upcoming Events</h2>

        <div className='grid lg:grid-cols-3 gap-4'>
            {
                events.map(event => <div key={event._id} className="bg-white border rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
                    <img src={event.image} alt={event.name} className="w-full h-40 object-cover" />
                    <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">Date: {event.date}</p>
                        <p className="text-sm text-gray-600 mb-2">Location: {event.location}</p>
                        <p className="text-sm text-gray-700">{event.description}</p>
                       
                    </div>
                </div>)
            }


        </div>
        </div>
    );
};

export default EventCard;
