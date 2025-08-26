import { useEffect, useRef } from "react";
import L from "leaflet";
import type { Location } from "@shared/schema";

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface SimpleMapProps {
  locations: Location[];
  onMarkerClick: (location: Location) => void;
  isLoading: boolean;
}

// Zelenogorsk city bounds and center
const ZELENOGORSK_BOUNDS: [[number, number], [number, number]] = [
  [56.100, 94.520], // Southwest
  [56.140, 94.600]  // Northeast
];
const ZELENOGORSK_CENTER: [number, number] = [56.120, 94.560];

export default function SimpleMap({ locations, onMarkerClick, isLoading }: SimpleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clean up existing map
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    // Create map
    const map = L.map(mapRef.current).setView(ZELENOGORSK_CENTER, 14);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Set bounds
    map.setMaxBounds(ZELENOGORSK_BOUNDS);
    map.setMinZoom(12);
    map.setMaxZoom(18);

    mapInstanceRef.current = map;

    // Force size recalculation
    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Add markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !locations.length) return;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add new markers
    locations.forEach(location => {
      const marker = L.marker([location.lat, location.lng]).addTo(map);
      
      marker.bindPopup(`
        <div>
          <h3>${location.title}</h3>
          <p>${location.address}</p>
          <p><small>${location.type}</small></p>
        </div>
      `);

      marker.on('click', () => {
        onMarkerClick(location);
      });
    });

  }, [locations, onMarkerClick]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка карты...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full bg-gray-200"
      style={{ minHeight: '400px' }}
      data-testid="simple-map"
    />
  );
}