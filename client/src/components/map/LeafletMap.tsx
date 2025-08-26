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

interface LeafletMapProps {
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

export default function LeafletMap({ locations, onMarkerClick, isLoading }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Clean up existing map instance if it exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
    
    const map = L.map(mapRef.current, {
      center: ZELENOGORSK_CENTER,
      zoom: 14,
      maxBounds: ZELENOGORSK_BOUNDS,
      maxBoundsViscosity: 1.0,
      minZoom: 12,
      maxZoom: 18,
      zoomControl: false
    });
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(map);

    // Add custom zoom control
    L.control.zoom({
      position: 'bottomright'
    }).addTo(map);

    mapInstanceRef.current = map;

    // Force initial size calculation
    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    // Handle center user location events
    const handleCenterUserLocation = (event: any) => {
      const { lat, lng, zoom } = event.detail;
      map.setView([lat, lng], zoom);
    };

    window.addEventListener('centerUserLocation', handleCenterUserLocation);

    // Handle window resize
    const handleResize = () => {
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('centerUserLocation', handleCenterUserLocation);
      window.removeEventListener('resize', handleResize);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Create custom marker icon
  const createCustomMarkerIcon = (location: Location) => {
    const markerHtml = `
      <div class="custom-marker marker-pulse w-8 h-8 flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      </div>
    `;
    
    return L.divIcon({
      html: markerHtml,
      className: 'custom-marker-container',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
  };

  // Update markers when locations change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach(marker => map.removeLayer(marker));
    markersRef.current = [];

    // Add new markers
    locations.forEach(location => {
      const marker = L.marker([location.lat, location.lng], {
        icon: createCustomMarkerIcon(location)
      }).addTo(map);

      marker.on('click', () => {
        onMarkerClick(location);
      });

      markersRef.current.push(marker);
    });
  }, [locations, onMarkerClick]);

  if (isLoading) {
    return (
      <div className="map-container w-full h-full flex items-center justify-center bg-muted/20">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка карты...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mapRef} 
      className="map-container w-full h-full"
      data-testid="leaflet-map"
    />
  );
}
