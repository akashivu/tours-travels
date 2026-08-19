import { useState } from 'react';

import type {
  ChatVisuals,
  PlaceVisual,
} from '../../types/ai.ts';

import './ItineraryVisuals.css';

interface ItineraryVisualsProps {
  visuals?: ChatVisuals | null;
}

interface PlaceCardProps {
  place: PlaceVisual;
}

function PlaceCard({ place }: PlaceCardProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="itinerary-place-card">
      <div className="itinerary-place-image">
        {place.image_url && !imageFailed ? (
          <img
            src={place.image_url}
            alt={place.name}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="itinerary-place-placeholder">
            <span>{place.name.charAt(0)}</span>
          </div>
        )}
      </div>

      <div className="itinerary-place-content">
        <h4>{place.name}</h4>

        {place.address && (
          <p className="itinerary-place-address">
            {place.address}
          </p>
        )}

        {place.google_maps_url && (
          <a
            href={place.google_maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="itinerary-place-link"
          >
            View on Google Maps
            <span aria-hidden="true">↗</span>
          </a>
        )}

        {place.attributions &&
          place.attributions.length > 0 && (
            <div className="itinerary-place-attribution">
              {place.attributions.map((item, index) =>
                item.uri ? (
                  <a
                    key={`${item.uri}-${index}`}
                    href={item.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.display_name || 'Photo attribution'}
                  </a>
                ) : (
                  <span key={index}>
                    {item.display_name}
                  </span>
                ),
              )}
            </div>
          )}
      </div>
    </article>
  );
}

export default function ItineraryVisuals({
  visuals,
}: ItineraryVisualsProps) {
  if (!visuals) {
    return null;
  }

  const destination = visuals.destination;
  const days = visuals.days ?? [];

  const visibleDays = days
    .map((day) => ({
      ...day,
      places: day.places.slice(0, 2),
    }))
    .filter((day) => day.places.length > 0);

  if (!destination && visibleDays.length === 0) {
    return null;
  }

  return (
    <section className="itinerary-visuals">
      {destination && (
        <div className="itinerary-destination-card">
          <div className="itinerary-destination-image">
            {destination.image_url ? (
              <img
                src={destination.image_url}
                alt={destination.name}
                loading="lazy"
              />
            ) : (
              <div className="itinerary-destination-placeholder">
                {destination.name}
              </div>
            )}
          </div>

          <div className="itinerary-destination-overlay" />

          <div className="itinerary-destination-info">
            <span className="itinerary-destination-label">
              Your destination
            </span>

            <h3>{destination.name}</h3>

            {destination.address && (
              <p>{destination.address}</p>
            )}

            {destination.google_maps_url && (
              <a
                href={destination.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore on Google Maps
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      )}

      {visibleDays.length > 0 && (
        <div className="itinerary-days">
          {visibleDays.map((day) => (
            <div
              className="itinerary-day"
              key={day.day}
            >
              <div className="itinerary-day-heading">
                <span>Day {day.day}</span>
                <h3>{day.title}</h3>
              </div>

              <div className="itinerary-day-grid">
                {day.places.map((place) => (
                  <PlaceCard
                    key={`${day.day}-${place.place_id ?? place.name}`}
                    place={place}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}