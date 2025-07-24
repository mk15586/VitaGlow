import React, { useEffect, useState, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Navigation, Star } from 'lucide-react';

// Helper for SSR-safe dynamic import of react-leaflet and leaflet
const MapContainerDynamic = dynamic(
  async () => {
    const mod = await import('react-leaflet');
    return mod.MapContainer;
  },
  { ssr: false }
);
const TileLayerDynamic = dynamic(
  async () => {
    const mod = await import('react-leaflet');
    return mod.TileLayer;
  },
  { ssr: false }
);
const MarkerDynamic = dynamic(
  async () => {
    const mod = await import('react-leaflet');
    return mod.Marker;
  },
  { ssr: false }
);
const PopupDynamic = dynamic(
  async () => {
    const mod = await import('react-leaflet');
    return mod.Popup;
  },
  { ssr: false }
);

const MapFlyToController = dynamic(
  async () => {
    const mod = await import('react-leaflet');
    return function MapFlyToController({ center, zoom }) {
      const map = mod.useMap();
      useEffect(() => {
        if (center) {
          map.flyTo(center, zoom, { animate: true, duration: 1.5 });
        }
      }, [center, zoom, map]);
      return null;
    };
  },
  { ssr: false }
);

export default function MapSection({
  userLocation,
  userLocationIcon,
  processedFacilities,
  typeVisuals,
  setSelectedFacilityId,
  mapCenter
}) {
  return (
    <MapContainerDynamic center={userLocation || [26.12, 85.37]} zoom={13} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>
      <TileLayerDynamic url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>'/>
      {userLocation && userLocationIcon && (
        <MarkerDynamic position={userLocation} icon={userLocationIcon}>
          <PopupDynamic>Your current location</PopupDynamic>
        </MarkerDynamic>
      )}
      {processedFacilities.map(facility => (
        typeVisuals[facility.type]?.marker ? (
          <MarkerDynamic key={facility.id} position={facility.position} icon={typeVisuals[facility.type].marker} eventHandlers={{ click: () => setSelectedFacilityId(facility.id) }}>
            <PopupDynamic>
              <div className="font-sans">
                <h4 className="font-bold text-md">{facility.name}</h4>
                <p className="text-sm text-slate-600">{facility.type}</p>
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation ? `saddr=${userLocation.join(',')}&` : ''}daddr=${facility.position.join(',')}`} 
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 mt-2 text-sky-600 font-semibold hover:underline"
                >
                  <Navigation size={14} /> Get Directions
                </a>
              </div>
            </PopupDynamic>
          </MarkerDynamic>
        ) : null
      ))}
      <MapFlyToController center={mapCenter} zoom={15} />
    </MapContainerDynamic>
  );
}
