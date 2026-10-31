import React from "react";
import useEvents from "../../Components/Hooks/useEvents";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const EventCard = () => {
  const [events] = useEvents();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-wider font-semibold text-accent-deep">
          Community Gatherings
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-semibold text-ink mt-1">
          Upcoming Adoption & Foster Events
        </h1>
        <p className="text-sm text-ink-2 mt-2">
          Meet adoptable companions, talk with veterinary experts, and connect with fellow animal lovers.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events && events.length > 0 ? (
          events.map((event) => (
            <div
              key={event._id}
              className="bg-card border border-rule rounded-card overflow-hidden shadow-card hover-lift flex flex-col"
            >
              <div className="relative h-48 w-full overflow-hidden bg-paper-2">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-display font-semibold text-ink mb-2">
                    {event.name}
                  </h3>
                  <div className="space-y-1.5 text-xs text-muted">
                    <p className="flex items-center gap-2">
                      <FaCalendarAlt className="text-accent-3" />
                      <span>{event.date}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-mint-deep" />
                      <span>{event.location}</span>
                    </p>
                  </div>
                  <p className="text-xs text-ink-2 leading-relaxed mt-3">
                    {event.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-rule/70">
                  <span className="inline-block px-3 py-1 rounded-pill bg-paper-2 text-ink text-xs font-semibold border border-rule">
                    Open to Public
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-card rounded-card border border-rule p-8 text-muted">
            <p className="text-sm">No scheduled events right now. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
